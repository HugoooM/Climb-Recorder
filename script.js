new Vue({
    el: '#app',
    data: {
        personnes: []
    },
    mounted() {
        // appel de l'API pour récupérer les données
        fetch('http://localhost:3000/personnes')
            .then(response => response.json())
            .then(data => {
                this.personnes = data;
            });
    },
    methods: {
        getInitiateurIcon: function(estInitiateur) {
            return estInitiateur ? 'check.png' : 'notCheck.png';
        }
    }
});
