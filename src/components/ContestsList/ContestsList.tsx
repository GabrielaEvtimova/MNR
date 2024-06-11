import React from "react";
import Contest from "../ContestPreview/ContestPreview";
import { useEffect, useState } from "react";
import { fetchContests } from "../../api-client";
import Header from "../Header/Header";

const ContestsList = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(initialContests);

  useEffect(() => {
    // fetchContests().then((contests) => setContests(contests));
  }, []);

  return (
    <>
      <Header message="Naming Contests" />
      <div className="contest-list">
        {contests.map((c) => (
          <Contest
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
