<template>
    <div class="drawer drawer-end" :class="{ open: isOpen }">
        <div class="drawer-content">
            <div class="drawer-header">
                <h4 class="drawer-title">Боковая панель</h4>
                <button class="btn btn-icon btn-ghost" @click="toggle">
                    <i class="bi bi-x"></i>
                </button>
            </div>
            <div class="drawer-body">
                <p>Здесь будет содержимое вашей боковой панели.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(false);

const toggle = () => {
    isOpen.value = !isOpen.value;
};
</script>
