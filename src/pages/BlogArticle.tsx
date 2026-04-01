/**
 * Blog-Artikel Detailseite
 * @module pages/BlogArticle
 */

import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  ArticleContent, 
  ArticleHeader, 
  ArticleSidebar, 
  BlogNavigation,
  NewsletterCTA 
} from '@/components/blog';
import { PageLayout } from '@/components/PageLayout';
import { getArticleBySlug, getRelatedArticles } from '@/data/blogArticles';
import { BLOG_SEO, BLOG_ROUTES } from '@/constants/blog';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to={BLOG_ROUTES.LIST} replace />;
  }

  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to={BLOG_ROUTES.LIST} replace />;
  }

  const relatedArticles = getRelatedArticles(slug, 3);
  const canonicalUrl = `https://stbvv-rechner.de${BLOG_ROUTES.ARTICLE(slug)}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: article.author || BLOG_SEO.DEFAULT_AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: BLOG_SEO.SITE_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <PageLayout maxWidth="max-w-6xl">
      <Helmet>
        <title>{article.title} | {BLOG_SEO.SITE_NAME}</title>
        <meta name="description" content={article.metaDescription || article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:type" content={BLOG_SEO.OG_TYPE} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription || article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription || article.excerpt} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <BlogNavigation showBackToBlog showBackToCalculator={false} />

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <main>
          <ArticleHeader
            title={article.title}
            date={article.date}
            readTime={article.readTime}
            category={article.category}
            author={article.author}
          />
          
          <ArticleContent content={article.content} />

          <div className="mt-12">
            <NewsletterCTA />
          </div>
        </main>

        <ArticleSidebar relatedArticles={relatedArticles} />
      </div>
    </PageLayout>
  );
};

export default BlogArticle;
