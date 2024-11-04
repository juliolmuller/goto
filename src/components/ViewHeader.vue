<script setup lang="ts">
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';

type ViewHeaderProps = {
  title: string;
  debounceTime?: number;
  searchPlaceholder?: string;
};

const props = defineProps<ViewHeaderProps>();
const model = defineModel<string>();
const searchText = ref(model.value);

watch(
  searchText,
  debounce(() => {
    model.value = searchText.value;
  }, props.debounceTime || 350),
);
</script>

<template>
  <header class="view-header">
    <h1>{{ title }}</h1>

    <input
      v-if="typeof model !== 'undefined'"
      type="search"
      autofocus
      :placeholder="searchPlaceholder || 'Buscar...'"
      v-model="searchText"
    />
  </header>

  <hr />
</template>

<style scoped lang="scss">
.view-header {
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  input {
    transition: border-color 400ms;

    border: 1px solid var(--color-border);
    border-radius: 1rem;
    background: transparent;
    padding: 0.5rem 0.75rem;

    color: var(--color-text);

    &:focus {
      border-color: var(--color-text);
    }

    &::placeholder {
      opacity: 0.5;
      color: var(--color-text);
    }
  }
}

hr {
  border: 0;
  border-bottom: 1px solid var(--color-border);
  margin: 1rem 0;
}
</style>
