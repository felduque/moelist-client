enum Role {
  AUTHOR = "Author",
  USER = "User",
}

export type filtersResponseType = {
  count: number;
  result: ContentType[];
};

export type FiltersType = Partial<{
  type: string;
  demography: string;
  status: string;
  genres: string[];
}>;

export type User = {
  id: number;
  email: string;
  userName: string;
  avatar?: string;
  role: string;
  binanceId?: number;
  paypal?: string;
  twitter?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateUserParams = {
  userName?: string;
  avatar?: string | File;
  binanceId?: number;
  paypal?: string;
  twitter?: string;
};

export type GetUserResponseType = {
  user: User;
  favorites: ContentType[];
};

export type LoginResp = {
  token: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type GetAnimeByIdResponse = {};

export type ContentType = {
  id: number;
  title: string;
  contentType: string;
  demography: string;
  artist?: string | string[];
  artists?: string[];
  genres?: string[];
  description: string;
  image: string;
  producers?: string[];
  rating?: number;
  score?: number;
  type?: string;
  studios?: string[];
  urlContent?: string;
  source?: string;
  status?: string;
  premiered?: string;
  season?: string;
  popularity?: number;
  User?: User;
  Scan?: Scan;
  day?: string;
  trailer?: string;
  authors?: string[];
  author?: string | string[];
  duration?: string;
  favorites?: number;
  episodes?: number;
  volumes?: number;
  chapters?: number;
};

export type ValidatePublicationType = Partial<{
  titulo: string;
  demografia: string;
  artist: string;
  artists: string;
  genres: string;
  sinopsis: string;
  image: string;
  tipo: string;
  estudio: string;
  artista: string;
  urlContent: string;
  source: string;
  estado: string;
  estreno: string;
  temporada: string;
  scans: string;
  day: string;
  trailer: string;
  autor: string | string[];
  duracion: string;
  capitulos: string;
  volumenes: string;
  generos: string;
  producers: string;
}>;

export type CreatePublicationParams = Partial<{
  title: string;
  demography: string;
  artist: string | string[];
  genres: string[];
  description: string;
  image: File | string;
  producers: string[];
  type: string;
  studios: string[];
  urlContent: string;
  source: string;
  status: string;
  premiered: Date | null;
  season: string;
  scanId: number;
  authorId: number;
  scans: number;
  day: string;
  trailer: string;
  author: string | string[];
  duration: string;
  chapters: number;
  volumes: number;
  episodes: number;
}>;

export type Scan = {
  id: number;
  name: string;
  url: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginParams = {
  email?: string;
  password?: string;
};

export type RegisterParams = Partial<{
  email: string;
  password: string;
  userName: string;
  passwordConfirm: string;
}>;
