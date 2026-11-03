import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../utils/use-page-title";

function ForgotPasswordPage() {
  usePageTitle("Şifremi Unuttum");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>
        Kayıtlı e-posta adresini yaz, şifreni sıfırlaman için bir bağlantı
        gönderelim.
      </p>
      <form noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </p>
        <p>
          <button type="submit">Bağlantı gönder</button>
        </p>
      </form>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <p>
        <Link to="/login">&larr; Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;