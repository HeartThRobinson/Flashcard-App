import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function CardList({ deck, cards, count }) {
    //Index/side hooks
    const [index, setIndex] = useState(0);
    const [side, setSide] = useState(true);
    const [nav, setNav] = useState("Next");
    const history = useHistory();

    //Necessary so the page doesn't loop infinitely in the render section
    function flip() {
        setSide(!side)
    }

    //Function to move through the deck
    function navClick() {
        if (index < (count - 1)) {
            //flip the card
            flip();
            //Move through the deck
            setIndex(index + 1);
            if (index === count - 1) {setNav("Finish")}
        } else if (window.confirm("Restart? Click 'Cancel' to return to the home page.")) {
            setIndex(0);
            setSide(true);
            setNav("Next")
        } else { history.push("/"); }
    }

    if (count > 2) {
        return (
            <>
                <div className="border border-primary">
                    <h3>Card {index + 1} of {count}</h3>
                    <p>{side ? cards[index]?.front : cards[index]?.back}</p>
                </div>

                <br /><br />

                <div>
                    <button style={{ marginRight: 20 }} className="btn btn-info" onClick={flip}>
                        Flip
                    </button>
                    {!side && (<button style={{ marginRight: 20 }} className="btn btn-warning justify-content-end" onClick={navClick}>
                                       {nav}
                                   </button>)
                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="border border-danger">
                <h3> Not Enough Cards</h3>
                    <p> You need at least 3 cards to study. There are {count} cards in this deck</p>
                </div>
                <br /><br />
                <button style={{ marginRight: 20 }} className="btn btn-success" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                    Add Cards
                </button>
            </>
        );
    }
}

export default CardList;