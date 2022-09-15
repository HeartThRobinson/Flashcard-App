import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function CardEdit() {
    //Hooks
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [card, setCard] = useState({});
    const { deckId } = useParams();
    const { cardId } = useParams();
    const history = useHistory();

    //Load correct deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
            }
            catch (error) {
                console.log("Failed to load deck in 'DeckEdit'")
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId])

    //Load correct card
    useEffect(() => {
        const abortController = new AbortController();

        async function loadCard() {
            try {
                const theCard = await readCard(cardId, abortController.signal);
                setCard(theCard);
                setFront(theCard.front);
                setBack(theCard.back);
            }
            catch (error) {
                console.log("Failed to load card in 'CardEdit'")
            }
        }

        loadCard();

        return () => {
            abortController.abort();
        };
    }, [cardId])

    //Submit handler
    const submitHandler = (event) => {
        event.preventDefault();
        updateCard({
            ...card,
            front: front,
            back: back,
        })
            .then((theCardUpdate) => history.push(`/decks/${deck.id}`))
    }

    const frontHandler = (event) => setFront(event.target.value);
    const backHandler = (event) => setBack(event.target.value);

    return (
        //Form to edit card
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}> Edit Card {card.id}</p>
                    </div>
                </nav>
            </div>

            <h2>Edit Card</h2>
            <div>
                <form onSubmit={submitHandler}>
                    <div className="column">
                        <h4>Question:</h4>
                            <textarea
                                id="front"
                                rows="4"
                                placeholder="Front side of card"
                                required
                                onChange={frontHandler}
                                value={front}
                            ></textarea>
                        <br />
                        <h4>Answer:</h4>
                            <textarea
                                id="back"
                                rows="4"
                                placeholder="Back side of card"
                                required
                                onChange={backHandler}
                                value={back}
                            ></textarea>
                        <br />
                    </div>

                    <br />

                    <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}`)}>
                        Done
                    </button>
                    <button type="submit" style={{ marginRight: 20 }} className="btn btn-success">
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}

export default CardEdit;