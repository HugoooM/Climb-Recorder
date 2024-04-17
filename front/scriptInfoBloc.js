new Vue({
    el: '#app',
    data: {
        bloc: [],
        personne: [],
        grimpesBloc: []
    },
    mounted() {
        const idBloc = new URLSearchParams(window.location.search).get('id');
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/api/blocs/' + idBloc, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const promises = [];
                const request = fetch('http://localhost:3000/api/auth/' + data.ouvreur, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data2 => {
                        data.nomOuvreur = data2.name + ' ' + data2.firstname;
                    });
                promises.push(request);

                Promise.all(promises)
                    .then(() => {
                        this.bloc = data;
                    });
            })
            .catch(error => console.error('Erreur lors de la requête:', error));


        async function getName(grimpeur) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/' + grimpeur, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                return data.name + ' ' + data.firstname;
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
                throw error; // Rejeter la promesse en cas d'erreur
            }
        }

        async function fetchDataAndAssignNames() {
            try {
                const response = await fetch('http://localhost:3000/api/grimpeBloc/bloc/' + idBloc, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données de grimpe');
                }
                const data = await response.json();

                await Promise.all(data.map(async (grimpe) => {
                    grimpe.nomGrimpeur = await getName(grimpe.grimpeur);
                }));

                this.grimpesBloc = data;
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            }
        }

        fetchDataAndAssignNames.call(this);


    },
    methods: {
        selectPersonne: function (personne) {
            this.personneSelectionnee = personne;
            window.location.href = "infoPersonne.html?id=" + personne;
        },
        deleteBloc: function (voie) {
            const idBloc = new URLSearchParams(window.location.search).get('id');
            const token = localStorage.getItem('token');
            fetch('http://localhost:3000/api/blocs/' + idBloc, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => this.personnes = data)
                .catch(error => console.error('Erreur lors de la requête:', error));
        },
        formatDate : function (dateString){
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        selectGrimpeur: function (grimpeBloc) {
            window.location.href = "infoPersonne.html?id=" + grimpeBloc.grimpeur;
        }
    }
});





