const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "db.json");

// Simulated DB delay (like a real DB round-trip)
async function delay(ms = 1500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readAll() {
  await delay();
  const data = await fs.readFile(pathToFile, "utf-8");
  return JSON.parse(data);
}

async function writeAll(data) {
  await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readAll, writeAll };
