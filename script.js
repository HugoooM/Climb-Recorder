new Vue({
    el: '#app',
    data: {
        personnes: [],
        voies: [],
        personneSelectionnee: null,
        tmp: []
    },
    mounted() {
        // appel de l'API pour récupérer les données
        fetch('http://localhost:3000/personnes')
            .then(response => response.json())
            .then(data => {
                this.personnes = data;
            });

        fetch('http://localhost:3000/voies')
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
        }
    }
});