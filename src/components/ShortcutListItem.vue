<script setup lang="ts">
type ShortcutListItemProps = {
  href: string;
  name: string;
  description?: string;
  icon?: string;
  canDelete?: boolean;
  canEdit?: boolean;
};

defineProps<ShortcutListItemProps>();
</script>

<template>
  <li class="shortcut-list-item">
    <div class="texts">
      <a :href="href" :title="href" target="_blank">{{ name }}</a>

      <p v-if="description">{{ description }}</p>
    </div>

    <div class="actions">
      <button v-if="canEdit" type="button">
        <span class="material-symbols-outlined">edit</span>
      </button>

      <button v-if="canDelete" type="button">
        <span class="material-symbols-outlined">delete_forever</span>
      </button>

      <a :href="href" :title="href" target="_blank">
        <span class="material-symbols-outlined">ungroup</span>
      </a>
    </div>
  </li>
</template>

<style scoped lang="scss">
.shortcut-list-item {
  list-style: none;
  display: flex;
  gap: 1rem;

  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1rem;

  &:hover,
  &:focus-within {
    button {
      opacity: 1;
    }
  }
}

.texts {
  flex: 1;

  a {
    border-radius: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin-top: 1rem;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;

  button,
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  button {
    transition: opacity 300ms;
    opacity: 0;
    cursor: pointer;

    height: 2rem;
    width: 2rem;
    border: 0;
    border-radius: 50%;
    background-color: transparent;

    &:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }

    &:hover,
    &:focus-visible {
      span {
        color: hsla(160, 100%, 37%, 1);
      }
    }

    span {
      color: var(--color-text);
      font-size: 1.5rem;
    }
  }

  a {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;

    span {
      font-size: 2rem;
    }
  }
}
</style>
