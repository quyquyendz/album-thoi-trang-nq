import { put } from "@vercel/blob";
const PASS = () => process.env.ADMIN_PASSWORD || "admin123";
export async function POST(req) {
  if (req.headers.get("x-admin-password") !== PASS()) {
    return Response.json({ error: "Sai mat khau admin" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Blob chua duoc noi" }, { status: 503 });
  }
  try {
    const { data } = await req.json();
    if (!data || !String(data).startsWith("data:image/")) {
      return Response.json({ error: "Chi nhan anh dang data URL" }, { status: 400 });
    }
    const base64 = String(data).split(",")[1];
    const buf = Buffer.from(base64, "base64");
    if (buf.length > 4500000) {
      return Response.json({ error: "Anh qua lon (>4.5MB sau nen)" }, { status: 413 });
    }
    const name = "products/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ".jpg";
    const blob = await put(name, buf, { access: "public", contentType: "image/jpeg", addRandomSuffix: false });
    return Response.json({ ok: true, url: blob.url });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
