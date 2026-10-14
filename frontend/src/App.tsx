import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const pageTitles: Record<PageName, string> = {
  home: "Ana Sayfa",
  events: "Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle"
};

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" }
];

const categories: Category[] = [...new Set(events.map((e) => e.category))];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const title =
    page === "detail"
      ? (selected?.title ?? "Etkinlik bulunamadı")
      : pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-karti" key={event.id}>
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
          <button type="button" onClick={() => go("detail", event.id)}>
            Detayları gör
          </button>
        </p>
      </article>
    );
  }

  return (
    <>
      <header>
        <p>Kampüs Etkinlikleri</p>
        <nav>
          {menu.map((item) => {
            const active =
              page === item.page || (page === "detail" && item.page === "events");
            return (
              <a
                key={item.page}
                href="#"
                aria-current={active ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

            <main key={page}>
        {page === "home" && (
          <>
            <h1>Kampüs Etkinlikleri</h1>
            <p>
              Kampüsümüzde düzenlenen etkinlikleri bu site üzerinden takip
              edebilir, etkinlik detaylarını inceleyebilir ve yeni bir etkinlik
              ekleyebilirsiniz.
            </p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi" data-limit="2">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <button type="button" onClick={() => go("events")}>
                Tüm etkinlikleri gör &rarr;
              </button>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <h1>Tüm Etkinlikler</h1>
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="arama">Ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Etkinlik adı, yer veya açıklama"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </form>
            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <h1>Etkinlik bulunamadı</h1>
            <p className="hata-kutusu">
              Aradığınız etkinlik mevcut değil veya seçilmedi.
            </p>
            <p>
              <button type="button" onClick={() => go("events")}>
                &larr; Listeye dön
              </button>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article>
            <h1>{selected.title}</h1>
            <div className="detay-icerik">
              {selected.image && (
                <figure>
                  <img
                    src={selected.image}
                    alt={`${selected.title} etkinlik afişi`}
                  />
                  <figcaption>Şekil: {selected.title} afişi</figcaption>
                </figure>
              )}
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </div>
            <h2>Açıklama</h2>
            <p>{selected.description}</p>
            <div className="buton-grup">
              <button
                type="button"
                className="ikincil"
                onClick={() => go("events")}
              >
                &larr; Listeye dön
              </button>
              <button type="button" onClick={() => go("update", selected.id)}>
                Bu etkinliği güncelle
              </button>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <h1>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h1>
            <p className="not">
              Bu sprintte form sadece görünür; kayıt yapılmaz.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button type="submit">
                  {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
              </p>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Berat Efe Şahin &middot; 2416501054 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;