import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";

function DeckList() {
    //Hooks
    const [decks, setDecks] = useState(['Loading...']);
    const history = useHistory();

    //Create/Load deck list
    useEffect(() => {
        setDecks({});
        const abortController = new AbortController();

        async function loadDecks() {
            try {
                const decks = await listDecks(deckAbort.signal);
                setDecks(decks);
            } catch (error) {
                console.log("I'm sorry Dave, I'm afraid I can't do that")
            }
        }

        loadDecks();

        return () => {
            abortController.abort;
        };
    }, []);

    //Print current decks
    const listDeck = decks.map((deck) => {
        return (
            <div key={deck.id}>
                <div>
                    <h2>
                        {deck.name} <p className="float-right">{deck.cards.length} cards</p>
                    </h2>
                </div>
                <br />
                <div>
                    <p>{deck.description}</p>
                </div>
                <br />
                <div>
                    /*fix these later*/
                    <button className="btn btn-info mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                        View
                    </button>
                    <button className="btn btn-warning" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        Study
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                        if (window.confirm("Delete this Deck ? You will not be able to recover it.")) {
                            deleteDeck(deck.id)
                                .then((history.push(`/`)))
                                .then(window.location.reload())
                        };
                    }}>
                        Delete
                    </button>
                </div>
            </div>
        );
    })

    return (
        <>
            {listDeck};
        </>
    );
}

export default DeckList;