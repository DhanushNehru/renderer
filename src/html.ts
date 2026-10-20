/** String safety and shared layout. Every user-supplied string passes through esc(). */

export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only https URLs ever reach an href or src - anything else renders as plain text. */
export function safeUrl(value: unknown): string | null {
  const s = String(value ?? "");
  return /^https:\/\/[^\s"'<>]+$/i.test(s) ? s : null;
}

const BASE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:40rem;margin:0 auto;padding:3.5rem 1.25rem 4rem}
a{color:var(--accent)}
img{max-width:100%}
.card{background:var(--surface);border:1px solid var(--ring);border-radius:1.25rem;padding:2rem;
box-shadow:0 10px 30px rgb(0 0 0 / .06)}
.avatar{width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid var(--ring)}
h1{font-size:1.9rem;line-height:1.2;margin-top:1rem}
.tagline{color:var(--muted);font-size:1.1rem;margin-top:.35rem}
.links{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.4rem;list-style:none;padding:0}
.links a{display:inline-block;padding:.5rem 1rem;border:1px solid var(--ring);border-radius:999px;
text-decoration:none;color:var(--text);background:var(--bg)}
.links a:hover{border-color:var(--accent);color:var(--accent)}
.cta{display:inline-block;margin-top:1.6rem;padding:.8rem 1.6rem;background:var(--accent);
color:var(--accent-text);border-radius:.75rem;text-decoration:none;font-weight:600}
.cta:hover{filter:brightness(1.05)}
section{margin-top:1.8rem}
h2{font-size:1.15rem;margin-bottom:.3rem}
section p{color:var(--muted)}
.features{list-style:none;padding:0;margin-top:1rem;display:grid;gap:.5rem}
.features li{padding-left:1.6rem;position:relative;color:var(--muted)}
.features li::before{content:"\\2726";position:absolute;left:0;color:var(--accent)}
.meta{margin-top:1.2rem;font-size:.9rem;color:var(--muted)}
footer{margin-top:3rem;text-align:center;font-size:.85rem;color:var(--muted)}
footer a{color:var(--muted)}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
@media (max-width:34rem){.wrap{padding-top:2rem}h1{font-size:1.5rem}}
`;

export interface LayoutOptions {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  themeCss: string;
  body: string;
}

export function layout(o: LayoutOptions): string {
  const image = o.image ? `<meta property="og:image" content="${esc(o.image)}"><meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${esc(o.url)}">
<meta name="twitter:title" content="${esc(o.title)}">
<meta name="twitter:description" content="${esc(o.description)}">
${image}
<style>${o.themeCss}${BASE_CSS}</style>
</head>
<body>
<main class="wrap">${o.body}</main>
</body>
</html>`;
}

export const FOOTER = `<footer>Made with <a href="https://got-a.page">got-a.page</a> - everyone's got a page.</footer>`;
