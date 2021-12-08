import { getAllAlbums } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";


const catalogTemplate = (albums, logged) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length == 0 
        ? html`<p>No Albums in Catalog!</p>` 
        : null}
    ${logged == null ? html`${albums.map(albumTemplateGuest)}` : html `${albums.map(albumTemplateUser)}`}

    
</section>`;


const albumTemplateUser = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>
    </div>
</div>`;


const albumTemplateGuest = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
    </div>
</div>`;


export async function displayCatalogPage(ctx) {
    const userData = getUserData();
    const albums = await getAllAlbums();

    ctx.render(catalogTemplate(albums, userData));
}