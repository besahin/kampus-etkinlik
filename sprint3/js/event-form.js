import { events, fromIso, toIso } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#mesaj");

if (form) {
  const guncelleModu = form.dataset.mode === "guncelle";
  const alanlar = form.elements;

  const kategoriSecimi = alanlar["kategori"];
  new Set(events.map((e) => e.category)).forEach((k) => {
    const secenek = document.createElement("option");
    secenek.value = k;
    secenek.textContent = k;
    kategoriSecimi.append(secenek);
  });

  function hataGoster(alan, metin) {
    alan.setAttribute("aria-invalid", "true");
    const kap = alan.closest("p");
    let kucuk = kap.querySelector(".hata");
    if (!kucuk) {
      kucuk = document.createElement("small");
      kucuk.className = "hata";
      kucuk.id = `${alan.id}-hata`;
      kap.append(kucuk);
      alan.setAttribute("aria-describedby", kucuk.id);
    }
    kucuk.textContent = metin;
  }

  function hataTemizle(alan) {
    alan.removeAttribute("aria-invalid");
    alan.removeAttribute("aria-describedby");
    alan.closest("p").querySelector(".hata")?.remove();
  }

  function dogrula(veri) {
    const hatalar = [];
    const kontrol = (ad, kosul, metin) => {
      if (!kosul) hatalar.push([alanlar[ad], metin]);
    };

    kontrol("baslik", veri.baslik.trim().length >= 3, "Etkinlik adı en az 3 karakter olmalı.");
    kontrol("kategori", veri.kategori !== "", "Lütfen bir kategori seçin.");
    kontrol("tarih", veri.tarih !== "", "Lütfen bir tarih seçin.");
    kontrol("saat", veri.saat !== "", "Lütfen bir saat seçin.");
    kontrol("yer", veri.yer.trim() !== "", "Yer bilgisi boş bırakılamaz.");

    if (veri.kontenjan !== "") {
      const sayi = Number(veri.kontenjan);
      kontrol(
        "kontenjan",
        Number.isInteger(sayi) && sayi >= 1 && sayi <= 1000,
        "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı."
      );
    }
    return hatalar;
  }

  function uyariGoster(metin) {
    mesaj.className = "hata-kutusu";
    mesaj.replaceChildren(metin + " ");
    const link = document.createElement("a");
    link.href = "etkinlikler.html";
    link.textContent = "Etkinliklere git";
    mesaj.append(link);
  }

  if (guncelleModu) {
    const id = new URLSearchParams(window.location.search).get("id");
    const event = events.find((e) => e.id === id);

    if (event) {
      alanlar["baslik"].value = event.title;
      alanlar["kategori"].value = event.category;
      alanlar["tarih"].value = toIso(event.date);
      alanlar["saat"].value = event.time;
      alanlar["yer"].value = event.location;
      alanlar["kontenjan"].value = event.capacity;
      alanlar["aciklama"].value = event.description;
      form.dataset.id = event.id;
    } else {
      uyariGoster("Güncellenecek etkinlik seçilmedi. Lütfen listeden bir etkinlik seçin.");
      form.querySelector("button[type=submit]").disabled = true;
    }
  }

  form.addEventListener("input", (e) => {
    if (e.target.hasAttribute("aria-invalid")) hataTemizle(e.target);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const veri = Object.fromEntries(new FormData(form));
    [...form.elements].forEach((a) => a.id && hataTemizle(a));

    const hatalar = dogrula(veri);

    if (hatalar.length > 0) {
      hatalar.forEach(([alan, metin]) => hataGoster(alan, metin));
      hatalar[0][0].focus();
      mesaj.className = "";
      mesaj.replaceChildren();
      return;
    }

    const sonuc = {
      id: form.dataset.id ?? "yeni",
      title: veri.baslik.trim(),
      category: veri.kategori,
      date: fromIso(veri.tarih),
      time: veri.saat,
      location: veri.yer.trim(),
      capacity: veri.kontenjan === "" ? null : Number(veri.kontenjan),
      description: veri.aciklama.trim()
    };

    const baslik = document.createElement("strong");
    baslik.textContent = guncelleModu
      ? "Etkinlik başarıyla güncellendi (örnek çıktı):"
      : "Etkinlik başarıyla eklendi (örnek çıktı):";
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(sonuc, null, 2);

    mesaj.className = "basari-kutusu";
    mesaj.replaceChildren(baslik, pre);
    mesaj.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}