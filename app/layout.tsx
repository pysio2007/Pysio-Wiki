import type { Metadata } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import {
  Footer,
  LastUpdated,
  Layout,
  Navbar
} from 'nextra-theme-docs'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'Pysio Wiki',
    template: '%s | Pysio Wiki'
  },
  description: 'Pysio 的 API 文档、美术资源与项目资料',
  applicationName: 'Pysio Wiki'
}

export default async function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  const pageMap = await getPageMap()

  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="P" />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<strong>Pysio Wiki</strong>}
              projectLink="https://github.com/pysio2007/Pysio-Wiki"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/pysio2007/Pysio-Wiki/tree/master"
          editLink="在 GitHub 上编辑此页"
          feedback={{ content: '提交文档反馈', labels: 'documentation' }}
          footer={
            <Footer>
              {new Date().getFullYear()} © Pysio Wiki
            </Footer>
          }
          lastUpdated={<LastUpdated locale="zh-CN">最后更新于</LastUpdated>}
          sidebar={{ defaultMenuCollapseLevel: 2 }}
          themeSwitch={{ dark: '深色', light: '浅色', system: '跟随系统' }}
          toc={{ backToTop: '返回顶部', title: '本页内容' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
