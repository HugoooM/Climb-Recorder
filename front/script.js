new Vue({
    el: '#app',
    data: {
        personnes: [],
        voies: [],
        blocs: [],
        personneSelectionnee: null,
        voieSelectionnee: null,
        tmp: []
    },
    mounted() {
        // appel de l'API pour récupérer les données des users et des voies
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/auth/get', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.personnes = data)
            .catch(error => console.error('Erreur lors de la requête:', error));

        fetch('http://localhost:3000/api/voies', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const promises = [];
                data.forEach((voie, index) => {
                    const request = fetch('http://localhost:3000/api/auth/' + voie.ouvreur, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data2 => {
                            data[index].nomOuvreur = data2.name + ' ' + data2.firstname;
                        });
                    promises.push(request);
                });

                Promise.all(promises)
                    .then(() => {
                        this.voies = data;
                    });
            })
            .catch(error => console.error('Erreur lors de la requête:', error));

        fetch('http://localhost:3000/api/blocs', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const promises = [];
                data.forEach((bloc, index) => {
                    const request = fetch('http://localhost:3000/api/auth/' + bloc.ouvreur, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data2 => {
                            data[index].nomOuvreur = data2.name + ' ' + data2.firstname;
                        });
                    promises.push(request);
                });

                Promise.all(promises)
                    .then(() => {
                        this.blocs = data;
                    });
            })
            .catch(error => console.error('Erreur lors de la requête:', error));

    },
    methods: {
        getInitiateurIcon: function (estInitiateur) {
            return estInitiateur ? 'check.png' : 'notCheck.png';
        },

        getNumLicence: function (numLicence) {
            return numLicence ? numLicence : 'noLicence.png';
        },

        selectPersonne: function (personne) {
            this.personneSelectionnee = personne;
            window.location.href = "infoPersonne.html?id=" + personne._id;
        },

        selectVoie: function (voie) {
            this.voieSelectionnee = voie;
            window.location.href = "infoVoie.html?id=" + voie._id;
        },
        selectBloc: function (bloc) {
            this.voieSelectionnee = bloc;
            window.location.href = "infoBloc.html?id=" + bloc._id;
        }
    }
});