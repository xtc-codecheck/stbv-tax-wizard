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

  // JSON-LD Structured Data
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
    <>
      <Helmet>
        <title>{article.title} | {BLOG_SEO.SITE_NAME}</title>
        <meta name="description" content={article.metaDescription || article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content={BLOG_SEO.OG_TYPE} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription || article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription || article.excerpt} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <BlogNavigation showBackToBlog showBackToCalculator={false} />

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Content */}
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

            {/* Sidebar */}
            <ArticleSidebar relatedArticles={relatedArticles} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
