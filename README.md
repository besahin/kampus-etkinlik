https://kampus-etkinlik-delta.vercel.app

# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi proje ödevi. Öğrenci: Berat Efe Şahin — 2416501054

Proje haftalık sprintlerle ilerler: **Sprint 1** sadece HTML, **Sprint 2** CSS ve responsive tasarım, **Sprint 3** vanilla JavaScript ile dinamik sayfalar.

## Klasör Yapısı

    kampus-etkinlik/
      sprint1/                  -> Sadece HTML iskeleti
      sprint2/                  -> HTML + CSS (css/numaran.css)
      sprint3/                  -> HTML + CSS + JavaScript (güncel sürüm)
        css/2416501054.css
        js/data.js              -> Tek veri kaynağı + tarih yardımcıları
        js/event-list.js        -> Liste, "yaklaşan 2" ve filtre
        js/event-detail.js      -> ?id= ile detay sayfası
        js/event-form.js        -> Ekle / Güncelle formu doğrulaması
        afis.svg
        index.html
        etkinlikler.html
        etkinlik-detay.html
        etkinlik-ekle.html
        etkinlik-guncelle.html
      .gitignore
      README.md

## Sprint 3 — Neler Yapıldı?

- Etkinlik verileri yalnızca `js/data.js` içinde tutulur; hiçbir sayfada elle yazılmış kart yoktur.
- Ana sayfa tarihe göre en yakın 2 etkinliği, Etkinlikler sayfası tüm etkinlikleri `createElement` ile dinamik üretir.
- Arama kutusu (başlık, kategori, yer, açıklama) ve kategori filtresi birlikte çalışır; Türkçe büyük/küçük harf için `toLocaleLowerCase("tr-TR")` kullanılır. Sonuç yoksa bilgilendirme mesajı gösterilir.
- Detay sayfası `URLSearchParams` ile adres çubuğundaki `?id=` değerini okur (ör. `etkinlik-detay.html?id=event-3`). Geçersiz veya eksik id'de hata mesajı ve listeye dönüş bağlantısı gösterilir.
- Ekle ve Güncelle formları `FormData` ile okunur, JavaScript ile doğrulanır (`aria-invalid` + hata mesajı) ve başarılı olunca sonuç nesnesi sayfada gösterilir. Güncelle sayfası formu `?id=` ile gelen etkinliğin bilgileriyle doldurur.
- Tarihler `GG-AA-YYYY` tutulduğu için `new Date(...)` yerine kendi `parseDate` fonksiyonumuz kullanılır.
- `localStorage`, framework veya jQuery kullanılmamıştır; kod ES modülleri (`type="module"`) ile ayrılmıştır.

## Yerelde Çalıştırma

ES modülleri `file://` ile çalışmaz. VS Code'da **Live Server** eklentisiyle `sprint3/index.html` dosyasını açın (`http://127.0.0.1:5500/sprint3/`).

## Yayına Alma

1. Değişiklikleri commit edin ve etiketleyin: `git add .`, `git commit -m "Sprint3 yapıldı"`, `git tag sprint-03`, `git push`, `git push --tags`
2. Vercel → Settings → Build and Deployment → **Root Directory** = `sprint3`, ardından Redeploy.
3. Canlı adreste `etkinlik-detay.html?id=event-3` gibi bir adresin doğrudan açıldığını kontrol edin.