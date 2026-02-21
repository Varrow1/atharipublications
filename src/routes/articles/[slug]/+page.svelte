<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { base } from '$app/paths';
  
  let { data } = $props();
  const article = $derived(data.article);
  const Component = $derived(article?.component);
  
  // Format date
  function formatDate(dateString) {
    if (!dateString) return 'Date unknown';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date unknown';
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return 'Date unknown';
    }
  }
  
  // Get category bar text
  function getCategoryBar() {
    return article.category || 'Article';
  }
  
  // Get tag (show first tag or category shorthand, not generic "Article")
  function getTag() {
    if (article.tags && article.tags.length > 0) {
      return article.tags[0];
    }
    if (article.category) {
      const parts = article.category.split('·');
      return parts[parts.length - 1]?.trim() || 'Article';
    }
    return 'Article';
  }
  
  onMount(() => {
    // Scroll to top on load with a slight delay to account for transitions
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 10);
    
    // Back to top button
    const btt = document.getElementById('btt');
    
    if (btt) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        btt.classList.toggle('show', scrolled > 400);
      });
      
      btt.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
</script>

<div class="cat-bar" in:fade={{ duration: 300 }}>{getCategoryBar()}</div>

<div class="breadcrumb" in:fade={{ duration: 400, delay: 200 }}>
  <a href="{base}/articles">← All Articles</a> <span>/</span> <span>{article.title}</span>
</div>

<header class="art-hero" in:fly={{ y: 20, duration: 600, delay: 300 }}>
  <div class="art-tag">{getTag()}</div>
  <h1>{article.title}</h1>
  <p class="art-subtitle">{article.description}</p>
  <div class="art-meta">
    <div class="meta-item">
      <span class="meta-label">Author</span>
      <span class="meta-value">{article.author}</span>
    </div>
    <span class="divider">|</span>
    <div class="meta-item">
      <span class="meta-label">Published</span>
      <span class="meta-value">{formatDate(article.date)}</span>
    </div>
    {#if article.readTime}
      <span class="divider">|</span>
      <div class="meta-item">
        <span class="meta-label">Time</span>
        <span class="meta-value">{article.readTime} min read</span>
      </div>
    {/if}
  </div>
</header>

<main class="art-body" in:fade={{ duration: 600, delay: 500 }}>
  <div class="ornament">✦ ✦ ✦</div>
  {#if Component}
    <div class="article-content">
      <Component />
    </div>
  {:else}
    <p>Error loading article content.</p>
  {/if}
  <div class="ornament" style="margin-top: 4rem">✦ ✦ ✦</div>
</main>

<button class="btt" id="btt" title="Back to top" aria-label="Back to top">↑</button>

<style>
  .meta-item { display: flex; flex-direction: column; }
  .meta-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); font-weight: 700; margin-bottom: 2px; }
  .meta-value { font-size: 0.85rem; color: var(--ink); font-weight: 500; }
  .article-content { animation: fadeIn 0.8s ease-out both; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
