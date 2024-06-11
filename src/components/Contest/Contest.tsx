import React, { useState, useEffect } from "react";
import { fetchContest } from "../../api-client";
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

  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>

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
