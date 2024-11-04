<script setup lang="ts">
type ShortcutListItemProps = {
  href: string;
  name: string;
  description?: string;
  icon?: string;
};

defineProps<ShortcutListItemProps>();
</script>

<template>
  <li class="shortcut-list-item">
    <a :href="href" :title="href" target="_blank">goto/{{ name }}</a>

    <p v-if="description">{{ description }}</p>
  </li>
</template>

<style scoped lang="scss">
.shortcut-list-item {
}
</style>
