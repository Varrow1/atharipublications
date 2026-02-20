import { error } from '@sveltejs/kit';

// Import all markdown articles
const articleModules = import.meta.glob('/src/content/articles/*.md', { eager: true });

/**
 * Get all articles with their metadata
 */
export function getArticles() {
  return Object.entries(articleModules).map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '');
    return {
      slug,
      ...module.metadata,
      component: module.default
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single article by slug
 */
export function getArticle(slug) {
  const article = getArticles().find(a => a.slug === slug);
  
  if (!article) {
    throw error(404, `Article "${slug}" not found`);
  }
  
  return article;
}
