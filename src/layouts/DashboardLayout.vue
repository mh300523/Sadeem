<template>
    <Navbar />
    <main>
        <RouterView />
    </main>
</template>

<script setup>
import Navbar from '../components/layout/Navbar.vue';
import { RouterView } from 'vue-router'
</script>