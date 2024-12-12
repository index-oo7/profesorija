<script setup>
import { ref } from 'vue';
import axios from 'axios';

props = defineProps({
    profesor: Object,
    required: true
})

const profesorId = ref(null);
const zapisnici = ref([]);
const prikazStudenata = ref(false);

const prikaziZapisnike = (idProfesora) => {
    profesorId.value = idProfesora;

    axios.get(`http://pabp.viser.edu.rs:8000/api/IspitniRoks`)
        .then(response => {
            zapisnici.value = response.data.filter(ispit =>
                ispit.idPredmetaNavigation?.idProfesora === idProfesora
            );
        })
        .catch(error => {
            console.error("Greska prilikom dohvatanja zapisnika:", error);
        });
};



const studenti = ref([]); 
const statistika = ref({});

const prikaziStudente = (zapisnik) => {
    prikazStudenata.value = true;

    
    studenti.value = zapisnik.zapisniks.map(z => ({
        ime: z.idStudentaNavigation?.ime,
        prezime: z.idStudentaNavigation?.prezime,
        ocena: z.ocena,
    }));

    const ocene = studenti.value.map(s => s.ocena);
    statistika.value = {
        prosek: (ocene.reduce((a, b) => a + b, 0) / ocene.length).toFixed(2),
        max: Math.max(...ocene),
        min: Math.min(...ocene),
    };
};

</script>

<template>

  <div>
    <button @click="prikaziZapisnike(profesor.idProfesora)">Prikaži zapisnike</button>
    <ul v-if="zapisnici.length">
      <li v-for="zapisnik in zapisnici" :key="zapisnik.idIspita">
        Ispit: {{ zapisnik.idPredmetaNavigation?.naziv }} - Datum: {{ zapisnik.datum }}
        <button @click="prikaziStudente(zapisnik)">Prikaži studente</button>
      </li>
    </ul>
  </div>

  <div v-if="prikazStudenata">
  <h3>Spisak studenata</h3>
  <ul>
    <li v-for="student in studenti" :key="student.ime">
      {{ student.ime }} {{ student.prezime }} - Ocena: {{ student.ocena }}
    </li>
  </ul>

  <h3>Statistika</h3>
  <p>Prosečna ocena: {{ statistika.prosek }}</p>
  <p>Najviša ocena: {{ statistika.max }}</p>
  <p>Najniža ocena: {{ statistika.min }}</p>
</div>
</template>
