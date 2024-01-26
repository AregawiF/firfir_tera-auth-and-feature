<<<<<<< HEAD
// import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
// import { Category } from "../schemas/recipe.schema";

// export class createRecipeDto {
//   @IsString()
//   @IsNotEmpty()
//   readonly title: string;

//   @IsString()
//   readonly description: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly procedure: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly cook: string;

//   @IsNotEmpty()
//   @IsEnum(Category, {message: 'Please enter the appropriate category!!'})
//   readonly category: Category;
// }

// export class updateRecipeDto {
//   @IsString()
//   @IsOptional()
//   readonly title: string;

//   @IsString()
//   @IsOptional()
//   readonly description: string;

//   @IsString()
//   @IsOptional()
//   readonly procedure: string;

//   @IsString()
//   @IsOptional()
//   readonly cook: string;

//   @IsOptional()
//   @IsEnum(Category, { message: 'please enter the appropriate category!!' })
//   readonly category: Category;
// }
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/recipe.schema';
=======
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/recipe.schema";

>>>>>>> 29d17282a90ff2728844138a5eed2ab849bf5721

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
