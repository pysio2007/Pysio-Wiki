import { describe, expect, test } from 'bun:test'
import {
  blogApiOperations,
  fileApiOperations,
  whoisApiOperations
} from '../config/openapi-operation-order'
import {
  isOpenApiDocument,
  selectOperations
} from '../lib/openapi/operations'
import blogApi from '../public/openapi/blog-api.json'
import fileApi from '../public/openapi/file-api.json'
import whoisApi from '../public/openapi/whois-api.json'

const cases = [
  ['Blog API', blogApi, blogApiOperations],
  ['File API', fileApi, fileApiOperations],
  ['Whois API', whoisApi, whoisApiOperations]
] as const

describe('migrated OpenAPI specifications', () => {
  for (const [name, document, selection] of cases) {
    test(`${name} is valid and contains every migrated operation`, () => {
      expect(isOpenApiDocument(document)).toBe(true)

      if (!isOpenApiDocument(document)) {
        throw new Error(`${name} is not a valid OpenAPI document`)
      }

      expect(selectOperations(document, selection)).toHaveLength(
        selection.length
      )
    })
  }
})
