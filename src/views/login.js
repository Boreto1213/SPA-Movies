import { login } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";


const loginTemplate = (onLogin) => html`
<section @submit=${onLogin} id="loginPage">
    <form>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;


export function displayLoginPage(ctx) {
    ctx.render(loginTemplate(onLogin))

    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        

        try {
            if (email == '' || password == '') {
                throw new Error('All fields are required')
            }

            await login(email, password);
            ctx.page.redirect('/');
            ctx.updateUserNav();
        } catch (err) {
            notify(err.message)
        }
    }
}
