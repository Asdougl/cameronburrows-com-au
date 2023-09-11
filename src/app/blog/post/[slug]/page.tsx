import { ArrowLeftIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Post } from '../../../../components/Post'
import { isArticle } from '../../../../types/article'
import { getArticleFiles, readArticle } from '../../../../util/articles'

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <main>
      {file && isArticle(file) ? (
        <Post article={file} />
      ) : (
        <div className="container mx-auto max-w-2xl py-16">
          <div className="flex items-baseline gap-2 pt-4 pb-10 text-6xl opacity-50">
            <FaceFrownIcon height={24} width={24} />
            <h2 className="font-display text-6xl font-black">Hmmm...</h2>
          </div>
          <h1 className="mb-6 px-8 font-display text-xl">
            Not sure about that post
          </h1>
          <div className="flex items-center justify-center">
            <Link href="/blog" className="group flex items-center">
              <div className="w-0">
                <ArrowLeftIcon
                  height={24}
                  className="translate-x-1 scale-75 pr-3 opacity-0 transition-all group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                />
              </div>
              <div className="z-10 transition-transform group-hover:translate-x-6">
                <div className="rounded-2xl bg-accent px-6 py-2">
                  Back to blog
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
