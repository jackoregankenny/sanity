export interface Translations {
  common: {
    error: string;
    noResults: string;
  };
  products: {
    categoryLabels: {
      [key: string]: string;
    };
    labels: {
      viewVariants: string;
      viewFeatures: string;
      viewBenefits: string;
      sku: string;
      activeIngredients: string;
      formulationType: string;
      containerSizes: string;
      documents: string;
    };
    sections: {
      features: string;
      benefits: string;
      variants: string;
    };
    formulation: {
      [key: string]: string;
    };
  };
} 