<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import ProfesoriRed from './ProfesoriRed.vue';

const props = defineProps({
    profesori: Array,
    required: true
})

</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Zvanje</th>
            </tr>
        </thead>
        <tbody>
            <ProfesoriRed v-for="profesor in profesori" :profesor="profesor" :key="profesor.idProfesora" @osvezi-listu="$emit('osvezi-listu')"/>
        </tbody>       
    </table>
</template>

<style scoped>
</style>