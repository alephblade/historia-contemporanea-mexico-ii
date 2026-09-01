import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { SourceAvailability } from './public-data';

interface PublicMarkdownOptions {
  source?: {
    url: string;
    title: string;
    availability: SourceAvailability;
  };
}

export function renderPublicMarkdown(markdown: string, options: PublicMarkdownOptions = {}) {
  const rendered = marked.parse(markdown, { async: false, gfm: true }) as string;
  const clean = sanitizeHtml(rendered, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'details',
      'summary',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'title', 'target', 'rel', 'aria-label'],
      span: ['class', 'title', 'aria-disabled'],
      th: ['scope'],
      td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => {
        if (options.source && attribs.href === options.source.url) {
          if (options.source.availability === 'no_disponible') {
            return {
              tagName: 'span',
              attribs: {
                class: 'unavailable-inline-source',
                title: 'Fuente registrada temporalmente no disponible',
                'aria-disabled': 'true',
              },
            };
          }
          return {
            tagName,
            attribs: {
              ...attribs,
              'aria-label': `Abrir fuente institucional de ${options.source.title}`,
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          };
        }
        if (/^https?:\/\//.test(attribs.href ?? '')) {
          return { tagName, attribs: { ...attribs, target: '_blank', rel: 'noreferrer noopener' } };
        }
        return { tagName, attribs };
      },
    },
  });

  const shifted = clean.replace(/<\/?h([1-5])(?=[ >])/g, (tag) => tag.replace(/h([1-5])/, (_, level) => `h${Number(level) + 1}`));
  return shifted
    .replaceAll('<table>', '<div class="table-region" role="region" aria-label="Tabla desplazable" tabindex="0"><table>')
    .replaceAll('</table>', '</table></div>');
}
