new Vue({
    el: '#app',
    data: {
        voie: [],
        personne: [],
    },
    mounted() {
        // Récupérer l'identifiant de la voie depuis l'URL
        const idVoie = new URLSearchParams(window.location.search).get('id');

        // Appel de l'API pour récupérer les informations de la voie correspondante
        fetch(`http://localhost:3000/voies/${idVoie}`)
            .then(response => response.json())
            .then(data => {
                this.voie = data;
            });

        fetch(`http://localhost:3000/voies/grimpeepar/${idVoie}`)
            .then(response => response.json())
            .then(data => {
                this.personne = data;
            });
    },
    methods: {
        selectPersonne: function (personne) {
            this.personneSelectionnee = personne;
            window.location.href = "infoPersonne.html?id=" + personne;
        },
        deleteVoie: function (voie) {
            fetch(`http://localhost:3000/voies/remove/${voie}`)
                .then(response => response.json())
                .then(data => {
                    window.location.href = "index.html";
                });
            window.location.href = "index.html";
        }
    }
});





