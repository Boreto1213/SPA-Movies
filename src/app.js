import { logout } from './api/data.js';
import { page,render } from './lib.js';
import { getUserData } from './utils.js';
import { displayCatalogPage } from './views/catalog.js';
import { displayCreatePage } from './views/create.js';
import { displayDetailsPage } from './views/details.js';
import { displayEditPage } from './views/edit.js';
import { displayHomePage } from './views/home.js';
import { displayLoginPage } from './views/login.js';
import { displayRegisterPage } from './views/register.js';
import { displaySearchPage } from './views/search.js';


const root = document.querySelector('main');
document.querySelector('#logout').addEventListener('click', onLogout)
updateUserNav()


page(decorateContext)
page('/', displayHomePage)
page('/login', displayLoginPage)
page('/register', displayRegisterPage)
page('/catalog', displayCatalogPage)
page('/create', displayCreatePage)
page('/details/:id', displayDetailsPage)
page('/edit/:id', displayEditPage)
page('/search', displaySearchPage)
page.start()



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

async function onLogout(e){
    e.preventDefault();
    await logout();
    page.redirect('/');
    updateUserNav()
}

function updateUserNav() {
    const userData = getUserData();
    const guest = [...document.querySelectorAll('.guest')];
    const user = [...document.querySelectorAll('.user')];
    if (userData){
        guest.map(x => x.style.display = 'none');
        user.map(x => x.style.display = 'inline-block');
    } else {
        guest.map(x => x.style.display = 'inline-block');
        user.map(x => x.style.display = 'none');
    }
}