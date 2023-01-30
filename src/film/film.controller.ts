import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Film, FilmDto, FILMS } from './film.mock';
import { FilmService } from './film.service';
import { Category } from '../category/category.mock';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get()
  getallFilms() {
    return FILMS;
  }

  @Get('id')
  getOneFilm(@Param('id') filmId: string) {
    return this.filmService.getOneFilm(filmId);
  }

  @Post()
  createFilm(@Body() body: FilmDto) {
    return this.filmService.createFilm(body);
  }

  @Put('/:id')
  updateFilm(@Param('id') filmId: string, @Body() body: FilmDto) {
    return this.filmService.updateFilm(filmId, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteFilm(@Param('/:id') filmId: string) {
    this.filmService.deleteFilm(filmId);
  }

  @Put(':uuid/addcategory/:categoryId')
  addCategoryToFilm(
    @Param('uuid') filmId: string,
    @Param('categoryId') categoryId: string,
  ): Film {
    return this.filmService.addCategoryToFilm(filmId, categoryId);
  }

  @Put(':uuid/delcategory/:categoryId')
  removeCategoryToFilm(
    @Param('uuid') filmId: string,
    @Param('categoryId') categoryId: string,
  ): Film {
    return this.filmService.removeCategoryToFilm(filmId, categoryId);
  }

  @Put(':uuid/addacteur/:acteurId')
  addActeurToFilm(
    @Param('uuid') filmId: string,
    @Param('acteurId') acteurId: string,
  ): Film {
    return this.filmService.addActeurToFilm(filmId, acteurId);
  }

  @Put(':uuid/delacteur/:acteurId')
  removeActeurToFilm(
    @Param('uuid') filmId: string,
    @Param('acteurId') acteurId: string,
  ): Film {
    return this.filmService.removeActeurToFilm(filmId, acteurId);
  }
}
