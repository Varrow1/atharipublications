<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let { children } = $props();
  
  function toggleDark() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const btn = document.getElementById('dmBtn');
    if (btn) {
      btn.textContent = isDark ? '☀' : '🌙';
    }
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }
  
  onMount(() => {
    // Restore saved theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const btn = document.getElementById('dmBtn');
      if (btn) {
        btn.textContent = '🌙';
      }
    }
    
    // Progress bar
    const progress = document.getElementById('progress');
    if (progress) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
      });
    }
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div id="progress"></div>

<nav>
  <div class="nav-left">
    <a class="nav-logo" href="/">
      The Madkhalis
      <span class="tagline">"Upon the Sunnah, even if people dislike it"</span>
    </a>
    <ul class="nav-links">
      <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
      <li><a href="/articles" class:active={$page.url.pathname === '/articles' || $page.url.pathname.startsWith('/articles/')}>Articles</a></li>
      <li><a href="/" onclick={(e) => e.preventDefault()}>Aqeedah</a></li>
      <li><a href="/" onclick={(e) => e.preventDefault()}>Manhaj</a></li>
      <li><a href="/" onclick={(e) => e.preventDefault()}>Refutations</a></li>
      <li><a href="/" onclick={(e) => e.preventDefault()}>Scholars</a></li>
    </ul>
  </div>
  <div class="nav-right">
    <button class="dm-toggle" id="dmBtn" onclick={() => toggleDark()} title="Toggle dark mode">☀</button>
  </div>
</nav>

{@render children()}
