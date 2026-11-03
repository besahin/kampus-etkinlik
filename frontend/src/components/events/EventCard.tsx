import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
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
        <Link className="buton" to={`/events/${event.id}`}>
          Detayları gör
        </Link>
      </p>
    </article>
  );
}

export default EventCard;