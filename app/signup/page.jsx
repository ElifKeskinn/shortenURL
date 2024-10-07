import { signUp } from "@/actions/auth";

export default function SignUpPage() {
  return (
    <div>
      <form>
        <input type="text" name="firstName" placeholder="Adınız" required />
        <input type="text" name="lastName" placeholder="Soyadınız" required />
        <input type="email" name="email" placeholder="E-posta Adresiniz" required />
        <input type="password" name="password" placeholder="Şifreniz" required />
        <button formAction={signUp}>Kayıt Ol</button>
      </form>
    </div>
  );
}
