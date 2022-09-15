import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function CardAdd() {
    //Hooks to set deck and front/back
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const { deckId } = useParams();
    const history = useHistory();

    //Load the correct deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
            }
            catch (error) {
                console.log("Failed to load card in 'CardAdd'")
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId])

    //Submit handler
    const submitHandler = (event) => {
        event.preventDefault();
        createCard(deckId, {
            front: front,
            back: back,
        });
        setFront("");
        setBack("");
    }

    const frontHandler = (event) => setFront(event.target.value);
    const backHandler = (event) => setBack(event.target.value);

    return (
        //Form to add card
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <Link to={`/decks/${deck.id}`}> {deck.name}</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}> Add Card</p>
                    </div>
                </nav>
            </div>

            <h2>{deck.name}: Add Card</h2>

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

export default CardAdd;