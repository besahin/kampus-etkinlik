import { events, formatDate, toIso } from "./data.js";

const kutu = document.querySelector("#detay");

function el(tag, text) {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  return e;
}

function showError() {
  const baslik = el("h1", "Etkinlik bulunamadı");
  const mesaj = el("p", "Aradığınız etkinlik mevcut değil veya adres hatalı.");
  mesaj.className = "hata-kutusu";
  const geri = el("p");
  const link = el("a", "← Listeye dön");
  link.href = "etkinlikler.html";
  geri.append(link);
  kutu.replaceChildren(baslik, mesaj, geri);
  document.title = "Etkinlik bulunamadı - Kampüs Etkinlikleri";
}

function showEvent(event) {
  document.title = `${event.title} - Etkinlik Detayı`;

  const baslik = el("h1", event.title);

  const icerik = el("div");
  icerik.className = "detay-icerik";

  const figure = el("figure");
  const img = el("img");
  img.src = "afis.svg";
  img.alt = `${event.title} etkinlik afişi`;
  figure.append(img, el("figcaption", `Şekil: ${event.title} afişi`));

  const dl = el("dl");
  const zaman = el("time", `${formatDate(event.date)}, ${event.time}`);
  zaman.dateTime = `${toIso(event.date)}T${event.time}`;
  const ddTarih = el("dd");
  ddTarih.append(zaman);

  dl.append(
    el("dt", "Tarih"), ddTarih,
    el("dt", "Yer"), el("dd", event.location),
    el("dt", "Kategori"), el("dd", event.category),
    el("dt", "Kontenjan"), el("dd", `${event.capacity} kişi`)
  );
  icerik.append(figure, dl);

  const aciklama = el("p", event.description);

  const linkler = el("p");
  const geri = el("a", "← Listeye dön");
  geri.href = "etkinlikler.html";
  const guncelle = el("a", "Bu etkinliği güncelle");
  guncelle.href = `etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}`;
  linkler.append(geri, " · ", guncelle);

  kutu.replaceChildren(baslik, icerik, aciklama, linkler);
}

if (kutu) {
  const id = new URLSearchParams(window.location.search).get("id");
  const event = events.find((e) => e.id === id);
  if (event) {
    showEvent(event);
  } else {
    showError();
  }
}