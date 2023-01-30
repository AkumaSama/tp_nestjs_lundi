import { v4 } from 'uuid';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Film } from '../film/film.mock';

export class Acteur {
  private _id: string = v4();
  private _prenom: string;
  private _nom: string;
  private _films: string[];

  constructor(prenom: string, nom: string, films: string[] = []) {
    this._prenom = prenom;
    this._nom = nom;
    this._films = films;
  }

  get id() {
    return this._id;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }
  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get films() {
    return this._films;
  }

  set films(films: string[]) {
    this._films = films;
  }

  public addFilm(film: Film) {
    this._films.push(film.id);
  }

  public removeFilm(film: Film) {
    const index = this._films.indexOf(film.id);
    if (index < 0) return;
    this._films.splice(index, 1);
  }
}

export class ActeurDTO {
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString({ each: true })
  films: string[];
}

export const ACTEURS = [
  new Acteur('Michel', 'Defou'),
  new Acteur('Patrick', 'Poutou'),
  new Acteur('Joceline', 'Lafille'),
];
