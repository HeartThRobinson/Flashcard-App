import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api/index";

function DeckList() {
    //Hooks
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    //Create/Load deck list
   useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            try {
                const decks = await listDecks(abortController.signal);
                setDecks(decks);
            } catch (error) {
                console.log("Failed to load deck list")
            }
        }

       loadDecks();

       return () => {
           abortController.abort();
       };
    }, []);

    console.log(decks);

    //Print current decks
    const listDeck = decks.map((deck) => {
        return (
            <div key={deck.id}>
                <div className="border border-dark">
                    <div>
                        <h2>
                            {deck.name} <p className="float-right">{deck.cards.length} cards</p>
                        </h2>
                    </div>
                    <br />
                    <div>
                        <p>{deck.description}</p>
                    </div>
                </div>
                <br />
                <div>
                    <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}`)}>
                        View
                    </button>
                    <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        Study
                    </button>
                    <button style={{ alignSelf: 'flex-end' }} className="btn btn-danger justify-content-end" onClick={() => {
                        if (window.confirm("Delete this Deck? You will not be able to recover it.")) {
                            deleteDeck(deck.id)
                                .then((history.push(`/`)))
                                .then(window.location.reload())
                        };
                    }}>
                        Delete
                    </button>
                    <br /><br /><br />
                </div>
            </div>
        );
    })

    return (
        <>
            {listDeck}
        </>
    );
}

export default DeckList;