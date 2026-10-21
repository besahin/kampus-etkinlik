import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="etkinlik-karti">
      <h3>{event.title}</h3>
      <p>
        <span className="rozet">{event.category}</span>
      </p>
      <p>
        Tarih: <time dateTime={event.date}>{formatDate(event.date)}</time>,{" "}
        {event.time}
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <p>
        <button type="button" onClick={() => onShowDetail(event.id)}>
          Detayları gör
        </button>
      </p>
    </article>
  );
}

export default EventCard;