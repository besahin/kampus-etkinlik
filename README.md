[https://kampus-etkinlik-delta.vercel.app

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
2. Vercel → Settings → Build and Deployment: **Root Directory** = `frontend`, **Framework Preset** = `Vite`. Ardından Redeploy.](https://beratefesahin-frontend.vercel.app

# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi proje ödevi. Öğrenci: Berat Efe Şahin — 2416501054

Proje haftalık sprintlerle ilerler: **Sprint 1** sadece HTML, **Sprint 2** CSS ve responsive tasarım, **Sprint 3** vanilla JavaScript ile dinamik sayfalar, **Sprint 4** Vite + TypeScript + React, **Sprint 5** React bileşenlerine bölme (props, callback, lifting state), **Sprint 6 + Vize** React Router, Context ve yönetim paneli.

## Canlı Adres

https://beratefesahin-frontend.vercel.app

## Kurulum ve Çalıştırma

```
cd frontend
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın. Üretim derlemesini denemek için `npm run build` ve `npm run preview`.

## Route Listesi

| Adres | Sayfa | Açıklama |
|---|---|---|
| `/` | HomePage | Yaklaşan 2 etkinlik |
| `/events` | EventsPage | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | EventDetailPage | Tek etkinliğin detayı; id bulunamazsa "Sayfa bulunamadı" |
| `/login` | LoginPage | Giriş formu (doğrulama var, gerçek giriş Sprint 10'da) |
| `/register` | RegisterPage | Kayıt formu (doğrulama var, gerçek kayıt Sprint 10'da) |
| `/forgot-password` | ForgotPasswordPage | Şifre sıfırlama bağlantısı isteme (demo) |
| `/admin` | AdminPage | Etkinlik tablosu; düzenle ve sil (onaylı) |
| `/admin/new` | AddEventPage | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | EditEventPage | Var olan etkinliği güncelleme formu |
| `*` | NotFoundPage | Tanımsız adreslerde "Sayfa bulunamadı" |

## Klasör Yapısı

```
kampus-etkinlik/
  sprint1/            -> Sadece HTML iskeleti
  sprint2/            -> HTML + CSS
  sprint3/            -> HTML + CSS + JavaScript (ES modülleri)
  frontend/           -> Sprint 4-6: Vite + React + TypeScript (güncel sürüm)
    public/afis.svg
    vercel.json       -> Doğrudan adres açılınca (/events gibi) index.html'e yönlendirir
    src/
      components/
        layout/   Header.tsx  Navigation.tsx  Footer.tsx
        events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
        forms/    EventForm.tsx
      context/    EventsContext.tsx
      pages/      HomePage  EventsPage  EventDetailPage  AdminPage  AddEventPage
                  EditEventPage  LoginPage  RegisterPage  ForgotPasswordPage  NotFoundPage
      data/events.ts
      types/campus-event.ts
      utils/filter-events.ts  format-date.ts  validate-event.ts  use-page-title.ts
      App.tsx
      App.css
      index.css
      main.tsx
  README.md
```

## Sprint 6 + Vize — Neler Yapıldı?

- Sayfa state'i (`useState` ile sayfa değiştirme) kaldırıldı; yerine `react-router-dom` ile 10 adres tanımlandı. Geri tuşu, sayfa yenileme ve bağlantı paylaşma çalışıyor.
- Menü `NavLink` ile, sayfa içi bağlantılar `Link` ile yapıldı; kod içinden geçişte `useNavigate` kullanıldı. Detay ve düzenleme sayfaları adres parçasındaki `:id` değerini `useParams` ile okuyor.
- Etkinlik listesi ve ekle/güncelle/sil fonksiyonları `EventsContext` içinde tutuluyor; sayfalar `useEvents()` ile doğrudan alıyor. Bu yüzden yönetim panelindeki değişiklik Ana Sayfa, Etkinlikler ve detay sayfasında hemen görünüyor.
- Ekle ve güncelle aynı `EventForm` bileşenini kullanıyor; form controlled input ve tek bir `handleChange` ile yönetiliyor.
- Doğrulama `utils/validate-event.ts` içindeki saf fonksiyonla yapılıyor; hatalar alanların altında gösteriliyor ve `aria-invalid` ile işaretleniyor.
- Silmeden önce `window.confirm` ile onay isteniyor.
- Yönetim tablosu masaüstünde tablo, telefonda kart görünümünde.
- Giriş, kayıt ve şifremi unuttum sayfalarında doğrulama var; gerçek giriş sonraki sprintlere bırakıldı.
- Sekme başlığı her sayfada `usePageTitle` ile (içinde `useEffect`) güncelleniyor.
- Veriler sadece bellekte tutuluyor: sayfa yenilenirse liste başlangıç durumuna döner.
- `npm run build` hatasız tamamlanıyor.

## Sprint 5 — Neler Yapıldı?

- Tek parça `App.tsx` 8 bileşene bölündü (Header, Navigation, Footer, EventCard, EventList, EventFilter, EventDetail, EventForm); her biri `src/components` altında kendi dosyasında.
- Bileşenlerin aldığı veri `interface` ile tiplendi; olaylar callback ile yukarı bildirildi.
- Arama metni ve kategori state'i ortak üst bileşende tutuldu (lifting state); listede `key` olarak etkinliğin `id`'si kullanıldı.

## Sprint 4 — Neler Yapıldı?

- Sprint 3'teki 5 HTML sayfası React uygulamasına taşındı; `CampusEvent` ve `Category` tipleri tanımlandı.
- Arama ve kategori filtresi saf fonksiyonlarla (`utils/filter-events.ts`) yapılıyor; arama kutusu ve kategori seçimi controlled input.

## Oluşan Dosyalar ve Görevleri

- `package.json`: Proje adını, komutları (`dev`, `build`, `preview`) ve kullanılan paketlerin listesini tutar.
- `package-lock.json`: Yüklenen paketlerin tam sürümlerini kilitler, böylece herkes aynı sürümleri kurar.
- `node_modules/`: İndirilen paketlerin durduğu klasördür; çok büyük olduğu için GitHub'a gönderilmez.
- `tsconfig*.json`: TypeScript'in kuralları ve derleme ayarlarıdır.
- `vite.config.ts`: Vite ayarlarıdır; React eklentisini açar ve CSS'in küçültülmesini kapatır (aksi halde öğrenci numarasından türetilen renk bozuluyor).
- `vercel.json`: Vercel'de `/events` gibi bir adres doğrudan açılınca `index.html`'e yönlendirir; router'ın çalışması için gerekli.
- `index.html`: Uygulamanın tek HTML dosyasıdır; içinde `div#root` bulunur.
- `src/main.tsx`: React'i başlatır; `App`'i `BrowserRouter` ve `EventsProvider` ile sarar.
- `src/App.tsx`: Üst kısım, menü, adres-sayfa eşleşmeleri (`Routes`) ve alt kısmı bir araya getirir; kendi verisi yoktur.
- `src/context/EventsContext.tsx`: Etkinlik listesini ve ekle/güncelle/sil fonksiyonlarını tüm sayfalara açar.
- `src/pages/`: Her adrese bağlı sayfa bileşenleri.
- `src/components/`: Sayfalarda kullanılan küçük, tekrar kullanılabilir parçalar.
- `src/utils/`: Filtreleme, tarih biçimleme, form doğrulama ve sekme başlığı yardımcıları.
- `src/App.css`: Tüm stiller; renk ve font öğrenci numarasından gelir.
- `public/`: Olduğu gibi kopyalanan dosyaların klasörüdür; etkinlik afişi (`afis.svg`) burada.

## Yayına Alma

1. Repository kökünde: `git add .`, `git commit -m "Complete sprint 6 and midterm frontend"`, `git tag frontend`, `git push`, `git push --tags`
2. Vercel → Settings → Build and Deployment: **Root Directory** = `frontend`, **Framework Preset** = `Vite`.
3. Vercel → Settings → Domains: `beratefesahin-frontend.vercel.app` adresi projeye eklenir.)
