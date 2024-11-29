import { Suspense } from 'react';

import {
  Metadata,
  ResolvingMetadata,
} from 'next';
import { notFound } from 'next/navigation';

import ArticleContent from '../../components/ArticleContent';
import ArticleSkeleton from '../../components/ArticleSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';
import articleData from '../../data/data.json';
import { Article } from '../../types/article';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slug = articleData.pageProps.items.slug;

  return [{ slug }];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticleData(slug);

  if (!article) return { title: "Article Not Found" };

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.pageProps.items.title,
    description: article.pageProps.items.description,
    openGraph: {
      title: article.pageProps.items.title,
      description: article.pageProps.items.description,
      type: "article",
      images: previousImages,
    },
  };
}

async function getArticleData(slug: string): Promise<Article | null> {
  try {
    if (articleData.pageProps?.items?.slug === slug) {
      return articleData as Article;
    }

    return null;
  } catch (error) {
    console.error("Error retrieving article:", error);
    return null;
  }
}

export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent article={article} />
      </Suspense>
    </ErrorBoundary>
  );
}
