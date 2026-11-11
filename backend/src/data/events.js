// Bellek içi veri: sunucu yeniden başlayınca POST ile eklenenler kaybolur.
// Sprint 8'de bu dizi MongoDB'ye taşınacak.
export const events = [
  {
    id: "event-1",
    title: "Açık Kaynak Tanışma Buluşması",
    category: "Seminer",
    date: "2026-11-19",
    time: "15:00",
    location: "C Blok Seminer Salonu",
    capacity: 90,
    description:
      "Açık kaynak projelere nasıl katkı verilir, ilk pull request nasıl açılır? Deneyimli geliştiriciler anlatıyor."
  },
  {
    id: "event-2",
    title: "3D Yazıcı ile Prototip Atölyesi",
    category: "Atölye",
    date: "2026-11-24",
    time: "10:30",
    location: "Makine Laboratuvarı 1",
    capacity: 20,
    description:
      "Katılımcılar basit bir parçayı çizip 3D yazıcıdan çıkaracak. Çizim programı yüklü bilgisayarlar hazır olacak."
  },
  {
    id: "event-3",
    title: "Veri Bilimine Giriş Semineri",
    category: "Seminer",
    date: "2026-11-26",
    time: "13:00",
    location: "Mühendislik Fakültesi Amfi 3",
    capacity: 140,
    description:
      "Veri nedir, nasıl temizlenir, grafiklerle nasıl anlatılır? Örnek bir veri seti üzerinden sade bir giriş."
  },
  {
    id: "event-4",
    title: "Mobil Uygulama Geliştirme Atölyesi",
    category: "Atölye",
    date: "2026-12-03",
    time: "11:00",
    location: "Bilgisayar Laboratuvarı 4",
    capacity: 24,
    description:
      "İki saatte basit bir yapılacaklar uygulaması yapılacak. Telefonunuzda denemek için kablo getirmeniz önerilir."
  },
  {
    id: "event-5",
    title: "Teknoloji ve Gelecek Konferansı",
    category: "Konferans",
    date: "2026-12-10",
    time: "09:30",
    location: "Kültür Merkezi Salonu",
    capacity: 250,
    description:
      "Yapay zeka, otomasyon ve yeni mesleklerin konuşulduğu iki oturumluk konferans; sonunda soru-cevap bölümü var."
  },
  {
    id: "event-6",
    title: "Kış Şenliği Konseri",
    category: "Sosyal",
    date: "2026-12-17",
    time: "18:30",
    location: "Kampüs Amfi Tiyatro",
    capacity: 400,
    description:
      "Öğrenci toplulukları dönemin son etkinliğinde sahne alıyor. Sıcak içecekler ücretsiz."
  }
];