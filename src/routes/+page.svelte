<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let { data } = $props();
  // We'll assume data.articles exists or we'll just show the hero for now if not.
  // Actually, I should check +page.js for data loading.
  const articles = $derived(data?.articles?.slice(0, 3) || []);
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });
  }
</script>

<div class="home-container">
  <section class="home-hero" in:fade={{ duration: 800 }}>
    <div class="hero-content" in:fly={{ y: 30, duration: 1000, delay: 200 }}>
      <div class="home-hero-arabic">أهل السنة والجماعة على فهم سلف الأمة</div>
      <h1>
        <span class="gold-text">Dār al-Athar</span>
        <span class="subtitle">Upon the Way of the Salaf</span>
      </h1>
      <p class="hero-desc">
        A dedicated platform for clarifying the Sunnah, refuting innovations, and defending the scholars of the Ummah against the slanders of the people of desires.
      </p>
      <div class="home-tagline-rule"></div>
      <div class="hero-actions">
        <a href="/articles" class="cta-primary">Explore Research</a>
        <a href="#featured" class="cta-secondary">Featured Works</a>
      </div>
    </div>
  </section>

  <section id="featured" class="featured-section" in:fade={{ duration: 800, delay: 600 }}>
    <div class="section-header">
      <span class="section-tag">Latest Research</span>
      <h2>Featured Articles</h2>
      <div class="header-line"></div>
    </div>

    {#if articles.length > 0}
      <div class="articles-grid">
        {#each articles as article, i}
          <a href="/articles/{article.slug}" class="article-card" in:fly={{ y: 20, duration: 600, delay: 800 + (i * 100) }}>
            <div class="card-tag">{article.tags[0] || 'Article'}</div>
            <div class="card-content">
              <span class="card-date">{formatDate(article.date)}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <div class="card-footer">
              <span class="read-more">Read Investigation →</span>
              <span class="read-time">{article.readTime} min</span>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <p class="no-articles">No articles found.</p>
    {/if}
    
    <div class="view-all-box">
      <a href="/articles" class="view-all-link">View All Articles</a>
    </div>
  </section>
</div>

<style>
  .home-container {
    overflow-x: hidden;
  }
  
  .home-hero {
    background: var(--nav-bg);
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
    position: relative;
    border-bottom: 3px solid var(--gold);
  }
  
  .home-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 50% 50%, rgba(184,134,11,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .hero-content {
    max-width: 900px;
    z-index: 10;
  }
  
  .home-hero-arabic {
    font-family: 'Noto Naskh Arabic', serif;
    font-size: 1.8rem;
    color: var(--gold);
    margin-bottom: 1.5rem;
    opacity: 0.9;
    letter-spacing: 0.05em;
  }
  
  .home-hero h1 {
    font-family: 'Playfair Display', serif;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .gold-text {
    color: #fff;
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  
  .subtitle {
    color: var(--gold-light);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
  
  .hero-desc {
    color: #aaa;
    font-size: 1.15rem;
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto 2.5rem;
    font-style: italic;
  }
  
  .home-tagline-rule {
    width: 80px;
    height: 3px;
    background: var(--gold);
    margin: 0 auto 2.5rem;
  }
  
  .hero-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .cta-primary, .cta-secondary {
    padding: 1rem 2.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 4px;
  }
  
  .cta-primary {
    background: var(--gold);
    color: var(--nav-bg);
    box-shadow: 0 10px 20px rgba(184,134,11,0.2);
  }
  
  .cta-primary:hover {
    background: var(--gold-light);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(184,134,11,0.3);
  }
  
  .cta-secondary {
    border: 1px solid var(--gold);
    color: var(--gold);
  }
  
  .cta-secondary:hover {
    background: rgba(184,134,11,0.1);
    transform: translateY(-3px);
  }
  
  /* Featured Section */
  .featured-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 2rem;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .section-tag {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    display: block;
    margin-bottom: 0.8rem;
  }
  
  .section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--ink);
  }
  
  .header-line {
    width: 60px;
    height: 3px;
    background: var(--gold);
    margin: 1.5rem auto 0;
  }
  
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
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
    color: var(--muted);
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .article-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 1.2rem;
    line-height: 1.3;
  }
  
  .article-card p {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
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
  
  .view-all-box {
    text-align: center;
    margin-top: 4rem;
  }
  
  .view-all-link {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 2px solid var(--gold);
    padding-bottom: 5px;
    transition: all 0.2s;
  }
  
  .view-all-link:hover {
    color: var(--gold);
    border-color: var(--gold-light);
  }

  @media (max-width: 768px) {
    .gold-text { font-size: 3.5rem; }
    .hero-desc { font-size: 1rem; }
    .articles-grid { grid-template-columns: 1fr; }
    .featured-section { padding: 4rem 1.5rem; }
  }
</style>
