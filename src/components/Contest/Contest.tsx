import React, { useState, useEffect } from "react";
import {
  addNewNameToContest,
  fetchContest,
} from "../../api-client";
import Header from "../Header/Header";

const Contest = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState<object>(initialContest);

  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names]);

  const handleClickContestList = (event) => {
    event.preventDefault();
    onContestListClick();
  };

  const handleNewNameSubmit = async (event) => {
    event.preventDefault();

    const newNameInput = event.target.newName;

    const updatedContest = await addNewNameToContest({
      contestId: contest.id,
      newNameValue: newNameInput.value,
    });
  };

  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>

        <div className="title">Proposed Names</div>
        <div className="body">
          {contest.names?.length > 0 ? (
            <div className="list">
              {contest.names.map((proposedName) => (
                <div className="item" key={proposedName.id}>
                  {proposedName.name}
                </div>
              ))}
            </div>
          ) : (
            <div>No names proposed yet</div>
          )}
        </div>
        <div className="title">Propose a New Name</div>
        <div className="body">
          <form onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              name="newName"
              id="newName"
              placeholder="New name here..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <a
          href="/"
          className="link"
          onClick={handleClickContestList}
        >
          Back to Contest List
        </a>
      </div>
    </>
  );
};

export default Contest;
