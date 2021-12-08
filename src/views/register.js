import { register } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";


const loginTemplate = (onRegister) => html`
<section @submit=${onRegister} id="registerPage">
    <form>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;


export function displayRegisterPage(ctx) {
    ctx.render(loginTemplate(onRegister))

    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('conf-pass')

        try {
            if (email == '' || password == '' || repass == '') {
                throw new Error('All fields are required')
            }
            if (password != repass) {
                throw new Error('Passwords do not match!')
            }

            await register(email, password);
            ctx.page.redirect('/');
            ctx.updateUserNav();

        } catch (err) {
            notify(err.message)
        }
    }
}
