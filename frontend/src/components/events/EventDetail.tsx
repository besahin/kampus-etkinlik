import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article>
      <div className="detay-icerik">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} etkinlik afişi`} />
            <figcaption>Şekil: {event.title} afişi</figcaption>
          </figure>
        )}
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
      <h3>Açıklama</h3>
      <p>{event.description}</p>
      <div className="buton-grup">
        <Link className="buton ikincil" to="/events">
          &larr; Listeye dön
        </Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>
          Bu etkinliği güncelle
        </Link>
      </div>
    </article>
  );
}

export default EventDetail;