import React from "react";
import CurrentDecks from "./CurrentDecks";
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();
    return (
        <div>
            <button
                className="btn btn-success"
                type="button"
                onClick={() => history.push("/decks/new")}>
                <span className="placeholder"></span>
                Create Deck
            </button>
            <CurrentDecks />
        </div>
    )
}

export default Home;