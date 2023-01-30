import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { ActeurModule } from './acteur/acteur.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [FilmModule, ActeurModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
