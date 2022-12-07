// node src/index.js
require("konva-node")
const path = require("path")
const { rendVideo } = require("./rendVideo")

const run = async () => {
  const outputDir = path.join(__dirname, "../out")
  const output = path.join(__dirname, "../tmpVideo/output.mp4")

  await rendVideo({ outputDir, output })
}

run().catch(console.error)
