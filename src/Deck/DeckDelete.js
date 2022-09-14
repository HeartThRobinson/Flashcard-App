import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckDelete({deckId}) {
    const history = useHistory();

    function handleDeckDelete() {
    const deleteDeckPromt = window.confirm("Delete this Deck? You will not be able to recover it.")

    if(deleteDeckPromt) {
        deleteDeck(deckId)
        .then((history.push(`/`)))
        .then(window.location.reload()) //this reloads the page to show that the deck has been deleted.

    }
}

    return (
        <button className="btn btn-danger float-right" onClick={handleDeckDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export default DeckDelete;