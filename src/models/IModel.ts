export interface IAction {
  type: string;
  payload: any;
}

export interface IMovie {
  id: number;
  genres?: {
    id: number;
    name: string;
  }[];
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  overview: string;
  release_date: string | number | Date;
  title: string;
  vote_average: number;
  vote_count: string | number;
  original_language: string;
}

export interface ICategory {
  key: number;
  title: string;
}
