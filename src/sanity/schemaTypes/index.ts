import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import { packageType } from './packageType'
import {authorType} from './authorType'
import {subCategoryType} from './subCategoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, subCategoryType ,postType, packageType, authorType],
}



