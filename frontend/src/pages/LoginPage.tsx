import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../utils/use-page-title";

function LoginPage() {
  usePageTitle("Giriş");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      <h2 className="bolum-baslik">Giriş</h2>
      <form noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </p>
        <p>
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && (
            <span className="hata-metni">{errors.password}</span>
          )}
        </p>
        <p>
          <button type="submit">Giriş yap</button>
        </p>
      </form>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bilgiler geçerli. Gerçek giriş Sprint 10'da eklenecek.
        </p>
      )}

      <p>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        {" · "}
        <Link to="/register">Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;