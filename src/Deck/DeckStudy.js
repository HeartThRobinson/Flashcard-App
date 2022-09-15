import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

import CardList from "../Cards/CardList";

function DeckStudy() {
    //Hooks
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [count, setCount] = useState(0);
    const { deckId } = useParams();

    //Load the correct deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
                setCount(allCards.cards.length);
                setCards(allCards.cards);
            }
            catch (error) {
                console.log("Failed to load study deck")
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId])

    return (
      //Display correct card and card index
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <Link to={`/decks/${deck.id}`}> {deck.name}</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}> Study</p>
                    </div>
                </nav>
            </div>
            <div>
                <h2>{deck.name}: Study</h2>
                <div>
                    <CardList deck={deck} cards={cards} count={count} />
                </div>
            </div>
        </>
    );
}

export default DeckStudy;