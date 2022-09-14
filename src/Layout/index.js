import React from "react";
import Header from "./Header";
import Home from "../Home/Home";
import Deck from "../Deck/Deck";
import DeckAdd from "../Deck/DeckAdd";
import DeckEdit from "../Deck/DeckEdit";
import DeckStudy from "../Deck/DeckStudy";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/decks/:deckId"> 
                <Deck /> 
            </Route>
            <Route path="/decks/new">
                <DeckAdd />
            </Route>
            <Route path="/decks/:deckId/edit">
                <DeckEdit />
            </Route>
            <Route path="/decks/:deckId/study">
                <DeckStudy />
            </Route>
            <Route path="/decks/:deckId/cards/new">
                <CardAdd />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
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
