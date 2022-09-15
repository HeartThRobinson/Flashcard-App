import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function DeckAdd() {
    //Hooks for deck info: name, description etc
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const history = useHistory();

    //Handlers for changing info
    const nameHandler = (event) => setName(event.target.value);
    const descHandler = (event) => setDesc(event.target.value);

    //Submit handler
    const submitHandler = (event) => {
        event.preventDefault();
        createDeck({
            name: name,
            description: desc,
        })
            .then((newDeck) => history.push(`/decks/${newDeck.id}`))
    }

    return (
        //Form for creating deck. 
        <>
            <div className="container">
                <nav>
                    <div className="row">
                        <Link to="/">Home</Link>
                        <p> / </p>
                        <p style={{ color: 'grey' }}>Create Deck</p>
                    </div>
                </nav>
            </div>
            <h2>Create Deck</h2>

            <form onSubmit={submitHandler}>
                <div className="column">
                    <h4>Deck Name:</h4>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name Missing"
                        required
                        onChange={nameHandler}
                        value={name}
                        />
                    <br />
                    <h4>Deck Description:</h4>
                        <textarea
                            id="description"
                            rows="4"
                            placeholder="Description Missing"
                            required
                            onChange={descHandler}
                            value={desc}
                        ></textarea>
                    <br />
                </div>

                <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/`)}>
                   Cancel
                </button>
                <button type="submit" style={{ marginRight: 20 }} className="btn btn-success">
                    Submit
                </button>
            </form>
        </>
    );
}

export default DeckAdd;