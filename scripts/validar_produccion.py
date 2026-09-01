"""Validador local de estructura para registros canónicos y fichas pedagógicas.

No sustituye la revisión historiográfica, curricular ni de derechos de uso. Su objetivo es
detener inconsistencias estructurales antes de que un archivo avance en el flujo editorial.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
RECORDS_DIR = ROOT / "registros"
FICHAS_DIR = ROOT / "fichas_pedagogicas"

CANONICAL_UNITS = {
    "Régimen Porfirista",
    "Revolución Mexicana",
    "Estado surgido de la Revolución",
    "Consolidación del sistema político autoritario",
    "Neoliberalismo y alternancia",
}
EDITORIAL_STATES = {"borrador", "en_revision", "publicable", "publicado", "archivado"}
EVIDENCE_STATES = {
    "verificado_fuente_primaria",
    "verificado_fuente_institucional",
    "derivado_de_texto_verificado",
    "pendiente_revision",
    "conflicto_detectado",
    "verificado_metadato_tecnico",
}
RECORD_REQUIRED = {
    "schema_version",
    "id_recurso",
    "indice",
    "slug",
    "estado_editorial",
    "version_registro",
    "fecha_alta",
    "fecha_modificacion",
    "campos_1_a_1",
    "control_temporal",
    "conocimientos_habilidades_especificos",
    "aprendizajes_programa_apoyados",
    "referencias_tematicas",
    "revision_cobertura",
    "perfil_mediacion",
    "observaciones",
}
ONE_TO_ONE_REQUIRED = {
    "titulo",
    "nombre_archivo",
    "autoria",
    "descripcion_fuente",
    "anio",
    "tipo_material",
    "acceso",
    "fuente_url",
    "resumen_analitico",
    "unidad_tematica_uach",
    "temas_conceptos_clave",
    "nivel_sugerido",
}


def find_key(value: Any, prohibited: str, path: str = "$") -> list[str]:
    """Returns paths where an exact prohibited key occurs."""
    found: list[str] = []
    if isinstance(value, dict):
        for key, nested in value.items():
            child = f"{path}.{key}"
            if key == prohibited:
                found.append(child)
            found.extend(find_key(nested, prohibited, child))
    elif isinstance(value, list):
        for index, nested in enumerate(value):
            found.extend(find_key(nested, prohibited, f"{path}[{index}]"))
    return found


def check_evidence(evidences: Any, path: str, errors: list[str]) -> None:
    if not isinstance(evidences, list) or not evidences:
        errors.append(f"{path}: debe contener un arreglo no vacío de evidencias.")
        return
    for index, evidence in enumerate(evidences, start=1):
        evidence_path = f"{path}[{index}]"
        if not isinstance(evidence, dict):
            errors.append(f"{evidence_path}: evidencia inválida.")
            continue
        for field in ("fuente", "localizador", "estado"):
            if not str(evidence.get(field, "")).strip():
                errors.append(f"{evidence_path}: falta `{field}`.")
        if evidence.get("estado") not in EVIDENCE_STATES:
            errors.append(f"{evidence_path}: estado de evidencia no controlado.")


def validate_record(path: Path) -> list[str]:
    errors: list[str] = []
    try:
        record = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return [f"{path.name}: JSON inválido ({exc.msg})."]

    missing = sorted(RECORD_REQUIRED - record.keys())
    if missing:
        errors.append(f"{path.name}: faltan campos raíz: {', '.join(missing)}.")
    if record.get("schema_version") != "2.0":
        errors.append(f"{path.name}: schema_version debe ser `2.0`.")
    record_id = str(record.get("id_recurso", ""))
    if not re.fullmatch(r"HIST2_\d{4}", record_id):
        errors.append(f"{path.name}: id_recurso inválido.")
    elif path.stem != record_id:
        errors.append(f"{path.name}: nombre de archivo e id_recurso no coinciden.")
    if not re.fullmatch(r"lectura_\d+", str(record.get("indice", ""))):
        errors.append(f"{path.name}: indice debe usar el formato `lectura_N`.")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", str(record.get("slug", ""))):
        errors.append(f"{path.name}: slug inválido.")
    if record.get("estado_editorial") not in EDITORIAL_STATES:
        errors.append(f"{path.name}: estado_editorial no controlado.")
    for prohibited_path in find_key(record, "evidencia"):
        errors.append(f"{path.name}: campo legado prohibido `evidencia` en {prohibited_path}.")

    fields = record.get("campos_1_a_1", {})
    if not isinstance(fields, dict):
        errors.append(f"{path.name}: campos_1_a_1 debe ser un objeto.")
        return errors
    missing_fields = sorted(ONE_TO_ONE_REQUIRED - fields.keys())
    if missing_fields:
        errors.append(f"{path.name}: faltan campos 1:1: {', '.join(missing_fields)}.")
    for name in ONE_TO_ONE_REQUIRED & fields.keys():
        field = fields[name]
        has_canonical_value = name == "unidad_tematica_uach" and isinstance(field, dict) and "principal" in field
        if not isinstance(field, dict) or ("valor" not in field and not has_canonical_value):
            errors.append(f"{path.name}: campos_1_a_1.{name} debe incluir `valor` o, para unidad temática, `principal`.")
            continue
        check_evidence(field.get("evidencias"), f"{path.name}: campos_1_a_1.{name}.evidencias", errors)

    units = fields.get("unidad_tematica_uach", {})
    if isinstance(units, dict):
        all_units = [units.get("principal"), *units.get("secundarias", [])]
        invalid = [unit for unit in all_units if unit not in CANONICAL_UNITS]
        if invalid:
            errors.append(f"{path.name}: unidades no canónicas: {', '.join(map(str, invalid))}.")

    relation_groups = (
        ("conocimientos_habilidades_especificos", True),
        ("aprendizajes_programa_apoyados", True),
        ("referencias_tematicas", False),
    )
    for group_name, requires_alignment in relation_groups:
        group = record.get(group_name, [])
        if not isinstance(group, list):
            errors.append(f"{path.name}: {group_name} debe ser un arreglo.")
            continue
        seen_ids: set[str] = set()
        for item in group:
            item_id = str(item.get("id", "")) if isinstance(item, dict) else ""
            item_path = f"{path.name}: {group_name}.{item_id or '[sin id]'}"
            if not item_id or item_id in seen_ids:
                errors.append(f"{item_path}: identificador ausente o duplicado.")
            seen_ids.add(item_id)
            if not isinstance(item, dict) or not str(item.get("valor", "")).strip():
                errors.append(f"{item_path}: falta valor.")
                continue
            check_evidence(item.get("evidencias"), f"{item_path}.evidencias", errors)
            if requires_alignment:
                alignments = item.get("alineacion_curricular")
                if not isinstance(alignments, list) or not alignments:
                    errors.append(f"{item_path}: falta alineacion_curricular.")
                else:
                    for alignment in alignments:
                        if alignment.get("unidad_id") not in {"u1", "u2", "u3", "u4", "u5"}:
                            errors.append(f"{item_path}: unidad_id de alineación inválido.")
                        if alignment.get("alcance") not in {"directo", "contextual", "secundario"}:
                            errors.append(f"{item_path}: alcance curricular inválido.")
                        if not str(alignment.get("referente_programa", "")).strip():
                            errors.append(f"{item_path}: falta referente_programa.")
    return errors


def front_matter(text: str) -> dict[str, str]:
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", text, flags=re.DOTALL)
    if not match:
        return {}
    result: dict[str, str] = {}
    for line in match.group(1).splitlines():
        scalar = re.match(r"^([a-z_]+):\s*[\"']?([^\"'#\n]+)[\"']?\s*$", line)
        if scalar:
            result[scalar.group(1)] = scalar.group(2).strip()
    return result


def validate_ficha(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    metadata = front_matter(text)
    for field in ("tipo_documento", "schema_version", "id_ficha", "lectura_id", "slug", "estado_pedagogico"):
        if not metadata.get(field):
            errors.append(f"{path.name}: falta `{field}` en el front matter.")
    reading_id = metadata.get("lectura_id", "")
    expected_name = f"{reading_id}_ficha_pedagogica.md"
    if reading_id and path.name != expected_name:
        errors.append(f"{path.name}: el nombre debe corresponder a lectura_id.")
    for number in range(1, 17):
        if not re.search(rf"^## {number}\.\s", text, flags=re.MULTILINE):
            errors.append(f"{path.name}: falta la sección {number}.")
    if not re.search(r"^## Anexo A\.", text, flags=re.MULTILINE):
        errors.append(f"{path.name}: falta el Anexo A.")
    if "Términos de andamiaje previo" not in text:
        errors.append(f"{path.name}: falta la declaración de andamiaje previo en la sección 8.")
    if reading_id:
        record_path = RECORDS_DIR / f"{reading_id}.json"
        if not record_path.exists():
            errors.append(f"{path.name}: no existe el registro canónico {reading_id}.")
        else:
            record = json.loads(record_path.read_text(encoding="utf-8"))
            if metadata.get("slug") != record.get("slug"):
                errors.append(f"{path.name}: slug distinto al registro canónico.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Valida registros canónicos y fichas pedagógicas.")
    parser.add_argument("--registro", metavar="ID", help="Valida únicamente un registro y su ficha, por ejemplo HIST2_0004.")
    args = parser.parse_args()
    if args.registro and not re.fullmatch(r"HIST2_\d{4}", args.registro):
        parser.error("--registro debe usar el formato HIST2_0000")

    if args.registro:
        records = [RECORDS_DIR / f"{args.registro}.json"]
        fichas = [FICHAS_DIR / f"{args.registro}_ficha_pedagogica.md"]
    else:
        records = sorted(RECORDS_DIR.glob("HIST2_*.json"))
        fichas = sorted(FICHAS_DIR.glob("HIST2_*_ficha_pedagogica.md"))

    errors: list[str] = []
    for record in records:
        if not record.exists():
            errors.append(f"No existe el registro solicitado: {record.name}.")
        else:
            errors.extend(validate_record(record))
    for ficha in fichas:
        if ficha.exists():
            errors.extend(validate_ficha(ficha))
        elif args.registro:
            print(f"AVISO: aún no existe ficha para {args.registro}; se valida solo el registro canónico.")

    if errors:
        print("VALIDACIÓN RECHAZADA")
        for error in errors:
            print(f"- {error}")
        return 1
    print("VALIDACIÓN APROBADA")
    print(f"Registros revisados: {len([p for p in records if p.exists()])}")
    print(f"Fichas revisadas: {len([p for p in fichas if p.exists()])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
