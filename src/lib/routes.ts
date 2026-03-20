const HAIR_BASE = "";

export function hairHref(path = "/") {
  if (path === "/") return "/";
  return `${HAIR_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

