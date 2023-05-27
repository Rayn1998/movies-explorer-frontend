class MainApi {
  constructor(url) {
    this.url = url;
  }
  // Promise.reject(`Error: ${res}`)
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => res);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponse);
  }

  register(data) {
    return this._request(
      `${this.url}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  }

  login(data) {
    return this._request(
      `${this.url}/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  }

  checkToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      return this._request(
        `${this.url}/users/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } else {
      return Promise.reject(`Error: You are unauthorized`);
    }
  }

  updateUser(data) {
    const jwt = localStorage.getItem('token');
    return this._request(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
  }

  getMovies() {
    const jwt = localStorage.getItem('token');
    return this._request(`${this.url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
  }

  addFavourite(data) {
    const jwt = localStorage.getItem('token');
    return this._request(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
  }

  removeFavourite(id) {
    const jwt = localStorage.getItem('token');
    return this._request(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
  }
}

// http://api.bodolanov.diploma.nomoredomains.monster
// http://localhost:3001
export const mainApi = new MainApi('http://localhost:3001');
// export const mainApi = new MainApi('http://192.168.0.201:3001');
