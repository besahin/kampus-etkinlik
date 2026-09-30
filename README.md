
## Sprint 1 — HTML İskeleti

Amaç: sadece HTML ile "Kampüs Etkinlikleri" uygulamasının iskeletini oluşturmak, hiç CSS/JS kullanmamak.

- Tüm sayfalarda ortak yapı: `header + nav + main + footer`
- `etkinlikler.html`: `table` + `caption` + `tr` + `td` (her etkinlik bir hücre), `time`, `a`
- `etkinlik-detay.html`: `article`, `h1`, `figure > img + alt`, `figcaption`, `dl`/`dt`/`dd`, `time`, `a`
- `etkinlik-ekle.html`: `form`, `label`, `input` (text/date/time), `select`, `textarea`, `button`, `required`
- `etkinlik-guncelle.html`: aynı form, alanlar `value` ile dolu

## Sprint 2 — CSS ve Responsive Tasarım

Amaç: Sprint 1'deki HTML yapısını koruyarak CSS uygulamak, telefonda da masaüstünde de rahat kullanılan bir arayüz oluşturmak.

- Stil dosyası: `sprint2/css/numaran.css`
- `--no` değişkeni öğrenci numarasına (**2416501054**), `--font` değişkeni numaranın son hanesine göre (**4 → Georgia**) ayarlandı; renkler bu numaradan `hsl()` ile otomatik türetiliyor
- `etkinlikler.html`: tablo yapısı `section > article` kart yapısına çevrildi, `display: grid` ile responsive (telefonda tek sütun, geniş ekranda çok sütun)
- `etkinlik-detay.html`: afiş ve künye (`dl`) geniş ekranda yan yana, telefonda alt alta
- Nav: Ana Sayfa, Etkinlikler, Ekle, Güncelle (Detay artık kart linkinden erişiliyor)
- Form alanlarında geçersiz/boş `required` alan kırmızı kenarlıkla belirtiliyor

## Kontrol Listesi

- [x] Beş sayfa da canlı adresten erişilebiliyor
- [x] Menü bağlantılarının hepsi çalışıyor
- [x] Her sayfada tek `<h1>`
- [x] Telefonda yatay kaydırma ve taşma yok
- [x] Kartlar telefonda tek sütun, menü sığıyor
- [x] Boş form gönderince hata belirgin

## Canlı Site

https://kampus-etkinlik-delta.vercel.app

(Not: Vercel proje ayarlarında **Root Directory**, hangi sprint gösterilecekse ona göre `sprint1` veya `sprint2` olarak ayarlanmalı — şu an `sprint2`.)