new Vue({
    el: '#app',
    data: {
        personnes: [],
        voies: [],
        personneSelectionnee: null,
        voieSelectionnee: null,
        tmp: []
    },
    mounted() {
        // appel de l'API pour récupérer les données
        fetch('http://localhost:3000/personnes')
            .then(response => response.json())
            .then(data => {
                this.personnes = data;
            });

        fetch('http://localhost:3000/voies/ouvertes')
            .then(response => response.json())
            .then(data => {
                this.voies = data;
            });
    },
    methods: {
        getInitiateurIcon: function(estInitiateur) {
            return estInitiateur ? 'check.png' : 'notCheck.png';
        },

        getNumLicence: function(numLicence) {
            return numLicence ? numLicence : 'noLicence.png';
        },

        selectPersonne: function (personne) {
            this.personneSelectionnee = personne;
            window.location.href = "infoPersonne.html?id=" + personne.idPersonne;
        },

        selectVoie: function (voie) {
            this.voieSelectionnee = voie;
            window.location.href = "infoVoie.html?id=" + voie.idVoie;
        }
    }
});