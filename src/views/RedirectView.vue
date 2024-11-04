<script setup lang="ts">
type RedirectViewProps = {
  target: string;
};

defineProps<RedirectViewProps>();
</script>

<template>
  <div id="redirect">
    <h1>💩</h1>

    <p>
      Ops! O atalho <kbd class="green">{{ target }}</kbd> não leva a lugar
      nenhum.
    </p>

    <RouterLink to="/">Criar Atalho</RouterLink>
  </div>
</template>

<style scoped lang="scss">
#redirect {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 10rem;
}

kbd {
  border: solid 1px currentColor;
  border-radius: 4px;
  padding: 1px 2px;
  font-weight: 700;
}

a {
  margin-top: 4rem;
  border: solid 1px currentColor;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  font-weight: 700;

  &:hover {
    border-color: transparent;
  }
}
</style>
