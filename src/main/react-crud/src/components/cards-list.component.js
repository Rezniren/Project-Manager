import React, { Component } from "react";
import CardDataService from "../services/card.service";
import { Link } from "react-router-dom";




export default class CardsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveCards = this.retrieveCards.bind(this);


        this.generateTags = this.generateTags.bind(this);


        this.refreshList = this.refreshList.bind(this);
        this.setActiveCard = this.setActiveCard.bind(this);
        this.removeAllCards = this.removeAllCards.bind(this);
        this.searchName = this.searchName.bind(this);
        this.state = {
            cards: [],
            currentCard: null,
            currentIndex: -1,
            searchName: "",
            tags: []
        };

    }
    componentDidMount() {
        this.retrieveCards();
    }
    onChangeSearchName(e) {
        const searchName = e.target.value;
        this.setState({
            searchName: searchName
        });
    }
    retrieveCards() {
        CardDataService.getAll()
            .then(response => {
                this.setState({
                    cards: response.data

                });
                this.generateTags(response.data)
            })
            .catch(e => {
                console.log(e);
            });

    }

    generateTags(data) {
        CardDataService.getTags(data)
            .then(response => {
                this.setState({
                    tags: response.data
                });
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    refreshList() {
        this.retrieveCards();
        this.setState({
            currentCard: null,
            currentIndex: -1
        });
    }
    setActiveCard(card, index) {
        this.setState({
            currentCard: card,
            currentIndex: index
        });
    }
    removeAllCards() {
        CardDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    searchName() {
        CardDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    cards: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }

    render() {
        const { searchName, currentCard, currentIndex, tags} = this.state;
        let { cards } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                    <ul className="list-group">
                        {tags &&
                            tags.map((tag, index) => (
                                <li className="CategoryList" key={index}>

                                    <h4>{tag}</h4>

                                    <ul className="list-group">

                                    {cards &&
                                        cards.filter(card => card.tag === tag).map((card, indexed) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (tag + indexed === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveCard(card, tag + indexed)}
                                                key={tag + indexed}>

                                                {card.name}

                                            </li>
                                        ))}
                                </ul>
                                </li>
                            ))}
                    </ul>



                </div>
                <div className="col-md-6">
                    {currentCard ? (
                        <div className="boardCard">
                            <h4 className="title-center"><strong>{currentCard.name}</strong></h4>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentCard.description}
                            </div>
                            <br/>
                            {<div>
                                <label>
                                    <strong>Tag:</strong>
                                </label>{" "}
                                {currentCard.tag}
                            </div>}
                            <br/>
                            <div>
                                <label>
                                    <strong>Created:</strong>
                                </label>{" "}
                                {currentCard.started}
                            </div>
                            {(currentCard.finished !== "") ? (<div>
                                <label>
                                    <strong>Finished:</strong>
                                </label>{" "}
                                {currentCard.finished}
                            </div>): (<div/>)}

                            <br/>

                            <div className="card-edit">
                                <Link
                                to={"/board/" + currentCard.id}

                                className="badge badge-warning">
                                    Edit
                                </Link>
                            </div>


                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Card Name...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}