<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Quill Labs</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          :root {
            --bg: #08090b;
            --surface: #101216;
            --border: #232730;
            --text-primary: #f0f2f5;
            --text-secondary: #9aa0a6;
            --accent: #6b46c1;
            --accent-glow: rgba(107, 70, 193, 0.2);
            --badge-bg: rgba(107, 70, 193, 0.15);
            --code-font: 'JetBrains Mono', monospace;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background-color: var(--bg);
            color: var(--text-primary);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 2.5rem 1.5rem;
          }
          .container {
            max-width: 1040px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 2.5rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 1.5rem;
          }
          .brand-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
          }
          .brand-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.02em;
          }
          .brand-tag {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
            background: var(--badge-bg);
            color: #a78bfa;
            border: 1px solid rgba(167, 139, 250, 0.3);
            border-radius: 999px;
            font-family: var(--code-font);
            font-weight: 600;
          }
          .desc {
            color: var(--text-secondary);
            font-size: 0.95rem;
            max-width: 720px;
          }
          .desc a {
            color: #c4b5fd;
            text-decoration: none;
          }
          .desc a:hover {
            text-decoration: underline;
          }
          .stats-bar {
            display: flex;
            gap: 1.5rem;
            margin-top: 1rem;
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-family: var(--code-font);
          }
          .stats-item strong {
            color: var(--text-primary);
          }
          .table-wrapper {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          thead {
            background: #14171d;
            border-bottom: 1px solid var(--border);
          }
          th {
            padding: 0.85rem 1.25rem;
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-secondary);
          }
          td {
            padding: 0.95rem 1.25rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            font-size: 0.88rem;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: rgba(255, 255, 255, 0.02);
          }
          .url-link {
            color: #60a5fa;
            text-decoration: none;
            font-family: var(--code-font);
            font-size: 0.85rem;
            word-break: break-all;
          }
          .url-link:hover {
            text-decoration: underline;
            color: #93c5fd;
          }
          .priority-pill {
            display: inline-block;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            font-size: 0.75rem;
            font-family: var(--code-font);
            font-weight: 600;
          }
          .freq-pill {
            display: inline-block;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.06);
            color: var(--text-secondary);
            font-size: 0.75rem;
            font-family: var(--code-font);
          }
          .date {
            color: var(--text-secondary);
            font-family: var(--code-font);
            font-size: 0.8rem;
          }
          footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.8rem;
            color: var(--text-secondary);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="brand-row">
              <span class="brand-name">Quill Labs</span>
              <span class="brand-tag">XML SITEMAP</span>
            </div>
            <p class="desc">
              This XML Sitemap is generated for search engines (Google, Bing) to discover and index all public pages on 
              <a href="https://quill-lab.runs-on.dev/">quill-lab.runs-on.dev</a>.
            </p>
            <div class="stats-bar">
              <div class="stats-item">Total URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
              <div class="stats-item">Status: <strong style="color: #4ade80;">Active &amp; Valid</strong></div>
            </div>
          </header>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">URL</th>
                  <th style="width: 15%;">Priority</th>
                  <th style="width: 15%;">Change Frequency</th>
                  <th style="width: 20%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a class="url-link">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority-pill">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="freq-pill">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="date">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            <p>© 2026 Quill Labs — Business Systems Studio • Verified for Google Search Console</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
