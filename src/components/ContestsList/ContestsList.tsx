import React from "react";
import Contest from "../Contest/Contest";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_SERVER_URL } from "../../public-config";

const ContestsList = ({ initialContests }) => {
  
  const [contests, setContests] = useState(initialContests);

  useEffect(() => {
    axios.get(`${API_SERVER_URL}/contests`).then((res) => {
      setContests(res.data.contests);
    });
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
