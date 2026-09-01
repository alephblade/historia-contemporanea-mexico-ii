"""Migración reproducible de los registros piloto al esquema canónico 2.0."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-08-31"

MIGRATIONS: dict[str, dict[str, Any]] = {
    "HIST2_0001": {
        "slug": "dictadura-porfirista",
        "material_code": "exposicion_historica_digital",
        "ch": {
            "ch_1": [("u1", "Compara los aspectos positivos y negativos del porfiriato.", "directo")],
            "ch_2": [("u1", "Características del Estado porfirista mexicano y existencia de grupos políticos opositores.", "directo")],
            "ch_3": [("u1", "Proceso de modernización e instauración del capitalismo en el Porfiriato.", "directo")],
            "ch_4": [("u1", "Existencia de grupos políticos opositores y conflictos sociales del Porfiriato.", "directo")],
            "ch_5": [("u1", "Características del Estado porfirista mexicano.", "directo"), ("u2", "Causas de la Revolución Mexicana.", "contextual")],
        },
        "ap": {
            "aprendizaje_1": [("u1", "Compara los aspectos positivos y negativos del porfiriato.", "directo")],
            "aprendizaje_2": [("u1", "Identifica la existencia de grupos políticos opositores al régimen.", "directo")],
            "aprendizaje_3": [("u1", "Identifica el proceso de modernización e instauración del capitalismo en el porfiriato.", "directo")],
            "aprendizaje_4": [("u1", "Describe los conflictos sociales del porfiriato.", "directo")],
            "aprendizaje_5": [("u1", "Identifica las características del Estado porfirista mexicano.", "directo")],
            "aprendizaje_6": [("u2", "Distingue las causas de la Revolución Mexicana.", "secundario")],
        },
    },
    "HIST2_0002": {
        "slug": "yaquis-memoria-territorio-participacion-politica",
        "material_code": "libro_colectivo_investigacion_historica",
        "ch": {
            "ch_1": [("u1", "Proyecto de modernización económica y conflictos sociales del Porfiriato.", "contextual")],
            "ch_2": [("u1", "Proceso de modernización e instauración del capitalismo en el Porfiriato.", "directo")],
            "ch_3": [("u1", "Describe los conflictos sociales del porfiriato.", "directo")],
            "ch_4": [("u1", "Existencia de grupos políticos opositores y conflictos sociales del Porfiriato.", "contextual"), ("u2", "Distingue las causas de la Revolución Mexicana.", "contextual")],
            "ch_5": [("u2", "Impacto de la Revolución Mexicana en la transformación del México contemporáneo.", "contextual"), ("u3", "Estado nacionalista del cardenismo y sus reformas sociales.", "secundario")],
            "ch_6": [("u3", "Características del cardenismo y su proyecto de transformación social, económica y política.", "directo")],
            "ch_7": [("u3", "Características del cardenismo y su proyecto de transformación social, económica y política.", "directo")],
            "ch_8": [("u1", "Condición de las mujeres en la sociedad porfirista.", "contextual"), ("u3", "Papel de las mujeres en la transformación política y cultural de México.", "contextual")],
            "ch_9": [("u5", "Problemas actuales de la sociedad mexicana como país multiétnico y pluricultural.", "secundario")],
        },
        "ap": {
            "aprendizaje_1": [("u1", "Identifica el proceso de modernización e instauración del capitalismo en el porfiriato.", "directo")],
            "aprendizaje_2": [("u1", "Describe los conflictos sociales del porfiriato.", "directo")],
            "aprendizaje_3": [("u2", "Distingue las causas de la Revolución Mexicana.", "contextual")],
            "aprendizaje_4": [("u3", "Define las características del cardenismo y su proyecto de transformación social, económica y política.", "directo")],
            "aprendizaje_5": [("u3", "Identifica las principales expresiones culturales, los aportes de la cultura popular y el papel de las mujeres en la transformación política y cultural de México.", "contextual")],
            "aprendizaje_6": [("u5", "Analiza las crisis económicas y los movimientos sociales que buscan una sociedad justa, democrática e igualitaria.", "secundario")],
            "aprendizaje_7": [("u5", "Identifica los problemas actuales de la sociedad mexicana como un país multiétnico y pluricultural.", "secundario")],
        },
    },
}


def normalize_evidence(value: Any) -> Any:
    if isinstance(value, list):
        return [normalize_evidence(item) for item in value]
    if not isinstance(value, dict):
        return value
    normalized: dict[str, Any] = {}
    for key, item in value.items():
        if key == "evidencia":
            normalized["evidencias"] = item if isinstance(item, list) else [item]
        else:
            normalized[key] = normalize_evidence(item)
    return normalized


def align(items: list[dict[str, Any]], mapping: dict[str, list[tuple[str, str, str]]]) -> None:
    for item in items:
        legacy = item.pop("justificacion_curricular", None)
        item["alineacion_curricular"] = [
            {"unidad_id": unit, "referente_programa": reference, "alcance": scope}
            for unit, reference, scope in mapping[item["id"]]
        ]
        if legacy:
            item["nota_curaduria"] = legacy


def migrate(record_id: str, settings: dict[str, Any]) -> None:
    path = ROOT / "registros" / f"{record_id}.json"
    record = normalize_evidence(json.loads(path.read_text(encoding="utf-8")))
    align(record["conocimientos_habilidades_especificos"], settings["ch"])
    align(record["aprendizajes_programa_apoyados"], settings["ap"])
    record["campos_1_a_1"]["tipo_material"]["codigo"] = settings["material_code"]
    revision = record["revision"]
    revision["version"] = "2.0.0"
    revision["motivo"] = "Migración controlada al esquema 2.0: identidad pública, control editorial, evidencias uniformes y alineación curricular estructurada."
    migration_note = "Se migró desde el esquema 1.1 sin alterar las conclusiones históricas ni los localizadores de evidencia."
    if migration_note not in revision.setdefault("cambios", []):
        revision["cambios"].append(migration_note)
    ordered = {
        "schema_version": "2.0",
        "id_recurso": record_id,
        "indice": record["indice"],
        "slug": settings["slug"],
        "estado_editorial": "en_revision",
        "version_registro": "2.0.0",
        "fecha_alta": DATE,
        "fecha_modificacion": DATE,
        "registro_tipo": record["registro_tipo"],
        "revision": revision,
    }
    ordered.update({key: value for key, value in record.items() if key not in ordered})
    path.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


for resource_id, settings in MIGRATIONS.items():
    migrate(resource_id, settings)
