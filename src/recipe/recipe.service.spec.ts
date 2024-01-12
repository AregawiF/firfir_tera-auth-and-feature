import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtPayload, RecipeService } from './recipe.service';
import { Category, Recipe } from '../schemas/recipe.schema';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';

describe('RecipeService', () => {
  let service: RecipeService;
  let model: Model<Recipe>;

  const mockRecipeModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: mockRecipeModel,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    model = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showAll', () => {
    it('should return all recipes', async () => {
      const mockRecipes: Recipe[] = [
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },
      ];

      // Mock the find method to resolve with mockRecipes
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockRecipes);

      // Call the showAll method and assert the result
      const result = await service.showAll();

      // Assert that find was called with no arguments
      expect(model.find).toHaveBeenCalledWith();

      // Assert that the result matches the mockRecipes
      expect(result).toEqual(mockRecipes);
    });
  });

  describe('getSingleRecipe', () => {
    it('should return a real recipe when a valid ID is provided', async () => {
      const mockRecipeId = '5f62e1c3e065bb001f34c421';
      const realRecipeData: Recipe = {
        name: 'Spaghetti Bolognese',
        description: 'Classic Italian pasta dish',
        cookTime: 30,
        people: 4,
        ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
        steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
        fasting: false,
        type: Category.DINNER,
        image: 'https://example.com/spaghetti-bolognese.jpg',
        cook_id: 'someCookId',
      };

      jest.spyOn(model, 'findById').mockResolvedValueOnce(realRecipeData);

      const result = await service.getSingleRecipe(mockRecipeId);
      console.log('Result:', result);

      // Assert that findById was called with the correct ID
      expect(mockRecipeModel.findById).toHaveBeenCalledWith(mockRecipeId);

      // Assert that the result matches the realRecipeData
      expect(result).toEqual(realRecipeData);
    });

    it('should throw NotFoundException when an invalid ID is provided', async () => {
      const mockInvalidRecipeId = 'invalidRecipeId';

      // Mock the findById method to resolve with null (indicating no recipe found)
      mockRecipeModel.findById.mockResolvedValueOnce(null);

      // Call the getSingleRecipe method with the mock invalid ID
      // Assert that it throws a NotFoundException
      await expect(
        service.getSingleRecipe(mockInvalidRecipeId),
      ).rejects.toThrowError(NotFoundException);

      // Assert that findById was called with the correct ID
      expect(mockRecipeModel.findById).toHaveBeenCalledWith(
        mockInvalidRecipeId,
      );
    });
  });

  describe('getRecipesByCookId', () => {
    it('should return recipes when valid cook ID is provided', async () => {
      const mockCookId = '5f62e1c3e065bb001f34c421';
      const mockRecipes: Recipe[] = [
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },
      ];

      // Mock the find method to resolve with mockRecipes
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockRecipes);

      const result = await service.getRecipesByCookId(mockCookId);
      console.log('result ', result);
      // Assert that find was called with the correct cook ID
      expect(mockRecipeModel.find).toHaveBeenCalledWith({
        cook_id: mockCookId,
      });

      // Assert that the result matches the mockRecipes
      expect(result).toEqual(mockRecipes);
    });

    it('should throw NotFoundException when no recipes are found for the cook ID', async () => {
      const mockCookId = 'someCookId';

      // Mock the find method to resolve with an empty array
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Call the getRecipesByCookId method with the mock cook ID
      // Assert that it throws a NotFoundException
      await expect(service.getRecipesByCookId(mockCookId)).rejects.toThrowError(
        NotFoundException,
      );

      // Assert that find was called with the correct cook ID
      expect(model.find).toHaveBeenCalledWith({ cook_id: mockCookId });
    });
  });

  describe('getFasting', () => {
    it('should return recipes when fasting is true', async () => {
      const mockFasting = true;
      const mockRecipes: Recipe[] = [
        {
          name: 'Healthy Salad',
          description: 'A nutritious salad for fasting',
          cookTime: 15,
          people: 2,
          ingredients: ['Lettuce', 'Tomatoes', 'Cucumbers'],
          steps: ['Chop vegetables', 'Mix ingredients', 'Enjoy'],
          fasting: true,
          type: Category.LUNCH,
          image: 'https://example.com/healthy-salad.jpg',
          cook_id: 'someCookId',
        },
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },
      ];

      // Mock the find method to resolve with mockRecipes
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockRecipes);

      const result = await service.getFasting(mockFasting);

      // Assert that find was called with the correct fasting value
      expect(model.find).toHaveBeenCalledWith({ fasting: mockFasting });

      // Assert that the result matches the mockRecipes
      expect(result).toEqual(mockRecipes);
    });

    it('should throw NotFoundException when no recipes found for fasting', async () => {
      const mockFasting = true;

      // Mock the find method to resolve with an empty array
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Call the getFasting method with the mock fasting value
      // Assert that it throws a NotFoundException
      await expect(service.getFasting(mockFasting)).rejects.toThrow(
        NotFoundException,
      );

      // Assert that find was called with the correct fasting value
      expect(model.find).toHaveBeenCalledWith({ fasting: mockFasting });
    });

    // Add more test cases for different scenarios as needed
  });

  describe('getByType', () => {
    it('should return recipes of the specified type', async () => {
      const mockType = 'DINNER';
      const mockRecipes = [
        {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        },

        // Add more mock recipes as needed
      ];

      // Mock the find method to resolve with mockRecipes
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockRecipes);

      const result = await service.getByType(mockType);

      // Assert that find was called with the correct type
      expect(mockRecipeModel.find).toHaveBeenCalledWith({ type: mockType });

      // Assert that the result matches the mockRecipes
      expect(result).toEqual(mockRecipes);
    });

    it('should throw NotFoundException when no recipes found for the specified type', async () => {
      const mockInvalidType = 'INVALID_TYPE';

      // Mock the find method to resolve with an empty array (no recipes found)
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Assert that it throws a NotFoundException
      await expect(service.getByType(mockInvalidType)).rejects.toThrowError(
        NotFoundException,
      );

      // Assert that find was called with the correct type
      expect(mockRecipeModel.find).toHaveBeenCalledWith({
        type: mockInvalidType,
      });
    });
  });

  describe('RecipeService', () => {
    describe('searchByTitle', () => {
      it('should return recipes with the specified title', async () => {
        const mockTitle = 'Spaghetti Bolognese';
        const mockRecipes = [
          {
            name: 'Spaghetti Bolognese',
            description: 'Classic Italian pasta dish',
            cookTime: 30,
            people: 4,
            ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
            steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
            fasting: false,
            type: Category.DINNER,
            image: 'https://example.com/spaghetti-bolognese.jpg',
            cook_id: '5f62e1c3e065bb001f34c421',
          },
          // Add more mock recipes as needed
        ];

        // Mock the find method to resolve with mockRecipes
        jest.spyOn(model, 'find').mockResolvedValueOnce(mockRecipes);

        const result = await service.searchByTitle(mockTitle);

        // Assert that find was called with the correct title
        expect(mockRecipeModel.find).toHaveBeenCalledWith({ title: mockTitle });

        // Assert that the result matches the mockRecipes
        expect(result).toEqual(mockRecipes);
      });

      it('should throw NotFoundException when no recipes found for the specified title', async () => {
        const mockInvalidTitle = 'Non-existent Recipe';

        // Mock the find method to resolve with an empty array (no recipes found)
        jest.spyOn(model, 'find').mockResolvedValueOnce([]);

        // Assert that it throws a NotFoundException
        await expect(
          service.searchByTitle(mockInvalidTitle),
        ).rejects.toThrowError(NotFoundException);

        // Assert that find was called with the correct title
        expect(mockRecipeModel.find).toHaveBeenCalledWith({
          title: mockInvalidTitle,
        });
      });
    });
  });

  describe('RecipeService', () => {
    // Assuming you have set up your service and mock model as before

    describe('updateById', () => {
      it('should update the recipe with the specified ID', async () => {
        const mockRecipeId = '5f62e1c3e065bb001f34c421';
        const updatedRecipeData: Recipe = {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        };

        // Mock the findByIdAndUpdate method to resolve with updatedRecipeData
        jest
          .spyOn(model, 'findByIdAndUpdate')
          .mockResolvedValueOnce(updatedRecipeData);

        const result = await service.updateById(
          mockRecipeId,
          updatedRecipeData,
        );

        // Assert that findByIdAndUpdate was called with the correct ID and recipe data
        expect(mockRecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(
          mockRecipeId,
          updatedRecipeData,
          { new: true, runValidators: true },
        );

        // Assert that the result matches the updatedRecipeData
        expect(result).toEqual(updatedRecipeData);
      });

      it('should throw NotFoundException when no recipe found for the specified ID', async () => {
        const mockInvalidRecipeId = 'invalidRecipeId';
        const mockUpdatedRecipeData: Recipe = {
          name: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta dish',
          cookTime: 30,
          people: 4,
          ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'],
          steps: ['Boil water', 'Cook spaghetti', 'Prepare Bolognese sauce'],
          fasting: false,
          type: Category.DINNER,
          image: 'https://example.com/spaghetti-bolognese.jpg',
          cook_id: '5f62e1c3e065bb001f34c421',
        };

        // Mock the findByIdAndUpdate method to resolve with null (no recipe found)
        jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);

        // Assert that it throws a NotFoundException
        await expect(
          service.updateById(mockInvalidRecipeId, mockUpdatedRecipeData),
        ).rejects.toThrowError(NotFoundException);

        // Assert that findByIdAndUpdate was called with the correct ID and recipe data
        expect(mockRecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(
          mockInvalidRecipeId,
          mockUpdatedRecipeData,
          { new: true, runValidators: true },
        );
      });
    });
  });
});
