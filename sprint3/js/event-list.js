import { events, parseDate, formatDate, toIso } from "./data.js";

const liste = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  const card = document.createElement("article");
  card.className = "etkinlik-karti";

  const baslik = document.createElement("h3");
  baslik.textContent = event.title;

  const bilgi = document.createElement("p");
  const zaman = document.createElement("time");
  zaman.dateTime = toIso(event.date);
  zaman.textContent = formatDate(event.date);
  bilgi.append(`${event.category} · `, zaman, ` · ${event.location}`);

  const linkSatiri = document.createElement("p");
  const link = document.createElement("a");
  link.href = `etkinlik-detay.html?id=${encodeURIComponent(event.id)}`;
  link.innerHTML = "Detay &rarr;";
  linkSatiri.append(link);

  card.append(baslik, bilgi, linkSatiri);
  return card;
}

function render(items) {
  liste.replaceChildren(...items.map(createCard));
}

function sortedByDate(items) {
  return [...items].sort((a, b) => parseDate(a.date) - parseDate(b.date));
}

if (liste) {
  const limit = Number(liste.dataset.limit);

  if (limit > 0) {
    render(sortedByDate(events).slice(0, limit));
  } else {
    const sirali = sortedByDate(events);
    const form = document.querySelector("#filtre-formu");
    const arama = document.querySelector("#arama");
    const kategori = document.querySelector("#kategori-filtre");
    const sonuc = document.querySelector("#sonuc");

    if (kategori) {
      const kategoriler = new Set(events.map((e) => e.category));
      kategoriler.forEach((k) => {
        const secenek = document.createElement("option");
        secenek.value = k;
        secenek.textContent = k;
        kategori.append(secenek);
      });
    }

    function filtrele() {
      const aranan = (arama?.value ?? "").trim().toLocaleLowerCase("tr-TR");
      const secili = kategori?.value ?? "";

      const bulunanlar = sirali.filter((e) => {
        const kategoriUyar = secili === "" || e.category === secili;
        const metin = `${e.title} ${e.category} ${e.location} ${e.description}`
          .toLocaleLowerCase("tr-TR");
        return kategoriUyar && metin.includes(aranan);
      });

      render(bulunanlar);

      if (sonuc) {
        sonuc.textContent =
          bulunanlar.length === 0
            ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
            : `${bulunanlar.length} etkinlik listeleniyor.`;
      }
    }

    arama?.addEventListener("input", filtrele);
    kategori?.addEventListener("change", filtrele);
    form?.addEventListener("submit", (e) => e.preventDefault());

    filtrele();
  }
}