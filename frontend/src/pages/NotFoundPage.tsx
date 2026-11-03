import { Link } from "react-router-dom";
import { usePageTitle } from "../utils/use-page-title";

function NotFoundPage() {
  usePageTitle("Sayfa bulunamadı");

  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p className="hata-kutusu">Aradığınız adres mevcut değil.</p>
      <p>
        <Link className="buton" to="/">
          Ana Sayfaya dön
        </Link>
      </p>
    </>
  );
}

export default NotFoundPage;