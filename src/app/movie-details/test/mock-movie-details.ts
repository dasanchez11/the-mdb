export const mockMovieDetails: IMovieDetails = {
  adult: false,
  backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
  belongs_to_collection: {
    id: 529892,
    name: 'Black Panther Collection',
    poster_path: '/uVnN6KnfDuHiC8rsVsSc7kk0WRD.jpg',
    backdrop_path: '/yzVxUMYGKjK3GgmVI2BhmbuL9UY.jpg',
  },
  budget: 250000000,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
  ],
  homepage: 'https://wakandaforevertickets.com',
  id: 505642,
  imdb_id: 'tt9114286',
  original_language: 'en',
  original_title: 'Black Panther: Wakanda Forever',
  overview:
    'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
  popularity: 3492.065,
  poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  production_companies: [
    {
      id: 420,
      logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
      name: 'Marvel Studios',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2022-11-09',
  revenue: 400412568,
  runtime: 162,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
    {
      english_name: 'French',
      iso_639_1: 'fr',
      name: 'Français',
    },
    {
      english_name: 'Haitian; Haitian Creole',
      iso_639_1: 'ht',
      name: '',
    },
    {
      english_name: 'Spanish',
      iso_639_1: 'es',
      name: 'Español',
    },
    {
      english_name: 'Xhosa',
      iso_639_1: 'xh',
      name: '',
    },
  ],
  status: 'Released',
  tagline: 'Forever.',
  title: 'Black Panther: Wakanda Forever',
  video: false,
  vote_average: 7.511,
  vote_count: 724,
};

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
