import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import { usePageTitle } from "../utils/use-page-title";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: ""
};

function AddEventPage() {
  usePageTitle("Yeni Etkinlik");
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="bolum-baslik">Yeni Etkinlik</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default AddEventPage;