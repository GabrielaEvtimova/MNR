import axios from "axios";
import { API_SERVER_URL } from "../../public-config";
import ContestsList from "../ContestsList/ContestsList";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

import React from "react";
import SingleContest from "../SingleContest/SingleContest";

axios.get(`${API_SERVER_URL}/contests`).then((res) => {});

// Page: ContestList or SingleContest

const App = ({ initialData }) => {
  const [page, setPage] = useState<
    "contestList" | "singleContest"
  >("contestList");
  const [currentContestId, setCurrentContestId] = useState<
    string | undefined
  >();

  useEffect(() => {
    window.onpopstate = (e) => {
      console.log(e);
      const newPage = e.state?.contestId
        ? "singleContest"
        : "contestList";
      setPage(newPage);
      setCurrentContestId(e.state?.contestId);
    };
  }, []);

  const navigateToSingleContest = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    setPage("singleContest");
    setCurrentContestId(contestId);
  };

  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <ContestsList
            initialContests={initialData.contests}
            onContestClick={navigateToSingleContest}
          />
        );
      case "singleContest":
        return (
          <SingleContest
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
