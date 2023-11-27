new Vue({
    el: '#app',
    data: {
        voie: [],
    },
    mounted() {
        // Récupérer l'identifiant de la voie depuis l'URL
        const idVoie = new URLSearchParams(window.location.search).get('id');

        // Appel de l'API pour récupérer les informations de la personne correspondante
        fetch(`http://localhost:3000/voies/${idVoie}`)
            .then(response => response.json())
            .then(data => {
                this.voie = data;
            });
    },
    methods: {
        selectPersonne: function (personne) {
            this.personneSelectionnee = personne;
            window.location.href = "infoPersonne.html?id=" + personne;
        }
    }
});




