export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Optional admin protection – fallback to 404 if not authorized
    if (url.pathname.startsWith("/admin")) {
      const cookie = request.headers.get("Cookie") || "";
      if (!cookie.includes("admin_auth=1")) {
        return fetch(`${url.origin}/404.html`);
      }
    }
    // Let Cloudflare serve static assets from the bucket
    return fetch(request);
  }
};
