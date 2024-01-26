class Api {
    constructor({url}) {
        this._url = url;
    }

    _getResponse(response) {
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    getProfileInformation() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(this._getResponse)
    }

    getAllCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

    changeProfileInformation(data) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        })
        .then(this._getResponse)
    }

    addNewCard(card) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(this._getResponse)
    }

    changeAvatar(avatar) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        body: JSON.stringify(avatar)
        })
        .then(this._getResponse)
    }

    deleteCard(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

    like(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

    unlike(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }


    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.like(id);
        } else {
            return this.unlike(id);
        }
    }

}

/* Создание экземпляров Api */
const api = new Api({
    url: 'https://api.ddkaao.students.nomoredomainsmonster.ru',
});

export default api;