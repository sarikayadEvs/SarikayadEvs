import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the sales-focused homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>SarikayaDevs \| Satış Odaklı Web Tasarım<\/title>/i);
  assert.match(html, /KOBİ’ler için dijital büyüme/);
  assert.match(html, /İşinizi büyütün/);
  assert.match(html, /Hızlı, güven veren ve ziyaretçileri müşteriye/);
  assert.match(html, /href="#iletisim">Ücretsiz Görüşme/);
  assert.match(html, /href="#projeler">Projeleri İncele/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the finished site free of starter preview code", async () => {
  const [page, layout, portfolio, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PortfolioClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PortfolioClient \/>/);
  assert.match(layout, /SarikayaDevs \| Satış Odaklı Web Tasarım/);
  assert.match(portfolio, /Ücretsiz Görüşme/);
  assert.doesNotMatch(page + layout + portfolio, /codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
