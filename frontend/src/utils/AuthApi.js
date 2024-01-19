class AuthApi {
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

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        })
        .then(this._getResponse);
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        })
        .then(this._getResponse);
    }

    getToken(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
        .then(this._getResponse);
    }
}

const auth = new AuthApi({
    url: 'https://auth.nomoreparties.co',
});

export default auth;