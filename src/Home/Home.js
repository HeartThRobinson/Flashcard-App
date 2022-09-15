import React from "react";
import { useHistory } from "react-router-dom";

import DeckList from "../Deck/DeckList"

function Home() {
    const history = useHistory();
    return (
        <div>
            <button
                className="btn btn-success"
                type="button"
                onClick={() => history.push("/decks/new")}>
                Create Deck
            </button>
            <br /><br />
            <DeckList />
        </div>
    )
}

export default Home;