import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { categories, events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents
} from "./utils/filter-events";
import { formatDate } from "./utils/format-date";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const pageTitles: Record<PageName, string> = {
  home: "Ana Sayfa",
  events: "Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle"
};

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

  const headerTitle = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected?.title ?? "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle"
  }[page];

  const headerText =
    page === "home"
      ? "Kampüsümüzde düzenlenen etkinlikleri takip edin, detaylarını inceleyin ve yeni etkinlik ekleyin."
      : page === "detail" && selected
        ? `${selected.category} · ${formatDate(selected.date)}`
        : undefined;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${
      page === "detail" ? headerTitle : pageTitles[page]
    }`;
  }, [page, headerTitle]);

  return (
    <>
      <div className="site-ust">
        <Header title={headerTitle} text={headerText} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main key={page}>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
              limited
            />
            <p>
              <button type="button" onClick={() => go("events")}>
                Tüm etkinlikleri gör &rarr;
              </button>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && !selected && (
          <>
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            onSubmit={() => window.scrollTo(0, 0)}
            submitLabel={page === "add" ? "Kaydet" : "Güncelle"}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;