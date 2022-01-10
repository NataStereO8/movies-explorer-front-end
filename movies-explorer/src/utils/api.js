class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getHeaders() {
        const token = localStorage.getItem("token");
        if (token)
            this.headers['Authorization'] = `Bearer ${token}`;

        return this.headers;
    }

    getReply(result) {
        if (!result.ok) {
            return Promise.reject('Server error');
        }
        return result.json();
    }

    getPersonalInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.getHeaders()
        }).then(this.getReply)
    } //!!!!

    getInitialCards(){
        return fetch(`${this.url}/movies`, {
            headers: this.getHeaders()
        }).then(this.getReply)
    } //!!!!

    createCard({name, link}) {
        return fetch(`${this.url}/movies`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({name, link})
        }).then(this.getReply)
    }

    deleteCard({name, id}) {
        return fetch(`${this.url}/movies/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
            body: JSON.stringify({name})
        }).then(this.getReply)
    }

    setPersonalInfo({name, about}) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify({name, about})
        }).then(this.getReply)
    }


    checkLikes(cardId, like) {
        return fetch(`${this.url}/movies/likes/${cardId}`, {
            method: like ? "PUT" : "DELETE",
            headers: this.getHeaders()
        })
            .then(this.getReply)
    }
}

const config = {
    url: "https://api.cinemaholic.nomoredomains.work",
    headers: {"Content-Type" : "application/json"}
    // authorization: 'd4a20ab5-6a24-4061-8e1d-6f5e8bc9d229'
};

const api = new Api(config);

export default api;