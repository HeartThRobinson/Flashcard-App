import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

import CardForm from "./CardForm";

function CardAdd() {
    //Hooks to set deck and front/back
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const { deckId } = useParams();

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
                <CardForm front={front} back={back} setFront={setFront} setBack={setBack} submitHandler={submitHandler} deck={deck} />
            </div>
        </>
    );
}

export default CardAdd;