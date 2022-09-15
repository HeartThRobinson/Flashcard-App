import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { Switch, Route } from "react-router-dom";

import Home from "../Home/Home";
import DeckAdd from "../Deck/DeckAdd";
import Deck from "../Deck/Deck";
import DeckStudy from "../Deck/DeckStudy";
import DeckEdit from "../Deck/DeckEdit";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";

function Layout() {
  return (
    <>
        <Header />
        <div className="container">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/decks/new">
                    <DeckAdd />
                </Route>
                <Route exact path="/decks/:deckId">
                    <Deck />
                </Route>
                <Route exact path="/decks/:deckId/study">
                    <DeckStudy />
                </Route>
                <Route exact path="/decks/:deckId/edit">
                    <DeckEdit />
                </Route>
                <Route exact path="/decks/:deckId/cards/new">
                    <CardAdd />
                </Route>
                <Route exact path="/decks/:deckId/cards/:cardId/edit">
                    <CardEdit />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    </>
  );
}

export default Layout;
