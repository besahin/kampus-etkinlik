import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import { usePageTitle } from "../utils/use-page-title";

function EventsPage() {
  usePageTitle("Etkinlikler");
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
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
        emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
      />
    </>
  );
}

export default EventsPage;