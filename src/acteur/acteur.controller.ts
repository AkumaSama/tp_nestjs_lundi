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
import { Acteur, ActeurDTO } from './acteur.mock';
import { ActeurService } from './acteur.service';

@Controller('acteur')
export class ActeurController {
  constructor(private acteurService: ActeurService) {}
  @Get()
  getActeurs(): Acteur[] {
    return this.acteurService.getActeurs();
  }

  @Get('/:uuid')
  getOneProduct(@Param('uuid') acteurId: string): Acteur {
    const acteur = this.acteurService.getOneActeur(acteurId);
    return acteur;
  }

  @Post()
  addProduct(@Body() acteurData: ActeurDTO): Acteur {
    return this.acteurService.addActeur(acteurData);
  }

  @Put('/:uuid')
  modifyProduct(
    @Param('uuid') acteurId: string,
    @Body() acteurData: ActeurDTO,
  ): Acteur {
    return this.acteurService.modifyActeur(acteurId, acteurData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:uuid')
  deleteProduct(@Param('uuid') acteurId: string) {
    return this.acteurService.deleteActeur(acteurId);
  }

  @Put('/:uuid/addfilm/:filmid')
  addFilmToActeur(
    @Param('uuid') acteurId: string,
    @Param('filmid') filmId: string,
  ): Acteur {
    return this.acteurService.addFilmToActeur(acteurId, filmId);
  }

  @Put('/:uuid/delfilm/:filmid')
  removeFilmToActeur(
    @Param('uuid') acteurId: string,
    @Param('filmid') filmId: string,
  ): Acteur {
    return this.acteurService.removeFilmToActeur(acteurId, filmId);
  }
}
