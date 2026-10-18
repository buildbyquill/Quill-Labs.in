export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Block sensitive internal paths
    if (url.pathname.startsWith("/.") || url.pathname.startsWith("/workers-site")) {
      return fetch(`${url.origin}/404.html`);
    }

    // Optional admin protection – fallback to 404 if not authorized
    if (url.pathname.startsWith("/admin")) {
      const cookie = request.headers.get("Cookie") || "";
      if (!cookie.includes("admin_auth=1")) {
        return fetch(`${url.origin}/404.html`);
      }
    }

    // Handle legacy v1 URLs with 301 redirects
    const legacyMap = {
      "/v1%20contact.html": "/contact",
      "/v1%20contact": "/contact",
      "/v1%20services.html": "/services",
      "/v1%20services": "/services",
      "/v1%20ourprocess.html": "/ourprocess",
      "/v1%20ourprocess": "/ourprocess",
      "/v1%20abt.html": "/about",
      "/v1%20abt": "/about",
      "/v1%20home.html": "/",
      "/v1%20home": "/"
    };
    if (legacyMap[url.pathname]) {
      return Response.redirect(`${url.origin}${legacyMap[url.pathname]}`, 301);
    }

    // Let Cloudflare serve static assets from the bucket
    return fetch(request);
  }
};
