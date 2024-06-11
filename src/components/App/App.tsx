import axios from "axios";
import { API_SERVER_URL } from "../../public-config";
import ContestsList from "../ContestsList/ContestsList";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

import React from "react";
import Contest from "../Contest/Contest";

axios.get(`${API_SERVER_URL}/contests`).then((res) => {});

// Page: ContestList or SingleContest

const App = ({ initialData }) => {
  const [page, setPage] = useState<"contestList" | "contest">("contestList");
  const [currentContestId, setCurrentContestId] = useState<string | undefined>();

  useEffect(() => {
    window.onpopstate = (e) => {
      console.log(e);
      const newPage = e.state?.contestId
        ? "contest"
        : "contestList";
      setPage(newPage);
      setCurrentContestId(e.state?.contestId);
    };
  }, []);

  const navigateToContest = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    setPage("contest");
    setCurrentContestId(contestId);
  };

  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <ContestsList
            initialContests={initialData.contests}
            onContestClick={navigateToContest}
          />
        );
      case "contest":
        return (
          <Contest
            id={currentContestId}
          />
        );
    }
  };

  return (
    <div className="container">
      {pageContent()}
    </div>
  );
};

export default App;
