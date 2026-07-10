import { describe, expect, test } from 'bun:test'
import {
  collectOperations,
  schemaLabel,
  selectOperations
} from '../lib/openapi/operations'
import type { OpenApiDocument } from '../types/openapi'

const document: OpenApiDocument = {
  openapi: '3.0.0',
  info: { title: 'Example API', version: '1.0.0' },
  paths: {
    '/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      get: {
        summary: 'Get user',
        responses: { '200': { description: 'Found' } }
      },
      delete: {
        summary: 'Delete user',
        responses: { '204': { description: 'Deleted' } }
      }
    }
  }
}

describe('OpenAPI operation model', () => {
  test('collects operations and merges path-level parameters', () => {
    const operations = collectOperations(document)

    expect(operations.map(operation => operation.key)).toEqual([
      'get /users/{id}',
      'delete /users/{id}'
    ])
    expect(operations[0]?.parameters).toHaveLength(1)
    expect(operations[0]?.parameters[0]?.name).toBe('id')
  })

  test('selects operations in the requested migration order', () => {
    expect(
      selectOperations(document, [
        'delete /users/{id}',
        'get /users/{id}'
      ]).map(operation => operation.method)
    ).toEqual(['DELETE', 'GET'])
  })

  test('rejects a stale operation selection', () => {
    expect(() => selectOperations(document, ['post /missing'])).toThrow(
      'Unknown OpenAPI operation: post /missing'
    )
  })

  test('summarizes common schema shapes', () => {
    expect(schemaLabel({ $ref: '#/components/schemas/User' })).toBe('User')
    expect(schemaLabel({ type: 'array', items: { type: 'string' } })).toBe(
      'array<string>'
    )
    expect(schemaLabel({ type: 'string', format: 'date-time' })).toBe(
      'string (date-time)'
    )
  })
})
