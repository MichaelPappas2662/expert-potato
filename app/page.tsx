import ArticlePage from './articles/[slug]/page';
import articleData from './data/data.json';

export default async function Home() {
  const { items } = articleData.pageProps;

  const params = {
    slug: items.slug,
  };

  return <ArticlePage params={Promise.resolve(params)} />;
}
