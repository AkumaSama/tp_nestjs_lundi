import { v4 } from 'uuid';
import { IsString, ValidateNested } from 'class-validator';

export class FilmDto {
  @IsString()
  id: string;
  @IsString()
  titre: string;
  @IsString({ each: true })
  categories: string[];
  @IsString({ each: true })
  actors: string[];
}
export class Film {
  private _id: string = v4();
  private _titre: string;
  private _categories: string[];
  private _actors: string[];

  constructor(titre: string, categories: string[] = [], actors: string[] = []) {
    this._titre = titre;
    this._categories = categories;
    this._actors = actors;
  }

  get id() {
    return this._id;
  }

  get titre(): string {
    return this._titre;
  }

  set titre(value: string) {
    this._titre = value;
  }

  get categories() {
    return this._categories;
  }

  set categories(categories: string[]) {
    this._categories = categories;
  }

  public addCategorie(category: string) {
    this._categories.push(category);
  }

  public removeCategory(category: string) {
    const index = this._categories.indexOf(category);
    if (index < 0) return;
    this._categories.splice(index, 1);
  }

  get actors() {
    return this._actors;
  }
  set actors(actors: string[]) {
    this._actors = actors;
  }

  public addActors(actor: string) {
    this._actors.push(actor);
  }

  public removeActors(actor: string) {
    const index = this._actors.indexOf(actor);
    if (index < 0) return;
    this._actors.splice(index, 1);
  }
}

export const FILMS = [
  new Film('Truc de fou'),
  new Film("V'la le truc"),
  new Film('Un bon début'),
];
