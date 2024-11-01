<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import logoPath from '~/assets/logo.svg';
</script>

<template>
  <header>
    <div class="logo">
      <img :src="logoPath" alt="Vue logo" />

      <h1 class="green">GoTo</h1>
    </div>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/potato" exact>Potato 🥔</RouterLink>
      <RouterLink to="/tomato" exact>Tomato 🍅</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 100vh;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.logo img {
  rotate: -90deg;
  height: 80px;
  aspect-ratio: 1/1;
  object-fit: contain;
}

.logo h1 {
  font-size: 80px;
  font-weight: 700;
  scale: 1.1;
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    justify-content: flex-start;
  }

  nav {
    display: flex;
    flex-direction: column;

    margin-top: 1rem;
    margin-left: 94px;
    border-left: 1px solid var(--color-border);
    padding-right: 4rem;

    font-size: 1rem;
    text-align: left;
  }

  nav a {
    border: 0;
    padding: 0.5rem 1rem;
  }
}
</style>
