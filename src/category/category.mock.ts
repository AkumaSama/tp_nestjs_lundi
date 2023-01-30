import { IS_STRING, IS_UUID, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { Film } from '../film/film.mock';

export class CategoryDto {
  @IsUUID()
  id: string;
  @IsString()
  name: string;

  @IsString({ each: true })
  films: string[];
}

export class Category {
  private _id: string = v4();
  private _name: string;
  private _films: string[];

  constructor(name: string, films: string[] = []) {
    this._name = name;
    this._films = films;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get films() {
    return this._films;
  }

  set films(films: string[]) {
    this._films = films;
  }

  addFilm(film: Film) {
    this._films.push(film.id);
  }

  removeFilm(film: Film) {
    const index = this._films.indexOf(film.id);
    if (index < 0) return;
    this._films.splice(index, 1);
  }
}

export const CATEGORYS = [
  new Category('Action'),
  new Category('Nanar'),
  new Category('Comédie'),
];
