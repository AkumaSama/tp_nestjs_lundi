import { Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORYS, Category, CategoryDto } from './category.mock';
import { FilmService } from '../film/film.service';
import { Acteur } from '../acteur/acteur.mock';
import { Film } from '../film/film.mock';

@Injectable()
export class CategoryService {
  constructor(private filmService: FilmService) {}
  getAllCategory() {
    return CATEGORYS;
  }

  getOneCategory(id: string) {
    const category = CATEGORYS.find((category: Category) => category.id == id);

    if (category == undefined) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  createNewCategory(body: CategoryDto) {
    const category = new Category(body.name);
    CATEGORYS.push(category);
    return category;
  }

  UpdateOneCategory(id: string, body: CategoryDto) {
    const category = this.getOneCategory(id);

    category.films.forEach((f) => {
      this.filmService.getOneFilm(f).removeCategory(category.id);
    });

    category.name = body.name;
    category.films = this.filmService.parseFilmById(body.films);

    category.films.forEach((f) => {
      this.filmService.getOneFilm(f).addCategorie(category.id);
    });

    return category;
  }

  deleteCategory(id: string) {
    const category = this.getOneCategory(id);

    category.films.forEach((f) => {
      this.filmService.getOneFilm(f).removeCategory(category.id);
    });

    const index = CATEGORYS.indexOf(category);

    CATEGORYS.splice(index, 1);
  }

  parseCategories(categoriesId: string[]) {
    const categories = [];
    for (const categoryId of categoriesId) {
      categories.push(this.getOneCategory(categoryId));
    }
    return categories;
  }

  addFilmToCategorie(categoryId: string, filmId: string): Category {
    const category: Category = this.getOneCategory(categoryId);
    const film: Film = this.filmService.getOneFilm(filmId);

    category.addFilm(film);
    film.addActors(category.id);

    return category;
  }

  removeFilmToCategorie(categoryId: string, filmId: string): Category {
    const category: Category = this.getOneCategory(categoryId);
    const film: Film = this.filmService.getOneFilm(filmId);

    if (!category.films.includes(film.id))
      throw new NotFoundException(
        `La category ${categoryId} n'as pas le film ${filmId}`,
      );

    category.removeFilm(film);
    film.removeActors(category.id);

    return category;
  }
}
