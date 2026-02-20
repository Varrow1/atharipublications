import { getArticles } from '$lib/articles.js';

export function load() {
  const articles = getArticles();
  return { articles };
}
