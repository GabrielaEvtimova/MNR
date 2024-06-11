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
  const [page, setPage] = useState<"contestList" | "contest">(
    initialData.currentContest ? "contest" : "contestList",
  );
  const [currentContest, setCurrentContest] = useState<
    object | undefined
  >(initialData.currentContest);

  useEffect(() => {
    window.onpopstate = (event) => {
      const newPage = event.state?.contestId
        ? "contest"
        : "contestList";
      setPage(newPage);
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);

  const navigateToContest = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    setPage("contest");
    setCurrentContest({ id: contestId });
  };

  const navigateToContestList = () => {
    window.history.pushState({}, "", "/");
    setPage("contestList");
    setCurrentContest(undefined);
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
            initialContest={currentContest}
            onContestListClick={navigateToContestList}
          />
        );
    }
  };

  return <div className="container">{pageContent()}</div>;
};

export default App;
