import {ListItemBuilder, StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Products list
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items([
              // English Products (Originals)
              S.listItem()
                .title('Original Products')
                .child(
                  S.documentList()
                    .title('Original Products')
                    .filter('_type == "product" && language == "en" && !defined(translations.en)')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              // Product Translations
              S.listItem()
                .title('Translations')
                .child(
                  S.list()
                    .title('Products by Language')
                    .items([
                      S.listItem()
                        .title('French Products')
                        .child(
                          S.documentList()
                            .title('French Products')
                            .filter('_type == "product" && language == "fr"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('German Products')
                        .child(
                          S.documentList()
                            .title('German Products')
                            .filter('_type == "product" && language == "de"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('Spanish Products')
                        .child(
                          S.documentList()
                            .title('Spanish Products')
                            .filter('_type == "product" && language == "es"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('Italian Products')
                        .child(
                          S.documentList()
                            .title('Italian Products')
                            .filter('_type == "product" && language == "it"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('Portuguese Products')
                        .child(
                          S.documentList()
                            .title('Portuguese Products')
                            .filter('_type == "product" && language == "pt"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}])
                        ),
                    ])
                ),
              // View All Products
              S.listItem()
                .title('All Products')
                .child(
                  S.documentList()
                    .title('All Products')
                    .filter('_type == "product"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                )
            ])
        ),
      // Blog Section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              // Original Posts
              S.listItem()
                .title('Original Posts')
                .child(
                  S.documentList()
                    .title('Original Posts')
                    .filter('_type == "post" && language == "en" && !defined(translations.en)')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              // Post Translations
              S.listItem()
                .title('Translations')
                .child(
                  S.list()
                    .title('Posts by Language')
                    .items([
                      S.listItem()
                        .title('French Posts')
                        .child(
                          S.documentList()
                            .title('French Posts')
                            .filter('_type == "post" && language == "fr"')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        ),
                      S.listItem()
                        .title('German Posts')
                        .child(
                          S.documentList()
                            .title('German Posts')
                            .filter('_type == "post" && language == "de"')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        ),
                      S.listItem()
                        .title('Spanish Posts')
                        .child(
                          S.documentList()
                            .title('Spanish Posts')
                            .filter('_type == "post" && language == "es"')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        ),
                      S.listItem()
                        .title('Italian Posts')
                        .child(
                          S.documentList()
                            .title('Italian Posts')
                            .filter('_type == "post" && language == "it"')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        ),
                      S.listItem()
                        .title('Portuguese Posts')
                        .child(
                          S.documentList()
                            .title('Portuguese Posts')
                            .filter('_type == "post" && language == "pt"')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        ),
                    ])
                ),
              // View All Posts
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              // Authors
              S.listItem()
                .title('Authors')
                .child(
                  S.documentList()
                    .title('Authors')
                    .filter('_type == "author"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              // Categories
              S.listItem()
                .title('Categories')
                .child(
                  S.documentList()
                    .title('Categories')
                    .filter('_type == "category"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                )
            ])
        )
    ]) 