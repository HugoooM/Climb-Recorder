new Vue({
    el: '#app',
    data: {
        personne: [],
        voies: [],
        grimpes: []
    },
    mounted() {
        // Récupérer l'identifiant de la personne depuis l'URL
        const idPersonne = new URLSearchParams(window.location.search).get('id');
        const token = localStorage.getItem('token');
        // Appel de l'API pour récupérer les informations de la personne correspondante
        fetch('http://localhost:3000/api/auth/' + idPersonne, {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response =>response.json())
            .then(data => this.personne = data)
            .catch(error => console.error('Erreur lors de la requête:', error));

        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/grimpe/user/` + idPersonne, {
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                this.grimpes = data;
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            }
        }

        fetchData.call(this).then(() => {
            if (this.grimpes.length>0){
                const ctx = document.getElementById("nbVoies");
                const nbVoies = [0, 0, 0, 0, 0, 0];

                for (let i = 0; i < this.grimpes.length; i++) {
                    if (parseInt(this.grimpes[i].voie.cotation.charAt(0)) < 5 || this.grimpes[i].voie.cotation === '5a') {
                        nbVoies[0]++;
                    } else if (this.grimpes[i].voie.cotation === '5b') {
                        nbVoies[1]++;
                    } else if (this.grimpes[i].voie.cotation === '5c') {
                        nbVoies[2]++;
                    } else if (this.grimpes[i].voie.cotation === '6a') {
                        nbVoies[3]++;
                    } else if (this.grimpes[i].voie.cotation === '6b') {
                        nbVoies[4]++;
                    } else if (parseInt(this.grimpes[i].voie.cotation.charAt(0)) > 6 || this.grimpes[i].voie.cotation === '6c') {
                        nbVoies[5]++;
                    }
                }

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['≤5a', '5b', '5c', '6a', '6b', '≥6c'],
                        datasets: [{
                            label: 'Nombre de voies par cotation',
                            data: nbVoies,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
            else{
                const voiesChartDiv = document.getElementById('voiesChart');
                const pElement = document.createElement('p');

                pElement.textContent = 'Aucune voie réalisée.';
                voiesChartDiv.appendChild(pElement);
            }


            if (this.grimpes.length>0){
                const ctx = document.getElementById("dernieresVoies");
                const nbVoies = [0, 0, 0, 0, 0, 0];
                for (let i = this.grimpes.length-1; i > this.grimpes.length - 6 && i>=0; i--) {

                    if (parseInt(this.grimpes[i].voie.cotation.charAt(0)) < 5 || this.grimpes[i].voie.cotation === '5a') {
                        nbVoies[0]++;
                    } else if (this.grimpes[i].voie.cotation === '5b') {
                        nbVoies[1]++;
                    } else if (this.grimpes[i].voie.cotation === '5c') {
                        nbVoies[2]++;
                    } else if (this.grimpes[i].voie.cotation === '6a') {
                        nbVoies[3]++;
                    } else if (this.grimpes[i].voie.cotation === '6b') {
                        nbVoies[4]++;
                    } else if (parseInt(this.grimpes[i].voie.cotation.charAt(0)) > 6 || this.grimpes[i].voie.cotation === '6c') {
                        nbVoies[5]++;
                    }
                }
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['≤5a', '5b', '5c', '6a', '6b', '≥6c'],
                        datasets: [{
                            label: 'Nombre de voies par cotation',
                            data: nbVoies,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
            else{
                const voiesChartDiv = document.getElementById('dernieresVoiesChart');
                const pElement = document.createElement('p');

                pElement.textContent = 'Aucune voie réalisée.';
                voiesChartDiv.appendChild(pElement);
            }

        })




        /*
        fetch(`http://localhost:3000/voies/dernieres/${idPersonne}`)
            .then(response => response.json())
            .then(data => {
                this.voies = data;

                if (this.voies.length > 0) {
                    const ctx = document.getElementById('dernieresVoies');

                    const nbVoies = [0, 0, 0, 0, 0, 0];

                    for (let i = 0; i < this.voies.length; i++) {
                        if (parseInt(this.voies[i].niveau.charAt(0)) < 5 || this.voies[i].niveau === '5a') {
                            nbVoies[0]++;
                        } else if (this.voies[i].niveau === '5b') {
                            nbVoies[1]++;
                        } else if (this.voies[i].niveau === '5c') {
                            nbVoies[2]++;
                        } else if (this.voies[i].niveau === '6a') {
                            nbVoies[3]++;
                        } else if (this.voies[i].niveau === '6b') {
                            nbVoies[4]++;
                        } else if (parseInt(this.voies[i].niveau.charAt(0)) > 6 || this.voies[i].niveau === '6c') {
                            nbVoies[5]++;
                        }
                    }

                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['≤5a', '5b', '5c', '6a', '6b', '≥6c'],
                            datasets: [{
                                label: 'Nombre de voies par cotation',
                                data: nbVoies,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                } else {
                    const voiesChartDiv = document.getElementById('dernieresVoiesChart');

                    const imgElement = document.createElement('img');

                    const pElement = document.createElement('p');

                    pElement.textContent = 'Aucune voie réalisée';

                    imgElement.src = 'notCheck.png';

                    imgElement.alt = 'Aucune voie réalisée';

                    voiesChartDiv.style.position = 'relative';

                    imgElement.style.position = 'absolute';
                    imgElement.style.top = '50%';
                    imgElement.style.left = '50%';
                    imgElement.style.transform = 'translate(-50%, -50%)';

                    pElement.style.position = 'absolute';
                    pElement.style.top = '60%';
                    pElement.style.left = '50%';
                    pElement.style.transform = 'translate(-50%, -50%)';

                    voiesChartDiv.appendChild(imgElement);
                    voiesChartDiv.appendChild(pElement);

                }

            });

        fetch(`http://localhost:3000/voies/realisees/${idPersonne}`)
            .then(response => response.json())
            .then(data => {
                this.voies = data;

                if (this.voies.length > 0) {
                    const ctx = document.getElementById('nbVoies');

                    const nbVoies = [0, 0, 0, 0, 0, 0];

                    for (let i = 0; i < this.voies.length; i++) {
                        if (parseInt(this.voies[i].niveau.charAt(0)) < 5 || this.voies[i].niveau === '5a') {
                            nbVoies[0]++;
                        } else if (this.voies[i].niveau === '5b') {
                            nbVoies[1]++;
                        } else if (this.voies[i].niveau === '5c') {
                            nbVoies[2]++;
                        } else if (this.voies[i].niveau === '6a') {
                            nbVoies[3]++;
                        } else if (this.voies[i].niveau === '6b') {
                            nbVoies[4]++;
                        } else if (parseInt(this.voies[i].niveau.charAt(0)) > 6 || this.voies[i].niveau === '6c') {
                            nbVoies[5]++;
                        }
                    }

                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['≤5a', '5b', '5c', '6a', '6b', '≥6c'],
                            datasets: [{
                                label: 'Nombre de voies par cotation',
                                data: nbVoies,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                } else {
                    const voiesChartDiv = document.getElementById('voiesChart');

                    const imgElement = document.createElement('img');

                    const pElement = document.createElement('p');

                    pElement.textContent = 'Aucune voie réalisée';

                    imgElement.src = 'notCheck.png';

                    imgElement.alt = 'Aucune voie réalisée';

                    voiesChartDiv.style.position = 'relative';

                    imgElement.style.position = 'absolute';
                    imgElement.style.top = '50%';
                    imgElement.style.left = '50%';
                    imgElement.style.transform = 'translate(-50%, -50%)';

                    pElement.style.position = 'absolute';
                    pElement.style.top = '60%';
                    pElement.style.left = '50%';
                    pElement.style.transform = 'translate(-50%, -50%)';

                    voiesChartDiv.appendChild(imgElement);
                    voiesChartDiv.appendChild(pElement);

                }

            });*/
    },
    methods: {
        getInitiateurIcon: function (estInitiateur) {
            return estInitiateur ? 'check.png' : 'notCheck.png';
        },

        getNumLicence: function (numLicence) {
            return numLicence ? numLicence : 'noLicence';
        },

        deletePersonne: function (personne) {
            fetch(`http://localhost:3000/personnes/remove/${personne}`)
                .then(response => response.json())
                .then(data => {
                    window.location.href = "index.html";
                });
            window.location.href = "index.html";
        },
        switchInitiateur: function (personne) {
            fetch('http://localhost:3000/api/auth/initiateur/' + personne, {
                method: 'PUT',
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Erreur lors de la requête:', error));
            window.location.reload();
        },
        selectVoie: function (voie) {
            window.location.href = "infoVoie.html?id=" + voie;
        }
    }
});




