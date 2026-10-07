export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 120,
    description:
      "Sektörden konuşmacılar öğrencilerle bir araya gelecek, staj ve iş imkanları hakkında bilgi verecektir. Katılım için kayıt gerekmemektedir."
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    capacity: 30,
    description:
      "Katılımcılar küçük gruplar halinde basit bir robot kolu tasarlayıp programlayacak. Malzemeler organizasyon tarafından sağlanır."
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Semineri",
    category: "Seminer",
    date: "28-10-2026",
    time: "13:30",
    location: "B Blok Amfi",
    capacity: 150,
    description:
      "Güncel siber tehditler, güvenli parola kullanımı ve kişisel verilerin korunması üzerine bir uzmanın sunumu yapılacaktır."
  },
  {
    id: "event-4",
    title: "Yapay Zeka Atölyesi",
    category: "Atölye",
    date: "04-11-2026",
    time: "11:00",
    location: "Lab 3",
    capacity: 25,
    description:
      "Uygulamalı bir oturumda basit bir makine öğrenmesi modeli adım adım eğitilecek. Kendi dizüstü bilgisayarınızı getirmeniz önerilir."
  },
  {
    id: "event-5",
    title: "Girişimcilik Zirvesi",
    category: "Konferans",
    date: "18-11-2026",
    time: "09:30",
    location: "Kongre Merkezi",
    capacity: 300,
    description:
      "Genç girişimciler ve yatırımcılar panellerde deneyimlerini paylaşacak; gün sonunda fikir sunumları yapılacaktır."
  },
  {
    id: "event-6",
    title: "Kampüs Müzik Gecesi",
    category: "Sosyal",
    date: "02-12-2026",
    time: "19:00",
    location: "Merkez Meydan",
    capacity: 500,
    description:
      "Öğrenci toplulukları sahne alacak. Dönemin yorgunluğunu atmak için tüm kampüs davetlidir."
  }
];

export function parseDate(text) {
  const [gun, ay, yil] = text.split("-").map(Number);
  return new Date(yil, ay - 1, gun);
}

export function formatDate(text) {
  return parseDate(text).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function toIso(text) {
  const [gun, ay, yil] = text.split("-");
  return `${yil}-${ay}-${gun}`;
}

export function fromIso(text) {
  const [yil, ay, gun] = text.split("-");
  return `${gun}-${ay}-${yil}`;
}