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
import { CategoryService } from './category.service';
import { Category, CategoryDto } from './category.mock';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get('/:id')
  getOneCategory(@Param('id') id: string) {
    return this.categoryService.getOneCategory(id);
  }

  @Post()
  createNewCategory(@Body() body: CategoryDto) {
    return this.categoryService.createNewCategory(body);
  }

  @Put('/:id')
  updateCategory(@Param('id') categoryId: string, @Body() body: CategoryDto) {
    return this.categoryService.UpdateOneCategory(categoryId, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteCategory(@Param('id') categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }

  @Put('/:uuid/addfilm/:filmid')
  addFilmToCategorie(
    @Param('uuid') acteurId: string,
    @Param('filmid') filmId: string,
  ): Category {
    return this.categoryService.addFilmToCategorie(acteurId, filmId);
  }

  @Put('/:uuid/delfilm/:filmid')
  removeFilmToCategorie(
    @Param('uuid') acteurId: string,
    @Param('filmid') filmId: string,
  ): Category {
    return this.categoryService.removeFilmToCategorie(acteurId, filmId);
  }
}
