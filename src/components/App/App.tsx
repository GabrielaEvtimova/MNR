import axios from "axios";
import { API_SERVER_URL } from "../../public-config";
import ContestsList from "../ContestsList/ContestsList";
import React, { useState, useEffect } from "react";
import Contest from "../Contest/Contest";
import AddNewContest from "../AddNewContest/AddNewContest";

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

  const onNewContest = (contest) => {
    window.history.pushState(
      { contestId: contest.id },
      "",
      `/contest/${contest.id}`,
    );

    setPage("contest");
    setCurrentContest(contest);
    location.reload();
  };

  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <>
            <ContestsList
              initialContests={initialData.contests}
              onContestClick={navigateToContest}
            />
            <AddNewContest onSuccess={onNewContest} />
          </>
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
