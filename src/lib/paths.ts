const normalizedBase = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${normalizedBase}${path}`;
}
