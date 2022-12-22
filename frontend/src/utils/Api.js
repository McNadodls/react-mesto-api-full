class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return this.enterError(res);
  }
  enterError (err) {
    Promise.reject(`Ошибка: ${err.status}`);
  }
  
  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  } 

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  changeProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
       if (res.ok) {
         return res.json();
       }
       return this.enterError(res);
    })
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);
  }

  handleAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          return true;
        }
        return this.enterError(res);
      })
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
     .then(this._checkResponse);
  }
  getInitialInfo() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }
}
export default new Api('https://mcnad.students.nomoredomains.club'); 