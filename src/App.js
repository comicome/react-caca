import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            value: '',
            output: [],
            outputSeries: '',
            matchingSerie: '',
        };
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {

        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
                fetch('seriesEpisodesList.json',{})
                    .then(response => response.json())
                    .then(seriesEpisodesListDepuisFichier => {
                        this.setState({seriesEpisodesList: seriesEpisodesListDepuisFichier});
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /*alert("j'ai fait ce que j'ai pu");*/
            });
    }

    onChange(event) {
        //on met la valeur du champ dans la variable value
        this.setState({
            value: event.target.value
        });
        let seriesTitleSearchValue = this.state.value
            .toLowerCase() // transforme en minuscule
            .trim(); // enleve les blancs au debut et fin de chaine
            /*
                si le champ recupéré est vide ben ca sert a rien de faire
             */
        if (seriesTitleSearchValue !== "") {
            let matchingSeries = this.state.seriesList.filter(
                (a) => (a.seriesName.toLowerCase().trim().indexOf(seriesTitleSearchValue) > -1)
            );
            // boucle sur le tableau des series qui correspondent
            for (this.state.matchingSerie of matchingSeries) {
                this.setState({outputSeries: this.state.matchingSerie.seriesName});


                let matchingSerieEpisodesLists = this.state.seriesEpisodesList.filter(
                    b => b.serie_id === this.state.matchingSerie.id
                );
                /*
                    on sait que dans tous les cas un tableau est retourné
                    mais on ne souhaite que la premiere liste de listes
                */
                if (matchingSerieEpisodesLists.length) {
                    let matchingSerieEpisodesList = matchingSerieEpisodesLists[0];
                    // boucle sur le tableau des listes d'episode qui correspondent
                    for (let episode of matchingSerieEpisodesList.episodes_list) {
                        this.state.output += episode.episodeName;
                    }
            }
            }
        }
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <h1>Entrez le nom d'une série :</h1>
                        <input
                            type="text" value={this.state.value} onChange={this.onChange}/>
                    </label>
                    {this.state.value !== "" ?
                    <h2>Nom de la série : {this.state.outputSeries}</h2>
                        : <h2>Chargement...</h2>
                    }
                    <h3>Episodes : </h3>
                    {this.state.value !== "" ?
                        <li>{this.state.output}</li>
                                            :
                        <li>Chargement...</li>
                    }
                </form>
            </div>
        )
    }
}


export default App;
