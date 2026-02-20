import { getArticle } from '$lib/articles.js';

export function load({ params }) {
  const article = getArticle(params.slug);
  return {
    article
  };
}
