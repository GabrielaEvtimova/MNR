import React from "react";
import Contest from "../Contest/Contest";
import { useEffect, useState } from "react";
import { fetchContests } from "../../api-client";

const ContestsList = ({ initialContests }) => {
  const [contests, setContests] = useState(initialContests);

  useEffect(() => {
    fetchContests().then((data) => setContests(data.contests));
  }, []);

  return (
    <div className="contest-list">
      {contests.map((c) => (
        <Contest key={c.id} contest={c} />
      ))}
    </div>
  );
};

export default ContestsList;
