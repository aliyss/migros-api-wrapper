export interface IRecipeDetailsMeasurements {
  count: number;
  measure: string;
  label?: string;
}

export interface IRecipeDetailsAggregateRating {
  ratingValue: string;
  reviewCount: string;
}

export interface IRecipeDetailsResponse {
  id: string;
  name: string;
  keywords: string;
  author: string;
  totalTime: string;
  recipeCategory: string;
  recipeCuisine: string;
  recipeInstructions: string[];
  recipeYield: string;
  recipeIngredients: string[];
  images: string[];
  aggregateRating: IRecipeDetailsAggregateRating;
  datePublished: Date;
}
