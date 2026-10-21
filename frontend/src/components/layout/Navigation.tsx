import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menu: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      {menu.map((item) => {
        const active =
          current === item.name || (current === "detail" && item.name === "events");
        return (
          <a
            key={item.name}
            href="#"
            aria-current={active ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.name);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export default Navigation;