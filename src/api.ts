export const API_KEY = "d20eea6a9e7e472eef44a70d5027d38d";
export const BASE_URL = "https://api.themoviedb.org/";

export interface IResults {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IResults[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_URL}3/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLastestMovies() {
  return fetch(
    "https://api.themoviedb.org/3/movie/latest?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US"
  ).then((response) => response.json());
}
