type TranslationKey = 
  | 'product_information'
  | 'technical_details'
  | 'active_ingredients'
  | 'documentation'
  | 'related_products'
  | 'other_products_available'
  | 'crop'
  | 'crop_group'
  | 'approval_number'
  | 'formulation_type'
  | 'mechanism_of_action'
  | 'container_size'
  | 'about_product'
  | 'interested_in_product'
  | 'contact_info'
  | 'email_us'
  | 'call_us'
  | 'contact_team'

const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    product_information: 'Product Information',
    technical_details: 'Technical Details',
    active_ingredients: 'Active Ingredients',
    documentation: 'Documentation',
    related_products: 'Related Products',
    other_products_available: 'Other products available in',
    crop: 'Crop',
    crop_group: 'Crop Group',
    approval_number: 'Approval Number',
    formulation_type: 'Formulation Type',
    mechanism_of_action: 'Mechanism of Action',
    container_size: 'Container Size',
    about_product: 'About this product',
    interested_in_product: 'Interested in this product?',
    contact_info: 'Contact Information',
    email_us: 'Email Us',
    call_us: 'Call Us',
    contact_team: 'Contact our team for more information about this product, pricing, and availability.'
  },
  fr: {
    product_information: 'Information Produit',
    technical_details: 'Détails Techniques',
    active_ingredients: 'Ingrédients Actifs',
    documentation: 'Documentation',
    related_products: 'Produits Associés',
    other_products_available: 'Autres produits disponibles en',
    crop: 'Culture',
    crop_group: 'Groupe de Cultures',
    approval_number: 'Numéro d\'Approbation',
    formulation_type: 'Type de Formulation',
    mechanism_of_action: 'Mécanisme d\'Action',
    container_size: 'Taille du Contenant',
    about_product: 'À propos de ce produit',
    interested_in_product: 'Intéressé par ce produit ?',
    contact_info: 'Informations de Contact',
    email_us: 'Envoyez-nous un Email',
    call_us: 'Appelez-nous',
    contact_team: 'Contactez notre équipe pour plus d\'informations sur ce produit, les prix et la disponibilité.'
  },
  de: {
    product_information: 'Produktinformation',
    technical_details: 'Technische Details',
    active_ingredients: 'Aktive Inhaltsstoffe',
    documentation: 'Dokumentation',
    related_products: 'Ähnliche Produkte',
    other_products_available: 'Andere verfügbare Produkte in',
    crop: 'Kultur',
    crop_group: 'Kulturgruppe',
    approval_number: 'Zulassungsnummer',
    formulation_type: 'Formulierungstyp',
    mechanism_of_action: 'Wirkungsmechanismus',
    container_size: 'Behältergröße',
    about_product: 'Über dieses Produkt',
    interested_in_product: 'Interesse an diesem Produkt?',
    contact_info: 'Kontaktinformationen',
    email_us: 'E-Mail senden',
    call_us: 'Rufen Sie uns an',
    contact_team: 'Kontaktieren Sie unser Team für weitere Informationen zu diesem Produkt, Preisen und Verfügbarkeit.'
  },
  es: {
    product_information: 'Información del Producto',
    technical_details: 'Detalles Técnicos',
    active_ingredients: 'Ingredientes Activos',
    documentation: 'Documentación',
    related_products: 'Productos Relacionados',
    other_products_available: 'Otros productos disponibles en',
    crop: 'Cultivo',
    crop_group: 'Grupo de Cultivos',
    approval_number: 'Número de Aprobación',
    formulation_type: 'Tipo de Formulación',
    mechanism_of_action: 'Mecanismo de Acción',
    container_size: 'Tamaño del Envase',
    about_product: 'Acerca de este producto',
    interested_in_product: '¿Interesado en este producto?',
    contact_info: 'Información de Contacto',
    email_us: 'Envíenos un Email',
    call_us: 'Llámenos',
    contact_team: 'Contacte a nuestro equipo para más información sobre este producto, precios y disponibilidad.'
  }
}

export function getTranslation(key: TranslationKey, lang: string = 'en'): string {
  return translations[lang]?.[key] || translations.en[key]
}

export function getAvailableLanguages() {
  return Object.keys(translations)
}

export type { TranslationKey } 