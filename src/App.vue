<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import profesorskiServis from '../servisi/ProfesorskiServis';
import ProfesoriLista from './components/profesori/ProfesoriLista.vue';

const profesori = ref([]);

onMounted(() => {
    dohvatiProfesore();
})



let dohvatiProfesore = () => {
    axios.get('http://pabp.viser.edu.rs:8000/api/Profesors')    
    .then(response => {
        profesori.value = response.data;
        console.log(profesori);
    })
    .catch(error => {
        alert(error);
    })
}

const pretragaPojam = ref('');

const filtriraniProfesori = computed(() => {

  const pojamMala = pretragaPojam.value.toLowerCase().trim();

  if(!pojamMala) {
    return profesori.value;
  }

  return profesori.value.filter(profesor =>{
    const ime = profesor.ime?.toLowerCase().trim() || '';
    const prezime = profesor.prezime?.toLowerCase().trim() || '';
    const zvanje = profesor.zvanje?.toLowerCase().trim() || '';
    const datumZap = profesor.datumZap || '';

    return ime.includes(pojamMala) || 
    prezime.includes(pojamMala) || 
    zvanje.includes(pojamMala) || 
    datumZap.includes(pretragaPojam.value);
  })
  
})


</script>

<template>
  <div>
      <h4>Pretraga profesora</h4> 
      <input type="text" v-model="pretragaPojam" placeholder="Unesi pojam pretrage">
  </div>


 <ProfesoriLista :profesori="filtriraniProfesori" @osvezi-listu = "dohvatiProfesore" />
 </template>

<style scoped>
</style>
