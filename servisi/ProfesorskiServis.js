import apiClient from './api';

const profesorskiServis = {

  dohvatiProfesore() {
    return apiClient.get('/Profesors');
  },

  dohvatiDetaljeProfesora(idProfesora) {
    return apiClient.get(`/Profesors/${idProfesora}`);
  },

  izmeniProfesora(idProfesora, izmenjeniProfesor) {
    return apiClient.put(`/Profesors/${idProfesora}`, izmenjeniProfesor);
  },
};

export default profesorskiServis;
