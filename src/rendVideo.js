require("konva-node")
const Konva = require("konva")
const each = require("promise-each")
const { loadImage } = require("canvas")
const stateJson = require("./project.json")
const layersDataArr = stateJson.layers.mainState.data
const { videoFps, animationType } = require("./consts")

const {
  saveFrame,
  createVideo,
  layerEffects,
  combineAnimations,
} = require("./videoUtils")

const rendBackground = (BgData) => {

  let konvaImage = BgData.addKonvaImg
  let HTMLImgObj = BgData.addHTMLImg
  let konvaGroup = BgData.addKonvaGroup  
  let konvaLayer = BgData.addKonvaLayer
  let canvasSize = BgData.addKonvaSize
  let canvasCoords = BgData.addKonvaElCoords
  let fadeImage = null

  konvaImage.image(HTMLImgObj) // set the Konva image content to the html image content

  // set the Konva image attributes as needed
  konvaImage.setAttrs({
    draggable: false,
    x: canvasCoords.x,
    y: canvasCoords.y,
    width: canvasSize.width,
    height: canvasSize.height,
  })

  konvaGroup.add(konvaImage) // add the image to the frame group

  // make a clone of the image to be used as the fade image.
  fadeImage = konvaImage.clone({
    draggable: false,
    opacity: 1,
  })
  konvaLayer.add(fadeImage)
}

const addTextLayer = (konvaLayer, layerData) => {
  return new Promise((resolve) => {
    const FONT_SIZE = parseInt(layerData.meta.fontSize)

    let el = new Konva.Text({
      width: layerData.dimentions.width,
      height: layerData.dimentions.height,
      x: layerData.dimentions.coords.x,
      y: layerData.dimentions.coords.y,
      text: layerData.meta.value,
      fontSize: FONT_SIZE,
      fontFamily: layerData.meta.fontFamily,
      fill: layerData.meta.color.solid.color, //txtLayersData.meta.color,// berel
      opacity: layerData.opacity,
      konvaLayer: konvaLayer,
      type: "TEXT_LAYER",
      name: `layer-${layerData.id}`,
    })
    
    el.setAttr("offset", {
      x: 0,
      y: 0,
    })
    konvaLayer.add(el)
    konvaLayer.draw()

    resolve()
  })
}

const addImageLayer = (konvaLayer, layerData) => {
  return new Promise((resolve) => {
    let imgUrl = layerData.meta.value

    Konva.Image.fromURL(imgUrl, (el) => {
      el.setAttrs({
        width: layerData.dimentions.width,
        height: layerData.dimentions.height,
        x: layerData.dimentions.coords.x,
        y: layerData.dimentions.coords.y,
        konvaLayer: konvaLayer,
        name: `layer-${layerData.id}`,
      })
      konvaLayer.add(el)
      konvaLayer.batchDraw()
      el.setAttr("offset", {
        x: 0,
        y: 0,
      })
      resolve()
    })
  })
}

const layerAdderFunction = (layerData) => {
  if (layerData.type === "TEXT_LAYER") {
    return addTextLayer
  }

  if (layerData.type === "IMAGE_LAYER") {
    return addImageLayer
  }

  return new Error(`Unsupported layer format: ${layerData.type}`)
}

const rendLayersEffect = (stage, konvaLayer, layersDataArr) => {
  const layerProcessor = async (layerData) => {
    await layerAdderFunction(layerData)(konvaLayer, layerData)

    const stageLayer = stage.find("." + `layer-${layerData.id}`)
    const randomEffect = layerEffects(layerData)

    if (stageLayer) {
      animationType[randomEffect](stageLayer)
    }
  }

  Promise.resolve(layersDataArr).then(
    each((layerData) => layerProcessor(layerData))
  )

  // return Promise.each(layersDataArr, layerProcessor)
}

const rendVideo = async ({ outputDir, output }) => {
  const canvasSize = stateJson.layers.mainState.canvasSize
  const canvasCoords = stateJson.layers.mainState.multiselectedWrapper

  const stage = new Konva.Stage({
    width: canvasSize.width,
    height: canvasSize.height,
  })
  const konvaLayer = new Konva.Layer(null)
  const konvaImage = new Konva.Image(null)
  const konvaGroup = new Konva.Group(null)  

  const backgroundLayerData = layersDataArr.find((templateLayers) => {
    return templateLayers.placeholder.type === "Background"
  })

  let HTMLImgObj = await loadImage(backgroundLayerData.meta.value)

  stage.add(konvaLayer)

  const backgroundData = {
    addKonvaLayer: konvaLayer,
    addKonvaImg: konvaImage,
    addKonvaGroup: konvaGroup,
    addHTMLImg: HTMLImgObj,    
    addKonvaSize: canvasSize,
    addKonvaElCoords: canvasCoords,
  }

  const layerWithoutBg = layersDataArr.filter(
    (layerData) => layerData.placeholder.type !== "Background"
  )
  const start = Date.now()
  const frames = 3 * videoFps

  const animate = combineAnimations(
    rendBackground(backgroundData),
    rendLayersEffect(stage, konvaLayer, layerWithoutBg)
  )

  console.log("generating frames...")

  let frame = 0
  while (frame < frames) {
    animate(frame)
    konvaLayer.draw()
    await saveFrame({ stage, outputDir, frame })

    if ((frame + 1) % videoFps === 0) {
      console.log(`rendered ${(frame + 1) / videoFps} second(s)`)
    }
    ++frame
  }

  console.log("creating video")
  createVideo({ fps: videoFps, outputDir, output })
  const time = Date.now() - start
  console.log(`done in ${time} ms. ${(frames * 1000) / (time || 0.01)} FPS`)
}

module.exports = {
  rendVideo,
}
