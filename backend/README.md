# Kampüs Etkinlikleri — Backend (Sprint 8)

Web Teknolojileri ve Programlama dersi proje ödevi. Öğrenci: Berat Efe Şahin — 2416501054

Express ile yazılmış, etkinlikleri JSON olarak veren REST API'dir. Sprint 8'de veriler bellekteki diziden **MongoDB**'ye taşındı: Mongoose ile `Event` modeli tanımlandı, sunucu kapanıp açılsa da kayıtlar veritabanında durur.

## Çalıştırma

```
cd backend
npm install
cp .env.example .env      (Windows: copy .env.example .env)
npm run seed
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Üretim benzeri çalıştırmak için `npm start`.

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Sunucuyu dosya değişince yeniden başlayacak şekilde açar |
| `npm start` | Sunucuyu normal açar |
| `npm run seed` | `events` koleksiyonunu boşaltır, 6 örnek etkinlik ekler (kaç kez çalışsa 6 kalır) |

## Ortam değişkenleri (.env)

| Değişken | Anlamı | Örnek |
|---|---|---|
| `PORT` | Sunucunun dinleyeceği port (yoksa 3000) | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi (Atlas veya yerel); adresin sonunda veritabanı adı olur | `mongodb://127.0.0.1:27017/kampus` |

`.env` dosyası GitHub'a gönderilmez (`.gitignore`). `.env.example` yalnızca yer tutucudur; gerçek adres ve şifre sadece kendi `.env` dosyanda durur. Atlas için değer, Atlas'ın Connect → Drivers ekranındaki adrestir (şifre yerine kendi veritabanı kullanıcı şifren yazılır ve sonuna `/kampus` eklenir). `MONGODB_URI` tanımlı değilse sunucu açılmaz ve "MONGODB_URI tanımlı değil" yazar.

## Veritabanı ve Model

Veritabanı adı `kampus`, koleksiyon adı `events` (model adı `Event` olduğu için Mongoose çoğul yapar). Her kayıt MongoDB'nin verdiği `_id` ile gelir; Sprint 7'deki `event-2` gibi id'ler artık yoktur.

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | zorunlu, boşlukları kırpılır, en az 3 en çok 100 karakter |
| `category` | String | zorunlu; yalnızca `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu (örn. `2026-12-22`) |
| `time` | String | kırpılır, varsayılan boş |
| `location` | String | kırpılır, varsayılan boş |
| `description` | String | kırpılır, en çok 500 karakter, varsayılan boş |
| `createdAt`, `updatedAt` | Date | `timestamps` ile kendiliğinden eklenir |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` ile filtrelenir, tarihe göre sıralı) | 200 | — | Bu sprint: MongoDB |
| GET | `/events/:id` | Tek etkinlik (`_id` ile) | 200 | 404 | Bu sprint: MongoDB |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint: MongoDB |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

- **200** tamam, **201** oluşturuldu, **204** içerik yok, **400** eksik/yanlış veri, **404** bulunamadı, **500** beklenmeyen sunucu hatası.
- `GET /events/yok` gibi biçimi yanlış bir id de, biçimi doğru ama kayıtsız bir id de **404** döner (500 değil).

### Hata biçimi

```json
{ "error": { "message": "Event not found" } }
```

Beklenmeyen hatalarda kullanıcıya yalnızca `Server error` gider; ayrıntı terminalde kalır ve sunucu çökmez.

### Örnekler

`POST /events` gövdesi (title, category ve date zorunlu):

```json
{
  "title": "Kodlama Maratonu",
  "category": "Atölye",
  "date": "2026-12-22",
  "capacity": 40
}
```

Başarılıysa 201 ve `_id`, `createdAt`, `updatedAt` ile kayıt döner. Eksik veya kurala uymayan alan varsa 400 ve schema'nın mesajı döner:

```json
{ "error": { "message": "Event validation failed: date: Path `date` is required., category: Path `category` is required." } }
```

## Klasör Yapısı

```
backend/
  src/
    config/database.js          MongoDB bağlantısı (adresi .env'den okur)
    models/event-model.js       Event schema ve modeli
    data/seed-events.js         6 örnek etkinlik (id alanı yok)
    seed.js                     npm run seed: koleksiyonu boşaltıp örnekleri ekler
    app.js                      Express uygulaması, middleware, 404 ve hata yakalayıcı
    server.js                   Önce veritabanına bağlanır, sonra portu dinler
    routes/event-routes.js      Hangi adres hangi fonksiyona gider
    controllers/event-controller.js   async/await ile Event modelini kullanır
  requests/kampus-api.json      Postman koleksiyonu (7 istek)
  .env.example                  Gerekli değişkenlerin örneği (gerçek adres yok)
  .gitignore                    node_modules ve .env GitHub'a gitmez
  package.json
  README.md
```

## Postman

`requests/kampus-api.json` dosyası Postman'de **Import** ile içeri alınabilir. Sunucu çalışırken (ve `npm run seed` yapıldıktan sonra) 7 isteğin hepsi başarılı olur: health, liste, tek etkinlik, olmayan id (404, `111111`), geçerli biçimde kayıtsız id (404), etkinlik oluştur (201), eksik veri (400). "3 Tek etkinlik" isteği, çalışmadan önce listeden gerçek bir `_id` alıp `{{eventId}}` değişkenine koyar; elle id kopyalamak gerekmez.

## Kalıcılık Testi

1. `npm run seed`, sonra `npm run dev`
2. Postman'de `POST /events` → 201, dönen `_id`'yi not al
3. Terminalde `Ctrl+C` ile sunucuyu durdur, `npm run dev` ile tekrar aç
4. `GET /events` → 7 kayıt; eklenen etkinlik hâlâ listede
5. Atlas'ta Browse Collections → `kampus` → `events` içinde de görünür
