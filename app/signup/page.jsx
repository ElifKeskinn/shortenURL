import { signUp } from "@/actions/auth";

export default function SignUPPage(){
    return(
        <div>
            <form action={signUp}>
                <input type="text" name="firstName" placeholder="Adınız" />
                <input type="text" name="lastName" placeholder="Soyadınız" />
                <input type="email" name="email" placeholder="E-posta Adresiniz" />
                <input type="password" name="password" placeholder="Şifreniz" />
                <button>Kayıt Ol</button>
            </form>
        </div>
    )
}