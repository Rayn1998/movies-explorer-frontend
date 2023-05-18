class MainApi {
  constructor(url) {
    this.url = url;
  }
  // Promise.reject(`Error: ${res}`)
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => console.log(res));
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
}

// http://api.bodolanov.diploma.nomoredomains.monster
// http://localhost:3001

export const mainApi = new MainApi('http://localhost:3001');
