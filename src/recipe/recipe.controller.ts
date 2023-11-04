<<<<<<< HEAD
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Headers,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
=======
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Headers, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/Upload/multer.config';
import { UploadService } from 'src/Upload/upload.service';
import { Category, Recipe } from 'src/schemas/recipe.schema';
import { createRecipeDto, updateRecipeDto } from 'src/dto/recipe.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from 'src/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private readonly uploadService: UploadService,
  ) {}


  @Post('new')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Roles(Role.COOK)
  async createRecipe(
<<<<<<< HEAD
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('cookTime') cookTime: number,
    @Body('people') people: number,
    @Body('ingredients') ingredients: string[],
    @Body('steps') steps: string[],
    @Body('fasting') fasting: boolean,
    @Body('type') type: Category,
    @UploadedFile() file: Express.Multer.File,
    @Headers('Authorization') authorization: string,
  ): Promise<Recipe> {
    this.uploadService.uploadFile(file);

    console.log(
      'the file is',
      name,
      description,
      cookTime,
      people,
      ingredients,
      steps,
      fasting,
      type,
      file.path,
    );
    const createdRecipe = await this.recipeService.insertRecipe(
      {
        name,
        description,
        cookTime,
        people,
        ingredients,
        steps,
        fasting,
        type,
        image: file.path,
        cook_id: '1',
      },
      authorization,
    );
=======
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("cookTime") cookTime: number,
    @Body("people") people: number,
    @Body("ingredients") ingredients: string[],
    @Body("steps") steps: string[],
    @Body("fasting") fasting: boolean,
    @Body("type") type: Category,
    @UploadedFile() file: Express.Multer.File,
    @Headers("Authorization") authorization: string): Promise<Recipe> {
    this.uploadService.uploadFile(file)
    
    console.log("the file is", name,description,cookTime,people,ingredients,steps,fasting,type,file.path)
    const createdRecipe = await this.recipeService.insertRecipe({ name, description, cookTime, people, ingredients, steps, fasting, type, image: file.path, cook_id: "1" }, authorization);
>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721
    return createdRecipe;
  }

  @Get('query')
  async search(@Query() query: ExpressQuery): Promise<Recipe[]> {
    return this.recipeService.find(query);
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
<<<<<<< HEAD
    console.log(prodId);
=======
    console.log(prodId)
>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721
    return await this.recipeService.getSingleRecipe(prodId);
  }

  @Get('myrecipes/:cookId')
  @Roles(Role.COOK)
  async getRecipesByCookId(@Param('cookId') cookId: string): Promise<Recipe[]> {
<<<<<<< HEAD
    console.log(cookId);
=======
    console.log(cookId)
>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721
    return this.recipeService.getRecipesByCookId(cookId);
  }

  @Get(':title')
  async searchRecipe(@Param('title') title: string): Promise<Recipe[]> {
    return this.recipeService.searchByTitle(title);
  }

  @Get('category/:fasting')
  async getFasting(@Param('fasting') fasting) {
    if (fasting === 'true' || fasting === 'false') {
      return await this.recipeService.getFasting(fasting);
    } else {
      return await this.recipeService.getByType(fasting);
    }
  }

  // @Patch(':id')
  // @Roles(Role.COOK)
<<<<<<< HEAD

=======
  
>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721
  // async updateRecipe(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   recipe: updateRecipeDto
  // ): Promise<Recipe> {
  //   console.log("the id is-",id)
  //   return this.recipeService.updateById(id, recipe)
  // }

<<<<<<< HEAD
  @Patch(':id')
  @Roles(Role.COOK)
  async updateProduct(
    @Param('id') recipeId: string,
    @Body('name') recipeName: string,
    @Body('description') recipeDesc: string,
    @Body('cookTime') cooktime: number,
    @Body('people') people: number,
    @Body('steps') steps: string[],
    @Body('ingredients') ings: string[],
    @Body('fasting') fasting: boolean,
    @Body('type') type: string,
    @Body('image') image: string,
  ) {
    console.log('the Id is:', recipeId);
    return await this.recipeService.updateRecipe(
      recipeId,
      recipeName,
      recipeDesc,
      cooktime,
      people,
      steps,
      ings,
      fasting,
      type,
      image,
    );
  }
=======

  @Patch(':id')
  @Roles(Role.COOK)
        async updateProduct(
            @Param('id') recipeId: string,
            @Body('name') recipeName : string,
            @Body('description') recipeDesc : string,
            @Body('cookTime') cooktime: number,
            @Body('people') people: number,
            @Body('steps')  steps: string[],
            @Body('ingredients') ings: string[],
            @Body('fasting') fasting : boolean,
            @Body('type') type: string,
            @Body('image') image: string
            
        ){ 
            console.log("the Id is:", recipeId)
            return await this.recipeService.updateRecipe(
                recipeId,
                recipeName,
                recipeDesc,
                cooktime,
                people,
                steps,
                ings,
                fasting,
                type,
                image
                
             );
        }



>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721

  @Delete(':id')
  @Roles(Role.COOK)
  async deleteRecipe(
    @Param('id')
    id: string,
  ): Promise<Recipe> {
    return this.recipeService.deleteById(id);
  }
}
