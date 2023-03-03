export class Api {
    constructor(config) {
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
    }
    
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  
    setUserInfo(obj) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: obj.name,
          about: obj.info
        })
      })
      .then(res => this._checkResponse(res));
    }
    
    addNewCard(cardElement) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardElement.name,
          link: cardElement.link
        })
      })
      .then(res => this._checkResponse(res));
    }
    
    putLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  
    changeAvatar(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar : avatarLink
        })
      })
      .then(res => this._checkResponse(res));
    }
  
  }
  