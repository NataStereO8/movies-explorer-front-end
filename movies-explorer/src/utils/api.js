class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getReply(result) {

        if (!result.ok) {
            return Promise.reject('Server error');
        }
        return result.json();
    }


    getPersonalInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        }).then(this.getReply)
    }
    getInitialCards(){
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        }).then(this.getReply)
    }

    createCard({name, link}) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name, link})
        }).then(this.getReply)
    }

    deleteCard({name, id}) {
        return fetch(`${this.url}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({name})
        }).then(this.getReply)
    }

    setPersonalInfo({name, about}) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({name, about})
        }).then(this.getReply)
    }

    setAvatarInfo(link){
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(link)
        }).then(this.getReply)
    }

    checkLikes(cardId, like) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: like ? "PUT" : "DELETE",
            headers: this.headers
        })
            .then(this.getReply)
    }
}

const config = {
    url: "https://mesto.nomoreparties.co/v1/cohort-17",
    headers: {"Content-Type" : "application/json",
    authorization: 'd4a20ab5-6a24-4061-8e1d-6f5e8bc9d229'}
};

const api = new Api(config);

export default api;