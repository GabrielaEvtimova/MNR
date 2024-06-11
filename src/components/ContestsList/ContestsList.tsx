import React from "react";
import { useEffect, useState } from "react";
import { fetchContestList } from "../../api-client";
import Header from "../Header/Header";
import ContestPreview from "../ContestPreview/ContestPreview";

const ContestsList = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(initialContests);

  // useEffect(() => {
  //   fetchContestList().then((contests) => setContests(contests));
  // }, []);

  return (
    <>
      <Header message="Naming Contests" />
      <div className="contest-list">
        {contests.map((c) => (
          <ContestPreview
            key={c.id}
            contest={c}
            onClick={onContestClick}
          />
        ))}
      </div>
    </>
  );
};

export default ContestsList;
