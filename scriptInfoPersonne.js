new Vue({
    el: '#app',
    data: {
        personne: [],
        voies: []
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

            });
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
            fetch(`http://localhost:3000/personnes/switchInitiateur/${personne}`)
                .then(response => response.json())
                .then(data => {
                });
            window.location.reload();
        }
    }
});




