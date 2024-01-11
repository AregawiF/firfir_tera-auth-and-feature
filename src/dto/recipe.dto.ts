import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/recipe.schema";


export class createRecipeDto {
  @IsString()
  @IsNotEmpty()
   name: string;

  @IsString() 
  @IsNotEmpty()
   description: string;

  @IsNumber()
  @IsNotEmpty()

   cookTime: number;

  @IsNumber()
  @IsNotEmpty()

  people: number;

  @IsArray()
  @IsNotEmpty()

  ingredients: string[];

  @IsArray()
  @IsNotEmpty()

  steps: string[];

  @IsBoolean()
  @IsNotEmpty()
  fasting: boolean;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter the appropriate category!!' })
  type: Category;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsString()
  cook_id: string;

}
export class updateRecipeDto {
  @IsString()
  @IsOptional()
   name: string;

  @IsString() 
  @IsOptional()
   description: string;

  @IsNumber()
  @IsOptional()
  cookTime: number;

  @IsNumber()
  @IsOptional()
  people: number;

  @IsArray()
  @IsOptional()
  ingredients: string[];

  @IsArray()
  @IsOptional()
  steps: string[];

  @IsBoolean()
  @IsOptional()
  fasting: boolean;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter the appropriate category!!' })
  type: Category;

  @IsString()
  @IsOptional()
  image: string;

  // @IsString()
  // @IsOptional()
  // cook: string;

  @IsString()
  @IsOptional()
  cook_id: string;

}

