/**
 * Tests unitaires pour le contrôleur de recettes
 * Tests de création, validation, et gestion des erreurs
 */

import Recipe from "../../models/Recipe.js";
import recipeController from "../recipeController.js";

// Mock du modèle Recipe
jest.mock("../../models/Recipe.js", () => {
  return jest.fn().mockImplementation((data) => ({
    ...data,
    validate: jest.fn(() => ({ isValid: true, errors: [] })),
    create: jest.fn(() => Promise.resolve(1)),
    toJSON: jest.fn(() => data),
  }));
});

describe("RecipeController", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {},
      params: {},
      user: null,
    };

    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("createRecipe", () => {
    test("crée une recette avec succès pour un utilisateur connecté", async () => {
      mockReq.user = { userId: 1 };
      mockReq.body = {
        title: "Test Recipe",
        description: "Test description",
        ingredients: "Test ingredients",
        instructions: "Test instructions",
        prep_time: 15,
        cook_time: 20,
        servings: 4,
        difficulty: "Moyen",
      };

      const mockRecipe = {
        validate: jest.fn(() => ({ isValid: true, errors: [] })),
        create: jest.fn(() => Promise.resolve(1)),
        toJSON: jest.fn(() => ({
          id: 1,
          ...mockReq.body,
          user_id: 1,
        })),
      };

      Recipe.mockImplementation(() => mockRecipe);

      await recipeController.createRecipe(mockReq, mockRes);

      expect(Recipe).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Recipe",
          user_id: 1,
        })
      );
      expect(mockRecipe.validate).toHaveBeenCalled();
      expect(mockRecipe.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
        })
      );
    });

    test("crée une recette avec succès sans utilisateur connecté", async () => {
      mockReq.user = null;
      mockReq.body = {
        title: "Test Recipe",
        ingredients: "Test ingredients",
        instructions: "Test instructions",
      };

      const mockRecipe = {
        validate: jest.fn(() => ({ isValid: true, errors: [] })),
        create: jest.fn(() => Promise.resolve(1)),
        toJSON: jest.fn(() => ({
          id: 1,
          ...mockReq.body,
          user_id: null,
        })),
      };

      Recipe.mockImplementation(() => mockRecipe);

      await recipeController.createRecipe(mockReq, mockRes);

      expect(Recipe).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Recipe",
          user_id: null,
        })
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    test("retourne une erreur 400 si la validation échoue", async () => {
      mockReq.user = { userId: 1 };
      mockReq.body = {
        title: "AB", // Trop court
        ingredients: "Test ingredients",
        instructions: "Test instructions",
      };

      const mockRecipe = {
        validate: jest.fn(() => ({
          isValid: false,
          errors: [
            {
              field: "title",
              message: "Le titre doit contenir au moins 3 caractères",
            },
          ],
        })),
      };

      Recipe.mockImplementation(() => mockRecipe);

      await recipeController.createRecipe(mockReq, mockRes);

      expect(mockRecipe.validate).toHaveBeenCalled();
      expect(mockRecipe.create).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Données invalides",
          errors: expect.any(Array),
        })
      );
    });

    test("retourne une erreur 500 si la création échoue", async () => {
      mockReq.user = { userId: 1 };
      mockReq.body = {
        title: "Test Recipe",
        ingredients: "Test ingredients",
        instructions: "Test instructions",
      };

      const mockRecipe = {
        validate: jest.fn(() => ({ isValid: true, errors: [] })),
        create: jest.fn(() => Promise.reject(new Error("Database error"))),
      };

      Recipe.mockImplementation(() => mockRecipe);

      // Mock console.error pour éviter les logs dans les tests
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await recipeController.createRecipe(mockReq, mockRes);

      expect(mockRecipe.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: "Erreur serveur",
        })
      );

      consoleSpy.mockRestore();
    });

    test("gère tous les champs optionnels", async () => {
      mockReq.user = { userId: 1 };
      mockReq.body = {
        title: "Test Recipe",
        description: "Test description",
        ingredients: "Test ingredients",
        instructions: "Test instructions",
        prep_time: 15,
        cook_time: 20,
        servings: 4,
        difficulty: "Moyen",
        image_url: "https://example.com/image.jpg",
        video_url: "https://youtube.com/watch?v=test",
      };

      const mockRecipe = {
        validate: jest.fn(() => ({ isValid: true, errors: [] })),
        create: jest.fn(() => Promise.resolve(1)),
        toJSON: jest.fn(() => ({
          id: 1,
          ...mockReq.body,
          user_id: 1,
        })),
      };

      Recipe.mockImplementation(() => mockRecipe);

      await recipeController.createRecipe(mockReq, mockRes);

      expect(Recipe).toHaveBeenCalledWith(
        expect.objectContaining({
          image_url: "https://example.com/image.jpg",
          video_url: "https://youtube.com/watch?v=test",
        })
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });
});
