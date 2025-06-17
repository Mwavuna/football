const { randomUUID } = require("crypto");
const fs = require("fs");
const path = "./players.json";

const getPlayers = (req, res) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");
    res.json(JSON.parse(data));
  });
};

const addPlayer = (req, res) => {
  const newPlayer = { ...req.body, id: randomUUID() };
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");
    const players = JSON.parse(data);
    players.push(newPlayer);
    fs.writeFile(path, JSON.stringify(players, null, 2), (err) => {
      if (err) return res.status(500).send("Write error");
      global.io.emit("playerAdded", newPlayer);
      res.status(201).json(newPlayer);
    });
  });
};

const deletePlayer = (req, res) => {
  const id = req.params.id; // IDs are UUIDs (strings)
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");
    let players = JSON.parse(data);
    players = players.filter((p) => p.id !== id);
    fs.writeFile(path, JSON.stringify(players, null, 2), (err) => {
      if (err) return res.status(500).send("Write error");
      global.io.emit("playerDeleted", id);
      res.status(200).send("Deleted");
    });
  });
};

const updatePlayer = (req, res) => {
  const id = req.params.id;
  const { name, number, rating, position } = req.body;

  fs.readFile(path, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");

    let players = JSON.parse(data);
    const index = players.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ error: "Player not found" });

    const updatedPlayer = { id, name, number, rating, position };
    players[index] = updatedPlayer;

    fs.writeFile(path, JSON.stringify(players, null, 2), (err) => {
      if (err) return res.status(500).send("Write error");
      global.io.emit("playerUpdated", updatedPlayer);
      res.json(updatedPlayer);
    });
  });
};

module.exports = { getPlayers, addPlayer, deletePlayer, updatePlayer };
