export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Block internal and hidden paths
  if (url.pathname.startsWith("/.") || url.pathname.startsWith("/workers-site")) {
    return fetch(`${url.origin}/404.html`);
  }

  return context.next();
}
