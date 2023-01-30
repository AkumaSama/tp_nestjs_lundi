import { Injectable, NotFoundException } from '@nestjs/common';
import { Acteur, ActeurDTO, ACTEURS } from './acteur.mock';
import { FilmService } from '../film/film.service';
import { Film } from '../film/film.mock';

@Injectable()
export class ActeurService {
  constructor(private filmService: FilmService) {}
  getActeurs(): Acteur[] {
    return ACTEURS;
  }

  getOneActeur(acteurId: string): Acteur {
    const actor = ACTEURS.find((actor) => actor.id == acteurId);

    if (actor == undefined)
      throw new NotFoundException(`Acteur ${acteurId} not found`);

    return actor;
  }

  parseActeurs(acteurs: string[]): string[] {
    const acteurList: string[] = [];

    acteurs.forEach((act) => {
      acteurList.push(this.getOneActeur(act).id);
    });

    return acteurList;
  }

  addActeur(acteurData: ActeurDTO): Acteur {
    const actor = new Acteur(
      acteurData.prenom,
      acteurData.nom,
      this.filmService.parseFilmById(acteurData.films),
    );

    actor.films.forEach((f) => {
      this.filmService.getOneFilm(f).addActors(actor.id);
    });

    ACTEURS.push(actor);

    return actor;
  }

  modifyActeur(acteurId: string, acteurData: ActeurDTO): Acteur {
    const actor = this.getOneActeur(acteurId);

    actor.films.forEach((f) => {
      this.filmService.getOneFilm(f).removeActors(actor.id);
    });

    actor.nom = acteurData.nom;
    actor.prenom = acteurData.prenom;
    actor.films = this.filmService.parseFilmById(acteurData.films);

    actor.films.forEach((f) => {
      this.filmService.getOneFilm(f).addActors(actor.id);
    });

    return actor;
  }

  deleteActeur(acteurId: string) {
    const actor = this.getOneActeur(acteurId);

    actor.films.forEach((f) => {
      this.filmService.getOneFilm(f).removeActors(actor.id);
    });

    const index = ACTEURS.indexOf(actor);
    ACTEURS.splice(index, 1);
  }

  addFilmToActeur(acteurId: string, filmId: string): Acteur {
    const actor: Acteur = this.getOneActeur(acteurId);
    const film: Film = this.filmService.getOneFilm(filmId);

    actor.addFilm(film);
    film.addActors(actor.id);

    return actor;
  }

  removeFilmToActeur(acteurId: string, filmId: string): Acteur {
    const actor: Acteur = this.getOneActeur(acteurId);
    const film: Film = this.filmService.getOneFilm(filmId);

    if (!actor.films.includes(film.id))
      throw new NotFoundException(
        `L'acteur ${acteurId} n'as pas le film ${filmId}`,
      );

    actor.removeFilm(film);
    film.removeActors(actor.id);

    return actor;
  }
}
