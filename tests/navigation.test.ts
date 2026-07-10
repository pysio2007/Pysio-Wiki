import { describe, expect, test } from 'bun:test'
import meta from '../content/_meta'

describe('documentation navigation', () => {
  test('keeps the homepage in the documentation sidebar', () => {
    expect(meta.index).toMatchObject({
      title: '首页',
      type: 'doc',
      display: 'normal'
    })
  })

  test('orders art resources before API documentation', () => {
    expect(Object.keys(meta)).toEqual([
      'index',
      '--art',
      'art-files',
      '--api',
      'api-docs'
    ])
  })

  test('flattens content folders beneath their section labels', () => {
    expect(meta['art-files']).toMatchObject({ display: 'children' })
    expect(meta['api-docs']).toMatchObject({ display: 'children' })
  })
})
