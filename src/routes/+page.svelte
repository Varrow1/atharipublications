<script>
  import { onMount } from 'svelte';
  
  let { data } = $props();
  const articles = $derived(data.articles);
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  // Get first tag
  function getFirstTag(article) {
    if (article.tags && article.tags.length > 0) {
      return article.tags[0];
    }
    return '';
  }
  
  // Get category display
  function getCategoryDisplay(article) {
    return article.category || 'Article';
  }
  
  // Category pills (visual only for now)
  onMount(() => {
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });
</script>

<div class="home-hero">
  <div class="home-hero-arabic">أهل السنة والجماعة</div>
  <h1>
    <span class="quote-marks">"</span>The Madkhalis<span class="quote-marks">"</span>
  </h1>
  <p>Clarifying the Sunnah · Refuting Innovations · Defending the Scholars</p>
  <div class="home-tagline-rule"></div>
</div>

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

<!-- Markdown info section -->
<div class="md-info">
  <strong>📁 How Articles Are Written (SvelteKit + mdsvex)</strong><br><br>
  Each article on this site is a <code>.md</code> file in <code>src/content/articles/</code>. To add a new article, create a file like <code>my-article.md</code> and add frontmatter at the top:<br><br>
  <code>---<br>title: Your Article Title<br>category: refutations<br>tags: [khawarij, aqeedah]<br>date: 2026-02-20<br>---</code><br><br>
  Then write your article below using Markdown. Custom components like <code>&lt;HadithBlock&gt;</code>, <code>&lt;ScholarQuote&gt;</code>, and <code>&lt;VerseBlock&gt;</code> can be dropped inline. SvelteKit automatically creates a page for it at <code>/articles/my-article</code>.
</div>

<style>
  .article-card {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  .article-card:hover {
    text-decoration: none;
  }
</style>
