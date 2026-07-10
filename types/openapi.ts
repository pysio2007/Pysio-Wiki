export const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
  'trace'
] as const

export type HttpMethod = (typeof HTTP_METHODS)[number]

export type OpenApiReferenceObject = {
  $ref: string
}

export type OpenApiSchema = {
  $ref?: string
  type?: string | string[]
  format?: string
  description?: string
  example?: unknown
  enum?: unknown[]
  items?: OpenApiSchema
  properties?: Record<string, OpenApiSchema>
  oneOf?: OpenApiSchema[]
  anyOf?: OpenApiSchema[]
  allOf?: OpenApiSchema[]
  additionalProperties?: boolean | OpenApiSchema
}

export type OpenApiMediaType = {
  schema?: OpenApiSchema
  example?: unknown
  examples?: Record<string, { value?: unknown } | OpenApiReferenceObject>
}

export type OpenApiContent = Record<string, OpenApiMediaType>

export type OpenApiParameter = {
  name: string
  in: string
  description?: string
  required?: boolean
  schema?: OpenApiSchema
  example?: unknown
}

export type OpenApiRequestBody = {
  description?: string
  required?: boolean
  content?: OpenApiContent
}

export type OpenApiResponse = {
  description?: string
  headers?: Record<string, unknown>
  content?: OpenApiContent
}

export type OpenApiOperation = {
  summary?: string
  description?: string
  operationId?: string
  tags?: string[]
  parameters?: Array<OpenApiParameter | OpenApiReferenceObject>
  requestBody?: OpenApiRequestBody | OpenApiReferenceObject
  responses?: Record<string, OpenApiResponse | OpenApiReferenceObject>
  security?: Array<Record<string, string[]>>
}

export type OpenApiPathItem = Partial<Record<HttpMethod, OpenApiOperation>> & {
  parameters?: Array<OpenApiParameter | OpenApiReferenceObject>
}

export type OpenApiDocument = {
  openapi: string
  info: {
    title: string
    description?: string
    version: string
  }
  servers?: Array<{ url: string; description?: string }>
  security?: Array<Record<string, string[]>>
  paths: Record<string, OpenApiPathItem>
}

export type ApiOperation = OpenApiOperation & {
  id: string
  key: string
  method: Uppercase<HttpMethod>
  methodKey: HttpMethod
  path: string
  parameters: OpenApiParameter[]
}
