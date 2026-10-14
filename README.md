https://kampus-etkinlik-delta.vercel.app

# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi proje ödevi. Öğrenci: Berat Efe Şahin — 2416501054

Proje haftalık sprintlerle ilerler: **Sprint 1** sadece HTML, **Sprint 2** CSS ve responsive tasarım, **Sprint 3** vanilla JavaScript ile dinamik sayfalar, **Sprint 4** Vite + TypeScript + React.

## Klasör Yapısı

    kampus-etkinlik/
      sprint1/            -> Sadece HTML iskeleti
      sprint2/            -> HTML + CSS
      sprint3/            -> HTML + CSS + JavaScript (ES modülleri)
      frontend/           -> Sprint 4: Vite + React + TypeScript (güncel sürüm)
        public/afis.svg
        src/
          data/events.ts
          types/campus-event.ts
          utils/filter-events.ts
          App.tsx
          App.css
          index.css
          main.tsx
      README.md

## Sprint 4 — Neler Yapıldı?

- Sprint 3'teki 5 HTML sayfası tek bir React uygulamasına (`App.tsx`) taşındı; sayfa değişimi router ile değil `useState` ile yapılıyor (router Sprint 6'da).
- Etkinlik bilgisi için `CampusEvent` tipi ve `Category` union tipi tanımlandı; veri `data/events.ts` içinde tipli bir dizi olarak duruyor.
- Arama ve kategori filtresi saf fonksiyonlarla (`utils/filter-events.ts`) yapılıyor; arama kutusu ve kategori seçimi birer state ve controlled input.
- Detay sayfası seçili etkinliğin id'sini state'te tutuyor; afişi olmayan etkinlikte boş kutu çizilmiyor.
- Sekme başlığı `useEffect` ile aktif sayfaya göre güncelleniyor.
- Ekle ve Güncelle formları bu sprintte sadece görünüyor, kayıt yapılmıyor.
- Sayfa geçişlerinde ve kartlarda yumuşak CSS animasyonları var; "animasyonları azalt" ayarı açıksa kapanıyor.
- `npm run build` hatasız tamamlanıyor.

## Oluşan Dosyalar ve Görevleri

- `package.json`: Proje adını, komutları (`dev`, `build`, `preview`) ve kullanılan paketlerin listesini tutar.
- `package-lock.json`: Yüklenen paketlerin tam sürümlerini kilitler, böylece herkes aynı sürümleri kurar.
- `node_modules/`: İndirilen paketlerin durduğu klasördür; çok büyük olduğu için GitHub'a gönderilmez.
- `tsconfig*.json`: TypeScript'in kuralları ve derleme ayarlarıdır.
- `vite.config.ts`: Vite ayarlarıdır; React eklentisini açar ve CSS'in küçültülmesini kapatır (aksi halde öğrenci numarasından türetilen renk bozuluyor).
- `index.html`: Uygulamanın tek HTML dosyasıdır; içinde `div#root` bulunur, `lang="tr"` ve başlık burada ayarlıdır.
- `src/main.tsx`: React'i başlatır ve `App` bileşenini `div#root` içine çizer.
- `src/App.tsx`: Uygulamanın ana bileşenidir; 5 sayfanın tamamı ve sayfa/arama state'leri burada.
- `src/App.css`: Sprint 3'ten taşınan stillerdir; renk ve font öğrenci numarasından gelir.
- `src/index.css`: Bu sprintte bilerek boş bırakıldı.
- `public/`: Olduğu gibi kopyalanan dosyaların klasörüdür; etkinlik afişi (`afis.svg`) burada.

## Yerelde Çalıştırma

    cd frontend
    npm install
    npm run dev

Tarayıcıda `http://localhost:5173` adresini açın. Üretim derlemesini denemek için `npm run build` ve `npm run preview`.

## Yayına Alma

1. Repository kökünde: `git add .`, `git commit -m "Complete sprint 4"`, `git tag sprint-04`, `git push`, `git push --tags`
2. Vercel → Settings → Build and Deployment: **Root Directory** = `frontend`, **Framework Preset** = `Vite`. Ardından Redeploy.