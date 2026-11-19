import { put, list } from "@vercel/blob";
const STORE = "data/store.json";
const PASS = () => process.env.ADMIN_PASSWORD || "admin123";
export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ online: false, error: "Blob chua duoc noi" }, { status: 503 });
  }
  try {
    const { blobs } = await list({ prefix: "data/" });
    const found = blobs.find((b) => b.pathname === STORE);
    if (!found) return Response.json({ online: true, products: null, conf: null });
    const r = await fetch(found.url, { cache: "no-store" });
    if (!r.ok) return Response.json({ online: true, products: null, conf: null });
    const data = await r.json();
    return Response.json({ online: true, products: data.products || null, conf: data.conf || null });
  } catch (e) {
    return Response.json({ online: false, error: String(e) }, { status: 500 });
  }
}
export async function POST(req) {
  if (req.headers.get("x-admin-password") !== PASS()) {
    return Response.json({ error: "Sai mat khau admin" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Blob chua duoc noi" }, { status: 503 });
  }
  try {
    const body = await req.json();
    if (!Array.isArray(body.products)) {
      return Response.json({ error: "Thieu products" }, { status: 400 });
    }
    const payload = JSON.stringify({ products: body.products, conf: body.conf || null, updatedAt: new Date().toISOString() });
    const blob = await put(STORE, payload, { access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
    return Response.json({ ok: true, url: blob.url });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
