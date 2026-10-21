import type { CampusEvent, Category } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 120,
    description:
      "Sektörden konuşmacılar öğrencilerle bir araya gelecek, staj ve iş imkanları hakkında bilgi verecektir. Katılım için kayıt gerekmemektedir.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    capacity: 30,
    description:
      "Katılımcılar küçük gruplar halinde basit bir robot kolu tasarlayıp programlayacak. Malzemeler organizasyon tarafından sağlanır.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Semineri",
    category: "Seminer",
    date: "2026-10-28",
    time: "13:30",
    location: "B Blok Amfi",
    capacity: 150,
    description:
      "Güncel siber tehditler, güvenli parola kullanımı ve kişisel verilerin korunması üzerine bir uzmanın sunumu yapılacaktır.",
    image: "/afis.svg"
  },
  {
    id: "event-4",
    title: "Yapay Zeka Atölyesi",
    category: "Atölye",
    date: "2026-11-04",
    time: "11:00",
    location: "Lab 3",
    capacity: 25,
    description:
      "Uygulamalı bir oturumda basit bir makine öğrenmesi modeli adım adım eğitilecek. Kendi dizüstü bilgisayarınızı getirmeniz önerilir.",
    image: "/afis.svg"
  },
  {
    id: "event-5",
    title: "Girişimcilik Zirvesi",
    category: "Konferans",
    date: "2026-11-18",
    time: "09:30",
    location: "Kongre Merkezi",
    capacity: 300,
    description:
      "Genç girişimciler ve yatırımcılar panellerde deneyimlerini paylaşacak; gün sonunda fikir sunumları yapılacaktır.",
    image: "/afis.svg"
  },
  {
    id: "event-6",
    title: "Kampüs Müzik Gecesi",
    category: "Sosyal",
    date: "2026-12-02",
    time: "19:00",
    location: "Merkez Meydan",
    capacity: 500,
    description:
      "Öğrenci toplulukları sahne alacak. Dönemin yorgunluğunu atmak için tüm kampüs davetlidir."
  }
];
export const categories: Category[] = [...new Set(events.map((e) => e.category))];