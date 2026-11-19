# NQ GUANGZHOU — Album thời trang Nguyễn Quý

Web album bán hàng thời trang Quảng Châu: phân loại Áo / Quần / Váy & Đầm / Set đồ / Áo khoác / Phụ kiện, xem chi tiết từng món, liên hệ mua qua Zalo, Facebook, TikTok, Instagram.

## Chạy / Deploy

- **GitHub Pages:** tạo repo public, upload `index.html` (và `products.json` nếu có) lên nhánh `main`, vào Settings → Pages → Deploy from branch `main` / root.
- **Vercel:** Import repo này vào Vercel → Deploy (không cần cấu hình build, Framework: Other).

## Trang Admin

- Bấm nút **Admin** ở góc phải trên web, mật khẩu mặc định: `admin123`
- Admin thêm / sửa / xoá món, up ảnh từ máy hoặc dán link ảnh, chỉnh link Facebook / TikTok / Instagram / số Zalo / thông tin ngân hàng.

### Bản Vercel + Blob (admin up ảnh online — bản chính)

1. Import repo này vào Vercel → Deploy.
2. Trong project Vercel: **Storage → Create → Blob** → Connect to Project (Vercel tự thêm biến `BLOB_READ_WRITE_TOKEN`).
3. (Tuỳ chọn) Settings → Environment Variables: thêm `ADMIN_PASSWORD` = mật khẩu admin riêng, rồi Redeploy.
4. Từ đó Admin up ảnh / lưu món là dữ liệu được lưu lên Blob (`data/store.json` + ảnh trong `products/`), khách vào là thấy ngay. Trang Admin sẽ hiện dòng **🟢 ONLINE (Vercel + Blob)** khi đã nối thành công.

### Bản tĩnh GitHub Pages (dự phòng)

Không có máy chủ lưu dữ liệu: sau khi thêm hàng trong Admin, bấm **Xuất products.json** rồi upload file đó lên repo GitHub (Add file → Upload files → Commit). Web sẽ tự cập nhật cho khách trong ~1 phút.

## Liên hệ shop

- Zalo: 0325606519 — https://zalo.me/0325606519
- Điện thoại: 0865894390
- Instagram: NGUYỄN QUÝ GUANGZHOU
- Chuyển khoản: Vietcombank 1044956648 — NGUYEN XUAN QUY

> Link Facebook / TikTok / Instagram chính thức: mở Admin → Cài đặt, dán link thật vào và gửi lại cho người quản trị web để gắn cứng lên bản public.
