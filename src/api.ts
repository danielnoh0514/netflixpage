export const API_KEY = "d20eea6a9e7e472eef44a70d5027d38d";
export const BASE_URL = "https://api.themoviedb.org/";

export interface IResults {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface IMovies {
  page: number;
  results: IResults[];
}

export interface IResultsTv {
  backdrop_path: string;
  poster_path: string;
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  origin_country: string;
  vote_average: number;
}

export interface ITv {
  page: number;
  results: IResultsTv[];
}

const rand = Math.round(Math.random() * 20) + 1;
export const randTv = Math.round(Math.random() * 5) + 1;

export function getMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${rand}
    `
  ).then((response) => response.json());
}

export function getLastestMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${rand}`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${rand}`
  ).then((response) => response.json());
}

export function getLatestTv() {
  return fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${randTv}`
  ).then((response) => response.json());
}

export function getAiringTv() {
  return fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${randTv}`
  ).then((response) => response.json());
}

export function getPopularTv() {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${randTv}`
  ).then((response) => response.json());
}

export function getTopRatedTv() {
  return fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&page=${randTv}`
  ).then((response) => response.json());
}
