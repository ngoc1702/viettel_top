import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('package').title('Package'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('sub_category').title('Sub Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post','package', 'category', 'sub_category' ,'author'].includes(item.getId()!),
      ),
    ])
