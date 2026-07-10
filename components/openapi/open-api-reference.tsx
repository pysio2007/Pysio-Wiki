import type { ReactNode } from 'react'
import {
  isOpenApiDocument,
  schemaLabel,
  selectOperations
} from '@/lib/openapi/operations'
import type {
  ApiOperation,
  HttpMethod,
  OpenApiContent,
  OpenApiParameter,
  OpenApiReferenceObject,
  OpenApiRequestBody,
  OpenApiResponse
} from '@/types/openapi'
import styles from './open-api-reference.module.css'

type OpenApiReferenceProps = {
  document: unknown
  operations?: readonly string[]
  specUrl: string
}

const methodClasses: Record<HttpMethod, string> = {
  get: styles.methodGet,
  post: styles.methodPost,
  put: styles.methodPut,
  patch: styles.methodPatch,
  delete: styles.methodDelete,
  options: styles.methodOptions,
  head: styles.methodHead,
  trace: styles.methodTrace
}

function isReference(
  value: OpenApiRequestBody | OpenApiResponse | OpenApiReferenceObject
): value is OpenApiReferenceObject {
  return '$ref' in value
}

function Security({ operation }: { operation: ApiOperation }) {
  const schemes = [
    ...new Set(operation.security?.flatMap(item => Object.keys(item)) || [])
  ]
  if (!schemes.length) return null

  return (
    <p className={styles.security}>
      <strong>认证</strong>
      {schemes.map(scheme => (
        <code key={scheme}>{scheme}</code>
      ))}
    </p>
  )
}

function Parameters({ parameters }: { parameters: OpenApiParameter[] }) {
  if (!parameters.length) return null

  return (
    <section className={styles.detailSection}>
      <h4>参数</h4>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>名称</th>
              <th>位置</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map(parameter => (
              <tr key={`${parameter.in}:${parameter.name}`}>
                <td>
                  <code>{parameter.name}</code>
                  {parameter.required && (
                    <span className={styles.required}>必填</span>
                  )}
                </td>
                <td>{parameter.in}</td>
                <td>
                  <code>{schemaLabel(parameter.schema)}</code>
                </td>
                <td>{parameter.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function contentDetails(content?: OpenApiContent): ReactNode {
  if (!content) return '—'

  return Object.entries(content).map(([mediaType, media]) => (
    <span className={styles.contentType} key={mediaType}>
      <code>{mediaType}</code>
      <span>{schemaLabel(media.schema)}</span>
    </span>
  ))
}

function RequestBody({ body }: { body?: OpenApiRequestBody | OpenApiReferenceObject }) {
  if (!body) return null

  return (
    <section className={styles.detailSection}>
      <h4>请求体</h4>
      {isReference(body) ? (
        <code>{body.$ref}</code>
      ) : (
        <>
          {body.description && <p>{body.description}</p>}
          {body.required && <span className={styles.required}>必填</span>}
          <div className={styles.contentList}>{contentDetails(body.content)}</div>
        </>
      )}
    </section>
  )
}

function Responses({
  responses
}: {
  responses?: Record<string, OpenApiResponse | OpenApiReferenceObject>
}) {
  if (!responses || !Object.keys(responses).length) return null

  return (
    <section className={styles.detailSection}>
      <h4>响应</h4>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>状态</th>
              <th>说明</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(responses).map(([status, response]) => (
              <tr key={status}>
                <td>
                  <code className={styles.status}>{status}</code>
                </td>
                {isReference(response) ? (
                  <td colSpan={2}>
                    <code>{response.$ref}</code>
                  </td>
                ) : (
                  <>
                    <td>{response.description || '—'}</td>
                    <td>
                      <div className={styles.contentList}>
                        {contentDetails(response.content)}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Operation({ operation }: { operation: ApiOperation }) {
  return (
    <article className={styles.operation} id={operation.id}>
      <header className={styles.operationHeader}>
        <span
          className={`${styles.method} ${methodClasses[operation.methodKey]}`}
        >
          {operation.method}
        </span>
        <code className={styles.path}>{operation.path}</code>
      </header>
      <h3>{operation.summary || `${operation.method} ${operation.path}`}</h3>
      {operation.description && <p>{operation.description}</p>}
      <Security operation={operation} />
      <Parameters parameters={operation.parameters} />
      <RequestBody body={operation.requestBody} />
      <Responses responses={operation.responses} />
    </article>
  )
}

export function OpenApiReference({
  document,
  operations: selection,
  specUrl
}: OpenApiReferenceProps) {
  if (!isOpenApiDocument(document)) {
    throw new Error('Invalid OpenAPI document')
  }

  const operations = selectOperations(document, selection)

  return (
    <section className={styles.reference} aria-label={`${document.info.title} 接口`}>
      <header className={styles.referenceHeader}>
        <div>
          <p className={styles.eyebrow}>
            OpenAPI {document.openapi} · v{document.info.version}
          </p>
          <h2>{document.info.title}</h2>
          {document.info.description && <p>{document.info.description}</p>}
        </div>
        <a className={styles.download} href={specUrl} download>
          下载 OpenAPI JSON
        </a>
      </header>

      {document.servers?.length ? (
        <div className={styles.servers}>
          <strong>服务器</strong>
          {document.servers.map(server => (
            <a href={server.url} key={server.url} rel="noreferrer" target="_blank">
              <code>{server.url}</code>
              {server.description && <span>{server.description}</span>}
            </a>
          ))}
        </div>
      ) : null}

      <nav className={styles.operationIndex} aria-label="接口索引">
        {operations.map(operation => (
          <a href={`#${operation.id}`} key={operation.key}>
            <span className={methodClasses[operation.methodKey]}>
              {operation.method}
            </span>
            <code>{operation.path}</code>
          </a>
        ))}
      </nav>

      <div className={styles.operations}>
        {operations.map(operation => (
          <Operation key={operation.key} operation={operation} />
        ))}
      </div>
    </section>
  )
}
