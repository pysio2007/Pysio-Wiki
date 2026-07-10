import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    title: '首页',
    type: 'doc',
    display: 'normal',
    theme: {
      breadcrumb: false,
      pagination: false,
      sidebar: true,
      toc: false
    }
  },
  '--art': {
    type: 'separator',
    title: '美术文件'
  },
  'art-files': {
    display: 'children'
  },
  '--api': {
    type: 'separator',
    title: 'API 文档'
  },
  'api-docs': {
    display: 'children'
  }
}

export default meta
