# Kampüs Etkinlikleri — Backend (Sprint 7)

Web Teknolojileri ve Programlama dersi proje ödevi. Öğrenci: Berat Efe Şahin — 2416501054

Express ile yazılmış, etkinlikleri JSON olarak veren basit bir REST API'dir. Veriler şimdilik bellekte (dizi) tutulur; sunucu yeniden başlayınca POST ile eklenen kayıtlar kaybolur. Sonraki sprintlerde MongoDB'ye taşınacak.

## Çalıştırma

```
cd backend
npm install
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Üretim benzeri çalıştırmak için `npm start`.

## Ortam değişkeni (.env)

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinleyeceği port | 3000 |

`.env` dosyası GitHub'a gönderilmez. Başlamak için `.env.example` dosyasını kopyalayıp adını `.env` yapın:

```
cp .env.example .env
```

(Windows'ta: `copy .env.example .env`). `.env` yoksa sunucu 3000 portunu kullanır.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` ile filtrelenebilir) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

- **200** tamam, **201** oluşturuldu, **204** içerik yok, **400** eksik/yanlış veri, **404** bulunamadı.

### Hata biçimi

Bütün hatalar aynı biçimdedir:

```json
{ "error": { "message": "Event not found" } }
```

### Örnekler

`GET /health` → 200

```json
{ "status": "ok", "time": "2026-11-11T10:00:00.000Z", "student": "2416501054" }
```

`GET /events/event-2` → 200 (bulunamazsa 404, `Event not found`)

`POST /events` gövdesi (title, category ve date zorunlu):

```json
{
  "title": "Kodlama Maratonu",
  "category": "Atölye",
  "date": "2026-12-22",
  "capacity": 40
}
```

Başarılıysa 201 ve yeni kayıt (`id` otomatik verilir). Eksik alan varsa 400:

```json
{ "error": { "message": "title, category and date are required" } }
```

## Klasör Yapısı

```
backend/
  src/
    app.js                      Express uygulaması, middleware, route bağlama
    server.js                   .env okur, portu dinler
    routes/event-routes.js      Hangi adres hangi fonksiyona gider
    controllers/event-controller.js   İsteği işler, yanıtı döndürür
    data/events.js              Bellek içi etkinlik dizisi
  requests/kampus-api.json      Postman koleksiyonu (6 istek)
  .env.example                  Gerekli değişkenlerin örneği
  .gitignore                    node_modules ve .env GitHub'a gitmez
  package.json
  README.md
```

## Postman

`requests/kampus-api.json` dosyası Postman'de **Import** ile içeri alınabilir. Koleksiyonda 6 istek vardır: health, liste, tek etkinlik, olmayan etkinlik (404), etkinlik oluştur (201), eksik veri (400). Sunucu çalışırken istekler `http://localhost:3000` adresine gider.