import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  limited?: boolean;
}

function EventList({
  events,
  emptyText = "Gösterilecek etkinlik yok.",
  limited
}: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="sonuc" aria-live="polite">
        {emptyText}
      </p>
    );
  }

  return (
    <section className="etkinlik-listesi" data-limit={limited ? "2" : undefined}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;