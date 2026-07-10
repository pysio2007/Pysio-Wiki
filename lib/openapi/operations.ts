import {
  HTTP_METHODS,
  type ApiOperation,
  type HttpMethod,
  type OpenApiDocument,
  type OpenApiParameter,
  type OpenApiReferenceObject,
  type OpenApiSchema
} from '@/types/openapi'

function isReference(
  value: OpenApiParameter | OpenApiReferenceObject
): value is OpenApiReferenceObject {
  return '$ref' in value
}

function mergeParameters(
  pathParameters = [] as Array<OpenApiParameter | OpenApiReferenceObject>,
  operationParameters = [] as Array<
    OpenApiParameter | OpenApiReferenceObject
  >
): OpenApiParameter[] {
  const parameters = new Map<string, OpenApiParameter>()

  for (const parameter of [...pathParameters, ...operationParameters]) {
    if (!isReference(parameter)) {
      parameters.set(`${parameter.in}:${parameter.name}`, parameter)
    }
  }

  return [...parameters.values()]
}

function operationId(method: HttpMethod, path: string) {
  return `api-${method}-${path}`
    .replace(/[{}]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export function isOpenApiDocument(value: unknown): value is OpenApiDocument {
  if (!value || typeof value !== 'object') return false

  const document = value as Partial<OpenApiDocument>
  return Boolean(
    typeof document.openapi === 'string' &&
      document.info &&
      typeof document.info.title === 'string' &&
      document.paths &&
      typeof document.paths === 'object'
  )
}

export function collectOperations(document: OpenApiDocument): ApiOperation[] {
  const operations: ApiOperation[] = []

  for (const [path, pathItem] of Object.entries(document.paths)) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method]
      if (!operation) continue

      operations.push({
        ...operation,
        id: operation.operationId || operationId(method, path),
        key: `${method} ${path}`,
        method: method.toUpperCase() as Uppercase<HttpMethod>,
        methodKey: method,
        path,
        parameters: mergeParameters(
          pathItem.parameters,
          operation.parameters
        ),
        security: operation.security ?? document.security
      })
    }
  }

  return operations
}

export function selectOperations(
  document: OpenApiDocument,
  selection?: readonly string[]
): ApiOperation[] {
  const operations = collectOperations(document)
  if (!selection) return operations

  const operationsByKey = new Map(
    operations.map(operation => [operation.key, operation])
  )

  return selection.map(key => {
    const operation = operationsByKey.get(key)
    if (!operation) {
      throw new Error(`Unknown OpenAPI operation: ${key}`)
    }
    return operation
  })
}

export function schemaLabel(schema?: OpenApiSchema): string {
  if (!schema) return '未指定'
  if (schema.$ref) return schema.$ref.split('/').at(-1) || schema.$ref

  const union = schema.oneOf || schema.anyOf || schema.allOf
  if (union) {
    return union.map(item => schemaLabel(item)).join(' | ')
  }

  if (schema.type === 'array') {
    return `array<${schemaLabel(schema.items)}>`
  }

  const type = Array.isArray(schema.type)
    ? schema.type.join(' | ')
    : schema.type || (schema.properties ? 'object' : 'any')

  return schema.format ? `${type} (${schema.format})` : type
}
