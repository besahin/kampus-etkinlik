import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);
}