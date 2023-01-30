import { Injectable, NotFoundException } from '@nestjs/common';
import { Film, FilmDto, FILMS } from './film.mock';
import { CategoryService } from '../category/category.service';
import { ActeurService } from '../acteur/acteur.service';
import { Category } from '../category/category.mock';
import { Acteur } from '../acteur/acteur.mock';

@Injectable()
export class FilmService {
  constructor(
    private categoryService: CategoryService,
    private acteurService: ActeurService,
  ) {}

  getOneFilm(filmId: string): Film {
    const film: Film = FILMS.find((f) => f.id == filmId);

    if (film == undefined)
      throw new NotFoundException(`Film ${filmId} not found`);

    return film;
  }

  parseFilmById(filmsId: string[]): string[] {
    const films: string[] = [];

    filmsId.forEach((f) => {
      films.push(this.getOneFilm(f).id);
    });

    return films;
  }

  createFilm(body: FilmDto) {
    const film = new Film(
      body.titre,
      this.categoryService.parseCategories(body.categories),
      this.acteurService.parseActeurs(body.actors),
    );

    film.categories.forEach((cat) => {
      this.categoryService.getOneCategory(cat).addFilm(film);
    });

    film.actors.forEach((act) => {
      this.acteurService.getOneActeur(act).addFilm(film);
    });

    FILMS.push(film);
    return film;
  }

  updateFilm(filmId: string, body: FilmDto) {
    const film = this.getOneFilm(filmId);

    film.actors.forEach((act) => {
      this.acteurService.getOneActeur(act).removeFilm(film);
    });

    film.titre = body.titre;
    film.categories = body.categories;
    film.actors = this.acteurService.parseActeurs(body.actors);

    film.actors.forEach((act) => {
      this.acteurService.getOneActeur(act).addFilm(film);
    });

    return film;
  }

  deleteFilm(filmId: string) {
    const film = this.getOneFilm(filmId);

    film.actors.forEach((act) => {
      this.acteurService.getOneActeur(act).removeFilm(film);
    });

    const index = FILMS.indexOf(film);

    FILMS.splice(index, 1);
  }

  addCategoryToFilm(categoryId: string, filmId: string): Film {
    const categori: Category = this.categoryService.getOneCategory(categoryId);
    const film: Film = this.getOneFilm(filmId);

    film.addCategorie(categoryId);
    categori.addFilm(film);

    return film;
  }

  removeCategoryToFilm(filmId: string, categoryId: string): Film {
    const categorie: Category = this.categoryService.getOneCategory(categoryId);
    const film: Film = this.getOneFilm(filmId);

    if (film.categories.includes(categorie.id))
      throw new NotFoundException(
        `Lle film ${filmId} n'as pas la categorie ${categoryId}`,
      );

    categorie.removeFilm(film);
    film.removeActors(categorie.id);

    return film;
  }

  addActeurToFilm(acteurId: string, filmId: string): Film {
    const actor: Acteur = this.acteurService.getOneActeur(acteurId);
    const film: Film = this.getOneFilm(filmId);

    actor.addFilm(film);
    film.addActors(actor.id);

    return film;
  }

  removeActeurToFilm(acteurId: string, filmId: string): Film {
    const actor: Acteur = this.acteurService.getOneActeur(acteurId);
    const film: Film = this.getOneFilm(filmId);

    if (!film.actors.includes(film.id))
      throw new NotFoundException(
        `Le film ${filmId} n'as pas l'acteur ${acteurId}`,
      );

    actor.removeFilm(film);
    film.removeActors(actor.id);

    return film;
  }
}
