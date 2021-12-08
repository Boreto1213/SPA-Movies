import { searchAlbum } from "../api/data.js";
import { html } from "../lib.js";



const searchTemplate = (albums, onSearch, params = '') => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <form @submit=${onSearch}>
        <div class="search">
            <input id="search-input" type="text" name="search" .value=${params}>
            <button type="submit" class="button-list">Search</button>
        </div>
    </form>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">

            ${albums.length == 0? html`<p class="no-result">No result.</p>` : html`${albums.map(albumTemplate)}`}

    </div>
</section>`;


const albumTemplate = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>
    </div>
</div>`;


export async function displaySearchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await searchAlbum(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(albums, onSearch, params));

    function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get('search');

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));

        }
    }


}