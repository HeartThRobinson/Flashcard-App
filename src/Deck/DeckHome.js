import React, { useEffect, useState } from "react";

import {
    Route,
    Switch,
} from "react-router-dom";
import DeckAdd from "./DeckAdd";
import CurrentDecks from "./CurrentDecks";
import DeckStudy from "./DeckStudy";
import Deck from "./Deck";
import DeckEdit from "./DeckEdit";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";
import CardList from "../Cards/CardList";
import NotFound from "../Layout/NotFound";
import { listDecks } from "../utils/api";


// NEED TO CLEAN UP THE BOOTSTRAP


function DeckHome() {
    const [decks, setDecks] = useState([])
    const [card, setCard] = useState({})

    useEffect(() => {                                       // effect hook runs 'listDecks' to update state of 'decks'
        const abortController = new AbortController();
        listDecks(abortController.signal)
            .then(setDecks)

        return () => abortController.abort()
    }, [])

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <CurrentDecks decks={decks} />
                </Route>
                <Route exact path={"/decks/new"}>
                    <DeckAdd />
                </Route>
                <Route exact path={"/decks/:deckId/edit"}>
                    <DeckEdit />
                </Route>
                <Route exact path={"/decks/:deckId/study"}>
                    <DeckStudy />
                </Route>
                <Route exact path={"/decks/:deckId"}>
                    <Deck />
                    <h2>Cards</h2>
                    <CardList card={card} setCard={setCard} />
                </Route>
                <Route path={"/decks/:deckId/cards/new"}>
                    <CardAdd />
                </Route>

                <Route path={"/decks/:deckId/cards/:cardId/edit"}>
                    <CardEdit card={card} setCard={setCard} />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default DeckHome