https://beratefesahin-frontend.vercel.app

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

## Sprint 6 + Vize — Neler Yapıldı?

- Sayfa state'i kaldırıldı; yerine `react-router-dom` ile 10 adres tanımlandı. Geri tuşu, sayfa yenileme ve bağlantı paylaşma çalışıyor.
- Menü `NavLink` ile, sayfa içi bağlantılar `Link` ile yapıldı; kod içinden geçişte `useNavigate` kullanıldı. Detay ve düzenleme sayfaları `:id` değerini `useParams` ile okuyor.
- Etkinlik listesi ve ekle/güncelle/sil fonksiyonları `EventsContext` içinde tutuluyor; sayfalar `useEvents()` ile doğrudan alıyor. Yönetim panelindeki değişiklik diğer sayfalarda hemen görünüyor.
- Ekle ve güncelle aynı `EventForm` bileşenini kullanıyor; form controlled input ve tek bir `handleChange` ile yönetiliyor.
- Doğrulama `utils/validate-event.ts` içindeki saf fonksiyonla yapılıyor; hatalar alanların altında gösteriliyor.
- Silmeden önce `window.confirm` ile onay isteniyor.
- Yönetim tablosu masaüstünde tablo, telefonda kart görünümünde.
- Giriş, kayıt ve şifremi unuttum sayfalarında doğrulama var; gerçek giriş sonraki sprintlere bırakıldı.
- Veriler sadece bellekte tutuluyor: sayfa yenilenirse liste başlangıç durumuna döner.

## Yayına Alma

1. Repository kökünde: `git add .`, `git commit -m "Complete sprint 6 and midterm frontend"`, `git tag frontend`, `git push`, `git push --tags`
2. Vercel → Settings → Build and Deployment: **Root Directory** = `frontend`, **Framework Preset** = `Vite`.
3. Vercel proje adı `beratefesahin-frontend` olarak ayarlanır.