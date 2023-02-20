import { atom } from "recoil";

export function imagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : `original`}/${id}`;
}

export const latest = atom<number>({
  key: "latest",
  default: 0,
});
