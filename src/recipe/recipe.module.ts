import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from 'src/schemas/recipe.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports:[RecipeService]
})
export class RecipeModule { }
