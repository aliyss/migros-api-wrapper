import { Language } from "../../enums/Language";

export interface IRecipeSearchAggregationItem {
  count: string;
  id: string;
}

export interface IRecipeSearchAggregationTaxonomy {
  taxonomy: IRecipeSearchAggregationItem;
}

export interface IRecipeSearchAggregationFamily {
  ingredientFamily: IRecipeSearchAggregationItem;
}

export interface IRecipeSearchRecipe {
  title: string;
  discount: boolean;
  matchedIngredients: any[];
  video?: { id: string };
  images: {
    ["130w"]?: string;
    ["165w"]?: string;
    ["200w"]?: string;
    ["265w"]?: string;
    ["400w"]?: string;
    ["530w"]?: string;
    ["800w"]?: string;
    [x: string]: string | undefined;
  };
  durationTotal: string;
  slug: string;
  id: string;
  language: Language;
  teasertext: string;
  rating: {
    average: number;
    rounded: number;
    count: number;
  };
}

export interface IRecipeSearchResponse {
  ingredientsCount: any;
  ingredientsMatches: any;
  total: number;
  aggregations: {
    taxonomies: IRecipeSearchAggregationTaxonomy[];
    families: IRecipeSearchAggregationFamily[];
  };
  recipes: IRecipeSearchRecipe[];
}
