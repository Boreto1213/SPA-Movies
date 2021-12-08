import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function createAlbum(meme) {
    return api.post('http://localhost:3030/data/albums', meme)
};

export async function editAlbum(id, meme) {
    return api.put('http://localhost:3030/data/albums/' + id, meme)
}

export async function getAllAlbums() {
    return api.get('http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name')
};

export async function getById(id) {
    return api.get('http://localhost:3030/data/albums/' + id)
};

export async function deleteAlbum(id) {
    return api.del('http://localhost:3030/data/albums/' + id)
};

export async function getMyAlbums(userId) {
    return api.get(`http://localhost:3030/data/albums?where=_ownerId%3D%22${userId}%22`);
};

export async function searchAlbum(query) {
    return api.get('http://localhost:3030/data/albums?where=' + encodeURIComponent(`name LIKE "${query}"`));
}