class MoviesApi {
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

  getMovies() {
    return this._request('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export const moviesApi = new MoviesApi();