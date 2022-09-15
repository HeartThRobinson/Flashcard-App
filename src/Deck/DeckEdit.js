import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api/index";

function DeckEdit() {
    //Hooks for deck state, name, description
    const [deck, setDeck] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const { deckId } = useParams();
    const history = useHistory();

    //Handlers for name and description changes
    const nameHandler = (event) => setName(event.target.value);
    const descHandler = (event) => setDesc(event.target.value);

    //Load the correct deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
                setName(allCards.name)
                setDesc(allCards.description);
            }
            catch (error) {
                console.log("Failed to load deck to edit")
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
        updateDeck({
            ...deck,
            name: name,
            description: desc,
        })
        .then((newDeck) => history.push(`/decks/${newDeck.id}`))
    }

    return (
        //Form for editing  
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <Link to={`/decks/${deck.id}`}> {deck.name}</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}> Edit Deck</p>
                    </div>
                </nav>
            </div>

            <h2>Edit: {deck.name}</h2>

            <form onSubmit={submitHandler}>
                <div className="column">
                    <h4>Deck Name:</h4>
                    <input
                        id="name"
                        type="text"
                        required
                        onChange={nameHandler}
                        value={name}
                    />
                    <br />
                    <h4>Deck Description:</h4>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="4"
                            required
                            onChange={descHandler}
                            value={desc}
                        ></textarea>
                    <br />
                </div>

                <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}`)}>
                    Cancel
                </button>

                <button type="submit" style={{ marginRight: 20 }} className="btn btn-success">
                    Submit
                </button>
            </form>
        </>
    );
}

export default DeckEdit;