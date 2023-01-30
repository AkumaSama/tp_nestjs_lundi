import { Module } from '@nestjs/common';
import { ActeurController } from './acteur.controller';
import { ActeurService } from './acteur.service';

@Module({
  controllers: [ActeurController],
  providers: [ActeurService],
})
export class ActeurModule {}
