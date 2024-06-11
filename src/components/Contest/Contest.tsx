import React, { useState, useEffect } from "react";
import { fetchContest } from "../../api-client";
import Header from "../Header/Header";

const Contest = ({ initialContest }) => {
  const [contest, setContest] = useState<object>(initialContest);

  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names]);

  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>
      </div>
    </>
  );
};

export default Contest;
