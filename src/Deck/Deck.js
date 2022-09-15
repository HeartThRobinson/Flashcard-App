import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { deleteCard, deleteDeck } from "../utils/api/index";

function Deck() {
    //Set deck state
    const [deck, setDeck] = useState([]);
    const [cardSet, setCardSet] = useState([]);
    const { deckId } = useParams();
    const history = useHistory();

    let cards = "Loading...";

    //Load correct deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
                setCardSet(allCards.cards);
            }
            catch (error) {
                console.log("Failed to load deck in 'deck'")
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId])

    //Map cards in deck
    if (cardSet) {
        cards = cardSet.map((card) => {
            return (
                <div key={card.id}>
                    <div className="border border-dark">
                        <div>
                            <p>Front</p>
                            <p>{card.front}</p>
                        </div>
                        <div>
                            <p>Back</p>
                            <p>{card.back}</p>
                        </div>
                    </div>

                    <div>
                        <button style={{ marginRight: 20 }} className="btn btn-warning" onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}>
                            Edit
                        </button>

                        <button style={{ alignSelf: 'flex-end' }} className="btn btn-danger justify-content-end" onClick={() => {
                            if (window.confirm("Delete this Card? You will not be able to recover it.")) {
                                deleteCard(card.id)
                                    .then(window.location.reload())
                            };
                        }}>
                            Delete
                        </button>
                    </div>
                    <br />
                </div>
            );
        })
    }

    //Return Layout and buttons
    return (
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}>{ deck.name }</p>
                    </div>
                </nav>
            </div>

            <div className="header">
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
            </div>

            <div>
                <button style={{ marginRight: 20 }} className="btn btn-warning" onClick={() => history.push(`/decks/${deck.id}/edit`)}>
                    Edit
                </button>

                <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                    Study
                </button>

                <button style={{ marginRight: 20 }} className="btn btn-success" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                    Add Cards
                </button>

                <button style={{ alignSelf: 'flex-end' }} className="btn btn-danger" onClick={() => {
                    if (window.confirm("Delete this Deck? You will not be able to recover it.")) {
                        deleteDeck(deck.id)
                            .then((history.push(`/`)))
                            .then(window.location.reload())
                    };
                }}>
                    Delete
                </button>
            </div>

            <h2>Cards</h2>
            <div>{cards}</div>
        </>
    );
}

export default Deck;