<script>
  import { onMount } from 'svelte';

  let { data } = $props();
  const articles = $derived(data.articles);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function getFirstTag(article) {
    if (article.tags && article.tags.length > 0) {
      return article.tags[0];
    }
    return '';
  }

  function getCategoryDisplay(article) {
    return article.category || 'Article';
  }

  onMount(() => {
    document.querySelectorAll('.cat-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });
</script>

<div class="articles-page">
  <div class="home-cats">
    <button class="cat-pill active">All Articles</button>
    <button class="cat-pill">Refutations</button>
    <button class="cat-pill">Jarḥ wa-Taʿdīl</button>
    <button class="cat-pill">Scholars</button>
    <button class="cat-pill">Aqeedah</button>
    <button class="cat-pill">Manhaj</button>
  </div>

  <div class="articles-grid">
    {#each articles as article}
      <a href="/articles/{article.slug}" class="article-card">
        <div class="card-top">
          <span class="card-cat">{getCategoryDisplay(article)}</span>
          {#if getFirstTag(article)}
            <span class="card-tag">{getFirstTag(article)}</span>
          {/if}
        </div>
        <div class="card-body">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
        <div class="card-footer">
          <span>{formatDate(article.date)} · {article.readTime} min read</span>
          <span class="card-read">Read →</span>
        </div>
      </a>
    {/each}
  </div>

  <div class="md-info">
    <strong>📁 How Articles Are Written (SvelteKit + mdsvex)</strong><br><br>
    Each article is a <code>.md</code> file in <code>src/content/articles/</code>. Add frontmatter and write in Markdown; pages are created at <code>/articles/slug</code>.
  </div>
</div>

<style>
  .articles-page {
    padding-bottom: 3rem;
  }
  .article-card {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .article-card:hover {
    text-decoration: none;
  }
</style>
