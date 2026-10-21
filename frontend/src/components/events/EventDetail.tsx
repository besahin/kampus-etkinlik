import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
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
      <h2>Açıklama</h2>
      <p>{event.description}</p>
      <div className="buton-grup">
        <button type="button" className="ikincil" onClick={onBack}>
          &larr; Listeye dön
        </button>
        <button type="button" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </article>
  );
}

export default EventDetail;