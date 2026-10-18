export async function onRequest(context) {
  const cookie = context.request.headers.get("Cookie") || "";
  if (!cookie.includes("admin_auth=1")) {
    const url = new URL(context.request.url);
    return fetch(`${url.origin}/404.html`);
  }
  return context.next();
}
