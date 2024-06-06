import axios from "axios";
import { API_SERVER_URL } from "../../public-config";
import ContestsList from "../ContestsList/ContestsList";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

import React from "react";

axios.get(`${API_SERVER_URL}/contests`).then((res) => {});

const App = ({ initialData }) => {
  return (
    <div className="container">
      <Header message="Naming Contests" />
      <ContestsList initialContests={initialData.contests} />
    </div>
  );
};

export default App;
