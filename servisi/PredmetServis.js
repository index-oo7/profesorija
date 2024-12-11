import apiClient from './api';

const predmetServis = { 

    dohvatiPredmete() {
        return apiClient.get('/Predmets');
    },
};

export default predmetServis;