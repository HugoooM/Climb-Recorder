new Vue({
    el: '#app',
    data: {
        personne: {}
    },
    mounted() {
        // Récupérer l'identifiant de la personne depuis l'URL
        const idPersonne = new URLSearchParams(window.location.search).get('id');

        // Appel de l'API pour récupérer les informations de la personne correspondante
        fetch(`http://localhost:3000/personnes/${idPersonne}`)
            .then(response => response.json())
            .then(data => {
                this.personne = data;
            });
    },
    methods: {
        getInitiateurIcon: function(estInitiateur) {
            return estInitiateur ? 'check.png' : 'notCheck.png';
        },

        getNumLicence: function(numLicence) {
            return numLicence ? numLicence : 'noLicence.png';
        }
    }
});
