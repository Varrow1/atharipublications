<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let { data } = $props();
  const article = $derived(data.article);
  const Component = $derived(article?.component);
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
  
  // Get category bar text
  function getCategoryBar() {
    return article.category || 'Article';
  }
  
  // Get tag
  function getTag() {
    if (article.tags && article.tags.length > 0) {
      return article.tags[0];
    }
    return 'Article';
  }
  
  onMount(() => {
    window.scrollTo(0, 0);
    
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

<div class="cat-bar">{getCategoryBar()}</div>
<div class="breadcrumb">
  <a href="/">← All Articles</a> <span>/</span> <span>{article.title}</span>
</div>

<header class="art-hero">
  <div class="art-tag">{getTag()}</div>
  <h1>{article.title}</h1>
  <p class="art-subtitle">{article.description}</p>
  <div class="art-meta">
    <span>By {article.author}</span>
    <span class="divider">|</span>
    <span>{formatDate(article.date)}</span>
    <span class="divider">|</span>
    <span>{article.readTime} min read</span>
  </div>
</header>

<main class="art-body">
  <div class="ornament">✦ ✦ ✦</div>
  {@render Component()}
</main>

<a class="btt" id="btt" href="#" title="Back to top">↑</a>
