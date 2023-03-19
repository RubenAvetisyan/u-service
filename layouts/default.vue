<template>
  <main class="py-20 px-10 text-center">
      <div>
        <button class="btn btn-primary" @click="toggleSidebar">Открыть боковую панель</button>
        <Sidebar :isOpen="isOpen" @toggle="toggleSidebar" />
      </div>
    <slot />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>

<script setup>
const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>