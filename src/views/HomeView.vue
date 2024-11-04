<script setup lang="ts">
import { computed, ref } from 'vue';
import ViewHeader from '~/components/ViewHeader.vue';

const searchText = ref('');
const baseShortcutsList = ref([
  {
    name: 'julio',
    description: 'Portfólio do Júlio.',
    url: 'https://juliolmuller.github.io',
  },
  {
    name: 'google',
    description: 'Site de busca marota.',
    url: 'https://google.com',
  },
  {
    name: 'github',
    description: 'Repositórios Git.',
    url: 'https://github.com/ResultadosDigitais',
  },
  {
    name: 'gitlab',
    description: 'Repositórios Git.',
    url: 'https://repo.tallos.com.br/',
  },
  {
    name: 'oraculo',
    description: 'Repositório de documentações da RD.',
    url: 'https://oraculo.rdstation.com.br/',
  },
  {
    name: 'rdu',
    description: 'Universidade dos RDoers.',
    url: 'https://university.rdstation.com/',
  },
]);

const isSearching = computed(() => {
  return !!searchText.value.trim();
});

const shortcutsList = computed(() => {
  if (!isSearching.value) return baseShortcutsList.value;

  const pattern = new RegExp(searchText.value, 'i');
  const searchableFields = ['name', 'description', 'url'] as const;

  return baseShortcutsList.value.filter((item) => {
    return searchableFields.some((field) => item[field]?.match(pattern));
  });
});
</script>

<template>
  <div id="home">
    <view-header
      title="Atalhos Populares"
      search-placeholder="Buscar atalhos..."
      v-model="searchText"
    />

    <transition mode="out-in" name="slide-fade">
      <div v-if="!shortcutsList.length && isSearching">
        Is searching, but has no items.
      </div>
      <div v-else-if="!shortcutsList.length">Has no items.</div>
      <div v-else>
        <transition-group tag="ul" name="list" appear>
          <li v-for="shortcut in shortcutsList" :key="shortcut.name">
            <a :href="shortcut.url" target="_blank">goto/{{ shortcut.name }}</a>
            <p>{{ shortcut.description }}</p>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
#home {
}

ul {
  li {
    margin-top: 1rem;
  }
}
</style>
