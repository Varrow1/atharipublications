<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let { data } = $props();
  const articles = $derived(data.articles);

  function formatDate(dateString) {
    if (!dateString) return 'Date unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', month: 'short', year: 'numeric' 
      });
    } catch {
      return 'Date unknown';
    }
  }

  onMount(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  });
</script>

<div class="articles-page" in:fade={{ duration: 600 }}>
  <header class="page-header">
    <div class="header-content">
      <span class="header-tag">Archives</span>
      <h1>Research & Investigations</h1>
      <p>A comprehensive collection of articles defending the Sunnah and refuting the people of innovation.</p>
      <div class="header-line"></div>
    </div>
  </header>

  <div class="filter-container">
    <div class="home-cats">
      <button class="cat-pill active">All Articles</button>
      <button class="cat-pill">Refutations</button>
      <button class="cat-pill">Jarḥ wa-Taʿdīl</button>
      <button class="cat-pill">Scholars</button>
      <button class="cat-pill">Aqeedah</button>
      <button class="cat-pill">Manhaj</button>
    </div>
  </div>

  <div class="articles-grid">
    {#each articles as article, i}
      <a href="/articles/{article.slug}" class="article-card" in:fly={{ y: 20, duration: 500, delay: 100 + (i * 50) }}>
        <div class="card-tag">{article.tags[0] || 'Article'}</div>
        <div class="card-content">
          <span class="card-date">{formatDate(article.date)}</span>
          <span class="card-cat-label">{article.category}</span>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
        <div class="card-footer">
          <span class="read-more">Read Investigation →</span>
          <span class="read-time">{article.readTime} min read</span>
        </div>
      </a>
    {/each}
  </div>

  <div class="md-info" in:fade={{ delay: 800 }}>
    <div class="info-icon">📁</div>
    <div class="info-content">
      <strong>Writing & Editing Articles</strong>
      <p>Articles are written in Markdown (<code>.md</code>) within <code>src/content/articles/</code>. Frontmatter defines the metadata, and custom HTML classes provide the rich scholarly layout.</p>
    </div>
  </div>
</div>

<style>
  .articles-page {
    padding-bottom: 6rem;
    min-height: 100vh;
  }
  
  .page-header {
    background: var(--nav-bg);
    padding: 5rem 2rem 4rem;
    text-align: center;
    border-bottom: 3px solid var(--gold);
  }
  
  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .header-tag {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    display: block;
    margin-bottom: 0.8rem;
  }
  
  .page-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    font-weight: 900;
    color: #fff;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .page-header p {
    color: #aaa;
    font-size: 1.1rem;
    line-height: 1.6;
    font-style: italic;
  }
  
  .header-line {
    width: 60px;
    height: 3px;
    background: var(--gold);
    margin: 2rem auto 0;
  }
  
  .filter-container {
    background: var(--paper-dark);
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 64px;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }

  .home-cats {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .cat-pill {
    background: var(--paper);
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 0.4rem 1.2rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 4px;
  }
  
  .cat-pill:hover, .cat-pill.active {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--nav-bg);
    transform: translateY(-1px);
  }

  .articles-grid {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 3rem;
  }

  .article-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    padding: 2.5rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 10px 30px var(--shadow);
  }
  
  .article-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px var(--shadow);
    border-color: var(--gold);
  }
  
  .card-tag {
    position: absolute;
    top: 0; left: 2.5rem;
    background: var(--gold);
    color: var(--nav-bg);
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.4rem 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transform: translateY(-50%);
    border-radius: 2px;
  }
  
  .card-date {
    font-size: 0.8rem;
    color: var(--gold);
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-cat-label {
    font-size: 0.75rem;
    color: var(--muted);
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }
  
  .article-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 1.2rem;
    line-height: 1.3;
  }
  
  .article-card p {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
  
  .read-more {
    color: var(--gold);
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .read-time {
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .md-info {
    background: var(--paper-dark);
    border: 1px dashed var(--border);
    padding: 2rem;
    margin: 4rem auto;
    max-width: 800px;
    display: flex;
    gap: 1.5rem;
    border-radius: 8px;
  }
  
  .info-icon { font-size: 2rem; }
  .info-content strong { display: block; margin-bottom: 0.5rem; color: var(--ink); font-size: 1.1rem; }
  .info-content p { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }
  .info-content code { background: var(--paper-mid); padding: 0.1rem 0.3rem; border-radius: 3px; color: var(--gold); }

  @media (max-width: 768px) {
    .articles-grid { grid-template-columns: 1fr; margin-top: 2rem; }
    .page-header { padding: 4rem 1.5rem 3rem; }
    .filter-container { top: 60px; padding: 1rem 0; }
  }
</style>