const fs = require("fs")
const path = require("path")
const execa = require("execa")

 //To select shapes by name with "image", we can use the find() method using the . selector.
  // The find() method returns an array of nodes that match the selector string.
  // animationType[textRandomEffect](stage.find("." + "textLayer"))

const frameNameLength = 5

const layerEffects = (EFFECTS) => {
  return EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
}

const combineAnimations = (...animations) => {  
  return (frame) => {
    for (const animation of animations) {
      if (animation) {
        animation(frame)
      }
    }
  }
}

const saveFrame = async ({ stage, outputDir, frame }) => {
  const data = stage.toDataURL()

  // remove the data header
  const base64Data = data.substring("data:image/png;base64,".length)

  const fileName = path.join(
    outputDir,
    `frame-${String(frame + 1).padStart(frameNameLength, "0")}.png`
  )

  await fs.promises.writeFile(fileName, base64Data, "base64")
}

const createVideo = ({ fps, outputDir, output }) => {
  execa(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      `frame-%0${frameNameLength}d.png`,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      output,
    ],
    { cwd: outputDir }
  )
}

module.exports = {
  combineAnimations,
  saveFrame,
  layerEffects,
  createVideo
}
