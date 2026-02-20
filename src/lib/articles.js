import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

// Components: mdsvex-processed markdown (for rendering)
const articleModules = import.meta.glob('/src/content/articles/*.md', { eager: true });
// Raw content: for parsing frontmatter (mdsvex doesn't expose metadata reliably via glob)
const rawModules = import.meta.glob('/src/content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Get all articles with their metadata (from parsed frontmatter) and component
 */
export function getArticles() {
  const entries = Object.entries(articleModules);
  if (entries.length === 0) return [];

  const articles = entries.map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '');
    
    // Find the raw content using multiple possible key formats
    const rawKey = path + '?raw';
    const raw = rawModules[rawKey] || rawModules[path] || Object.entries(rawModules).find(([k]) => k.startsWith(path))?.[1];
    
    // Parse metadata from raw content if possible, otherwise fall back to mdsvex metadata
    let metadata = {};
    if (typeof raw === 'string') {
      try {
        metadata = matter(raw).data;
      } catch (e) {
        console.error(`Error parsing YAML for ${path}:`, e);
        metadata = module.metadata || {};
      }
    } else {
      metadata = module.metadata || {};
    }

    return {
      slug,
      title: metadata.title || 'Untitled',
      category: metadata.category || 'Article',
      tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : []),
      date: metadata.date || new Date().toISOString().split('T')[0],
      author: metadata.author || 'Unknown',
      readTime: metadata.readTime ?? 0,
      description: metadata.description || '',
      component: module.default
    };
  }).sort((a, b) => {
    try {
      return new Date(b.date) - new Date(a.date);
    } catch {
      return 0;
    }
  });

  return articles;
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
