<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ShortcutListItem from '~/components/ShortcutListItem.vue';
import ViewHeader from '~/components/ViewHeader.vue';
import { useShortcuts } from '~/store/shortcuts';

type ShortcutFormData = {
  name: string;
  href: string;
};

const EMPTY_FORM: ShortcutFormData = {
  name: '',
  href: '',
};

const route = useRoute();
const nameInQuery = route.query.name;
const nameInitial = Array.isArray(nameInQuery) ? nameInQuery[0] : nameInQuery;

const form = ref({ ...EMPTY_FORM, name: nameInitial || '' });
const submitButtonRef = ref<HTMLButtonElement>();
const searchText = ref('');
const { userShortcuts: baseShortcutsList, saveShortcut } = useShortcuts();

const isFormValid = computed(() => {
  return Boolean(form.value.name && form.value.href);
});

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

async function createShortcut() {
  saveShortcut(form.value);
  form.value = { ...EMPTY_FORM };
}

function handleTextAreaEnter() {
  submitButtonRef.value?.focus();
  submitButtonRef.value?.click();
}
</script>

<template>
  <div id="user">
    <form @submit.prevent="createShortcut">
      <p>
        Crie o atalho para o recurso que deseja compartilhar. Use um termo fácil
        de memorizar e que tenha a ver com o conteúdo.
      </p>

      <div class="form-shortcut-name">
        <span>goto/</span>
        <input type="text" placeholder="atalho" v-model="form.name" />
      </div>

      <div class="form-shortcut-href">
        <textarea
          placeholder='URL para onde este atalho redireciona
(por exemplo: "https://rdstation.com")'
          rows="3"
          v-model="form.href"
          @keydown.enter.prevent="handleTextAreaEnter"
        />
      </div>

      <button ref="submitButtonRef" type="submit" :disabled="!isFormValid">
        Criar Atalho
      </button>
    </form>

    <view-header
      title="Meus Atalhos"
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
            can-delete
            can-edit
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
#user {
}

form {
  $fistColumnWidth: 60px;

  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background-color: var(--color-background-soft);
  padding: 2rem;

  & > p {
    max-width: 620px;
    font-size: 150%;
  }

  input,
  textarea {
    transition: border-color 400ms;
    flex: 1;
    resize: vertical;

    outline: 0;
    border: 1px solid var(--color-border);
    border-radius: 1.5rem;
    background-color: #f0f0f0;
    padding: 0.5rem 1rem;

    color: #333;
    font: inherit;

    &:hover {
      &::placeholder {
        opacity: 0.75;
      }
    }

    &:focus {
      border-color: var(--color-main);

      &::placeholder {
        opacity: 0;
      }
    }

    &::placeholder {
      transition: opacity 300ms;
      opacity: 0.5;
    }
  }

  .form-shortcut-name {
    display: flex;
    align-items: center;

    margin-top: 2rem;
    font-family: monospace;
    font-size: 125%;
    font-weight: 700;

    span {
      display: block;
      width: $fistColumnWidth;
      color: var(--color-main);
      font: inherit;
    }

    input {
      max-width: 300px;
    }
  }

  .form-shortcut-href {
    margin-top: 1rem;
    padding-left: $fistColumnWidth;

    font-family: monospace;
    font-size: 125%;
    font-weight: 700;

    textarea {
      width: 100%;
    }
  }

  button[type='submit'] {
    align-self: flex-start;
    margin-top: 1rem;
    margin-left: $fistColumnWidth;

    border: 0;
    border-radius: 1.5rem;
    background: var(--color-main);
    padding: 0.5rem 1rem;

    color: white;
    font-size: 125%;
    font-weight: 700;

    &:disabled {
      transition: all 300ms;
      opacity: 0.4;
      background-color: var(--vt-c-indigo);
    }

    &:not(:disabled) {
      cursor: pointer;

      &:hover,
      &:focus {
        filter: brightness(85%);
      }

      &:focus-visible {
        outline: 1px solid var(--color-main);
        outline-offset: 2px;
      }
    }
  }
}

ul {
  padding: 0;

  li {
    margin-top: 1rem;
  }
}
</style>
