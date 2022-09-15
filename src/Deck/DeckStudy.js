import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

import CardList from "../Cards/CardList";

function DeckStudy() {
    //Hooks
    const [deck, setDeck] = useState({'Loading...'});
    const [cards, setCards] = useState([]);
    const [count, setCount] = useState(0);
    const { deckId } = useParams();

    //Load the correct deck
    useEffect(() => {
        setDeck({});
        const abortController = new AbortController();

        async function loadCard() {
            try {
                const allCards = await readDeck(deckId, abortController.signal);
                setDeck(allCards);
                setCards(allCards.cards);
                setCount(allCards.cards.length);
            }
            catch (error) {
                console.log("I'm sorry Dave, I'm afraid I can't do that")
            }
        }

        loadCard();

        return () => {
            abortController.abort;
        };
    }, [deckId])

    return (
      //Display correct card and card index
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home /</Link>
                        <Link to={`/decks/${deck.id}`}> {deck.name} /</Link>
                        <p style={{ color: 'grey' }}> Study</p>
                    </div>
                </nav>
            </div>
            <div>
                <h3>{deck.name}: Study</h3>
                <div>
                    <CardList deck={deck} cardCount={cardCount} cards={cards} />
                </div>
            </div>
        </>
    );
}