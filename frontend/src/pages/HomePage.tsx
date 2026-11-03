import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { usePageTitle } from "../utils/use-page-title";

function HomePage() {
  usePageTitle("Ana Sayfa");
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p>
        Kampüsümüzde düzenlenen etkinlikleri bu site üzerinden takip edebilir,
        etkinlik detaylarını inceleyebilir ve yeni bir etkinlik
        ekleyebilirsiniz.
      </p>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList
        events={upcoming}
        emptyText="Henüz etkinlik yok."
        limited
      />
      <p>
        <Link className="buton" to="/events">
          Tüm etkinlikleri gör &rarr;
        </Link>
      </p>
    </>
  );
}

export default HomePage;