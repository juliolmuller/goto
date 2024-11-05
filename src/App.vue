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
      <router-link to="/mine">Meus Atalhos</router-link>
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

<style scoped lang="scss">
header {
  max-height: 100vh;
  border-right: 0 solid var(--color-border);

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    border-right-width: 1px;
    padding-right: calc(var(--section-gap) / 2);
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }

  img {
    rotate: -90deg;
    height: 80px;
    aspect-ratio: 1/1;
    object-fit: contain;
  }

  h1 {
    font-size: 80px;
    font-weight: 700;
    scale: 1.1;
  }
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;

    margin-top: 1rem;
    margin-left: 94px;
    border-left: 1px solid var(--color-border);
    padding-right: 4rem;

    font-size: 1rem;
    text-align: left;
  }

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);

    @media (min-width: 1024px) {
      border: 0;
      padding: 0.5rem 1rem;
    }

    &:first-of-type {
      border: 0;
    }

    &.router-link-exact-active {
      color: var(--color-text);

      &:hover {
        background-color: transparent;
      }
    }
  }
}

main {
  padding-right: calc(var(--section-gap) / 4);
  padding-left: calc(var(--section-gap) / 4);
}
</style>
