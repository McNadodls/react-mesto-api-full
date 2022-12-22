class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  } 

  enterError (err) {
    Promise.reject(`Ошибка: ${err.status}`);
  }

  singnup(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json" 
      },
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(res => this._checkResponse(res))
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json" 
      },
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(res => this._checkResponse(res))
  }

  getCurentUser () {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(res => this._checkResponse(res))
  }

  logout () {
		return fetch(`${this._baseUrl}/logout`, {
			method: 'GET',
			headers: {
				"Content-Type": "application.json"
			},
			credentials: "include",
		})
			.then(res => this._checkResponse(res))
			.then(res => res);
	}
}
export default new Auth('https://mcnad.students.nomoredomains.club'); 