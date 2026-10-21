import { categories } from "../../data/events";

interface EventFormProps {
  onSubmit: () => void;
  submitLabel?: string;
}

function EventForm({ onSubmit, submitLabel = "Kaydet" }: EventFormProps) {
  return (
    <>
      <p className="not">Bu sprintte form sadece görünür; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            type="text"
            id="title"
            maxLength={80}
            placeholder="Örn. Kariyer Günleri 2026"
          />
        </p>
        <p>
          <label htmlFor="category">Kategori</label>
          <select id="category" defaultValue="">
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" />
        </p>
        <p>
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" />
        </p>
        <p>
          <label htmlFor="location">Yer</label>
          <input
            type="text"
            id="location"
            placeholder="Örn. A Blok Konferans Salonu"
          />
        </p>
        <p>
          <label htmlFor="capacity">Kontenjan</label>
          <input type="number" id="capacity" min={1} max={1000} />
        </p>
        <p>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={5} />
        </p>
        <p>
          <button type="submit">{submitLabel}</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;