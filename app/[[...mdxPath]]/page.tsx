import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'

type ContentPageProps = {
  params: Promise<{ mdxPath?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata({ params }: ContentPageProps) {
  const { mdxPath } = await params
  const { metadata } = await importPage(mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function ContentPage(props: ContentPageProps) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath
  )

  if (!Wrapper) {
    throw new Error('Nextra docs theme did not provide an MDX wrapper')
  }

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
