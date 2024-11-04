<script setup lang="ts">
import { computed, ref } from 'vue';
import ShortcutListItem from '~/components/ShortcutListItem.vue';
import ViewHeader from '~/components/ViewHeader.vue';

const searchText = ref('');
const baseShortcutsList = ref([
  {
    name: 'julio',
    description: 'Portfólio do Júlio.',
    href: 'https://juliolmuller.github.io',
    icon: 'https://github.com/juliolmuller.png',
  },
  {
    name: 'google',
    description: 'Site de busca marota.',
    href: 'https://google.com',
  },
  {
    name: 'github',
    description: 'Repositórios Git.',
    href: 'https://github.com/ResultadosDigitais',
  },
  {
    name: 'gitlab',
    description: 'Repositórios Git.',
    href: 'https://repo.tallos.com.br/',
  },
  {
    name: 'oraculo',
    description: 'Repositório de documentações da RD.',
    href: 'https://oraculo.rdstation.com.br/',
  },
  {
    name: 'rdu',
    description: 'Universidade dos RDoers.',
    href: 'https://university.rdstation.com/',
  },
]);

const isSearching = computed(() => {
  return !!searchText.value.trim();
});

const shortcutsList = computed(() => {
  if (!isSearching.value) return baseShortcutsList.value;

  const pattern = new RegExp(searchText.value, 'i');
  const searchableFields = ['href', 'name', 'description'] as const;

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
          <shortcut-list-item
            v-for="shortcut in shortcutsList"
            :key="shortcut.name"
            :href="shortcut.href"
            :name="shortcut.name"
            :description="shortcut.description"
            :icon="shortcut.icon"
          />
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
