import express from "express";
import testData from "../test-data.json";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.get("/contests", (req, res) => {
  // get the data from MongoDB
  res.send({ contests: testData });
});

export default router;
