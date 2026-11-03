import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import { usePageTitle } from "../utils/use-page-title";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  usePageTitle(event ? "Etkinliği Güncelle" : "Sayfa bulunamadı");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">Etkinliği Güncelle</h2>
      <EventForm
        key={event.id}
        initialData={{
          title: event.title,
          category: event.category,
          date: event.date,
          time: event.time,
          location: event.location,
          capacity: String(event.capacity),
          description: event.description
        }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default EditEventPage;