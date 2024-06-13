import express from "express";

import cors from "cors";

import { connectClient } from "./db";

const router = express.Router();
router.use(cors());
router.use(express.json());

/**
 * Get all contests from the server
 */
router.get("/contests", async (req, res) => {
  // get the data from MongoDB
  const client = await connectClient();

  const contests = await client
    .collection("contests")
    .find()
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      _id: 0,
    })
    .toArray();

  res.send({ contests });
});

/**
 * Get a single contest from the server
 */
router.get("/contest/:contestId", async (req, res) => {
  const client = await connectClient();
  const id = req.params.contestId;

  const contest = await client
    .collection("contests")
    .findOne({ id: id });

  res.send({ contest });
});

router.post("/contest/:contestId", async (req, res) => {
  // connect to a client
  const client = await connectClient();
  const id = req.params.contestId;

  const { newNameValue } = req.body;

  // await on the client doing some operation on the contest collection
  const doc = await client
    .collection("contests")
    // find and update the collection
    .findOneAndUpdate(
      { id: id },
      {
        $push: {
          names: {
            id: newNameValue.toLowerCase().replace(/\s/g, "-"),
            name: newNameValue,
            timestamp: new Date(),
          },
        },
      },
      { returnDocument: "after" },
    );

  // returned document would be doc.value - the updated contest

  res.send({ updatedContest: doc });
});

export default router;
