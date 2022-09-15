import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({ front, back, setFront, setBack, submitHandler, deck }) {
    const history = useHistory();

    const frontHandler = (event) => setFront(event.target.value);
    const backHandler = (event) => setBack(event.target.value);

    return (
        //Form for cards
        <form onSubmit={submitHandler}>
            <div className="column">
                <h4>Question:</h4>
                <textarea
                    id="front"
                    rows="4"
                    placeholder="Front side of card"
                    required
                    onChange={frontHandler}
                    value={front}
                ></textarea>
                <br />
                <h4>Answer:</h4>
                <textarea
                    id="back"
                    rows="4"
                    placeholder="Back side of card"
                    required
                    onChange={backHandler}
                    value={back}
                ></textarea>
                <br />
            </div>

            <br />

            <button style={{ marginRight: 20 }} className="btn btn-info" onClick={() => history.push(`/decks/${deck.id}`)}>
                Done
            </button>
            <button type="submit" style={{ marginRight: 20 }} className="btn btn-success">
                Save
            </button>
        </form>
    );
}

export default CardForm;