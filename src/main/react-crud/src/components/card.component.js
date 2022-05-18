import React, { Component } from "react";
import {useParams} from "react-router-dom";
import CardDataService from "../services/card.service";

export function withRouter(Children){
    return(props)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onChangeStarted = this.onChangeStarted.bind(this);
        this.onChangeFinished = this.onChangeFinished.bind(this);
        this.getCard = this.getCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.state = {
            currentCard: {
                id: null,
                name: "",
                description: "",
                tag: "",
                started: "",
                finished: ""
            },
            message: ""
        };
    }

    componentDidMount() {

        this.getCard(this.props.match.params.id);

    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCard: {
                    ...prevState.currentCard,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCard: {
                    ...prevState.currentCard,
                    description: description
                }
            };
        });
    }

    onChangeTag(e) {
        const tag = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCard: {
                    ...prevState.currentCard,
                    tag: tag
                }
            };
        });
    }

    onChangeStarted(e) {
        const started = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCard: {
                    ...prevState.currentCard,
                    started: started
                }
            }
        });
    }

    onChangeFinished(e) {
        const finished = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCard: {
                    ...prevState.currentCard,
                    finished: finished
                }
            }
        });
    }

    getCard(id) {
        CardDataService.get(id)
            .then(response => {
                this.setState({
                    currentCard: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateCard() {
        console.log(this.state.currentCard);
        CardDataService.update(
            this.state.currentCard.id,

            this.state.currentCard
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Card was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCard() {
        CardDataService.delete(this.state.currentCard.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Card was deleted successfully!"
                });

            })
            .catch(e => {
                console.log(e);
            });
    }
    render () {
        const { currentCard } = this.state;
        return (
            <div>
                {currentCard ? (
                    <div className="edit-form boardCard boardEdit">
                        <h4 className="title-center">Card Edit</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentCard.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentCard.description}
                                    onChange={this.onChangeDescription}
                                />

                            </div>
                            <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                value={currentCard.tag}
                                onChange={this.onChangeTag}
                            />
                            </div>
                            <div className="form-group">
                                <label htmlFor="started">Created</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="started"
                                    value={currentCard.started}
                                    onChange={this.onChangeStarted}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="finished">Finished</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="started"
                                    value={currentCard.finished}
                                    onChange={this.onChangeFinished}
                                    />
                            </div>

                        </form>


                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateCard}
                        >
                            Update
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={this.deleteCard}
                        >
                            Delete
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Card...</p>
                    </div>
                )}
            </div>
        );
    }
}
export default withRouter(Card);