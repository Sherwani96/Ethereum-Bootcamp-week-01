// const express = require("express");
import express from "express";
import cors from "cors";
const app = express();
// const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "022c62d6e0b7405dfdb59b5bf800817ad97c95fc9e55a07239c3c1b8708442b5f7": 100,
  "020da1bcbb2b1194e36dfd899d3a1a710ddfe09b394e672fe68854439aa3d89d1a": 50,
  "033bf206c0101b3a6254e5f75836aa1949b03b6ea4af81a5e949427d855970f14f": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
