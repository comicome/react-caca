import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            output: [],
            outputSeries: '',
        };
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

    onKeyUp = (event) => {
        let seriesTitleSearchValue = event.target.value.toLowerCase().trim();
        let matchingSeries = [];

            /*  si le champ recupéré est vide ben ca sert a rien de faire  */
            if (seriesTitleSearchValue.length !== 0) {
                 matchingSeries = this.state.seriesList.filter(
                    a => a.seriesName.toLowerCase().trim().indexOf(seriesTitleSearchValue) > -1
                    );
                }

            let output = [];
            // boucle sur le tableau des series qui correspondent
            for (let matchingSerie of matchingSeries) {
                let matchingSerieEpisodesLists = this.state.seriesEpisodesList.filter(
                    b => b.serie_id === matchingSerie.id
                );
                    //on cree un tableau avec deux clés dans lequel on met les valeurs correspondantes
                    //on veut que la première liste
                    output.push({
                        'title': matchingSerie.seriesName,
                        'episodes': matchingSerieEpisodesLists[0].episodes_list
                    });
                    this.setState({ output: output})
                }
        }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <h1>Entrez le nom d'une série :</h1>
                        <input
                            type="text" onKeyUp={this.onKeyUp}/>
                    </label>
                    {this.state.output.length ?
                        this.state.output.map((serie) => (
                            <li key={serie.title}>
                                {serie.title}
                                <ul>
                                    {serie.episodes.map((episode) =>
                                        <li key={episode.episodeName}>
                                            {episode.episodeName}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        ))
                        :
                        <li>Chargement...</li>
                    }
                </form>
            </div>
        )
    }
}


export default App;
