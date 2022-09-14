import React from "react";
import { deleteCard } from "../utils/api/index";

function CardDelete({ cardId, deckId }) {

    //this function is called when the delete button is clicked to delete a specific card
    function handleCardDelete() {
        const deleteCardPromt = window.confirm("Delete this Card? You will not be able to recover it.") //displays the delete message the user will see

        if (deleteCardPromt) {
            deleteCard(cardId)
                .then(window.location.reload()) //this reloads the page to show that the card has been deleted.
        }
    }

    //populates the delete button
    return (
        <button className="btn btn-danger float-right" onClick={handleCardDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export default CardDelete;