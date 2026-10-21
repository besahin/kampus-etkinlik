import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange
}: EventFilterProps) {
  return (
    <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
      <p>
        <label htmlFor="arama">Ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Etkinlik adı, yer veya açıklama"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
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
  );
}

export default EventFilter;