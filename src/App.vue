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
      <router-link to="/">Home</router-link>
      <router-link to="/potato" exact>Potato 🥔</router-link>
      <router-link to="/tomato" exact>Tomato 🍅</router-link>
    </nav>
  </header>

  <main>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="slide-fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
header {
  max-height: 100vh;
  border-right: 0 solid var(--color-border);
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

main {
  padding-right: calc(var(--section-gap) / 4);
  padding-left: calc(var(--section-gap) / 4);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right-width: 1px;
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
