require("konva-node")
const Konva = require("konva")
const { loadImage } = require("canvas")
const stateJson = require("./project.json")
const layersDataArr = stateJson.layers.mainState.data

const { EFFECTS, data, videoFps } = require("./consts")

const { saveFrame, createVideo, combineAnimations } = require("./videoUtils")

const rendLayersEffect = (stage, layer, EFFECTS, layerData) => {  

  const animationType = {
    leftToRight: (el, duration) => { 
      
      const layersAttributes = el.map((element) => {       
        return element["attrs"]
      })    

      //get last element from array  
      const nextLayerData = layersAttributes.at(-1)   

      let time = duration
      !time ? (time = 8) : (time = duration)
      
      if (nextLayerData !== undefined) {
        var initX = nextLayerData.x
        var initY = nextLayerData.y
      }     

      el.position({
        x: 0,
        y: initY,
      })

      el.to({
        x: initX,       
        duration: time,
      })
    },

    rotateExitRight: (el) => {
      let initX = el[0].attrs.x
      let initY = el[0].attrs.y
      let animSpeed = 0.05
      let animInit = false

      let animRotate = new Konva.Animation((frame) => {
        el.rotation(frame.time % 360)
      }, layer)

      let animMove = new Konva.Animation((frame) => {
        el.x(initX + frame.time * animSpeed)
      }, layer)

      animInit = true
      animRotate.start()
      animMove.start()

      setTimeout(() => {
        animRotate.stop()
        animMove.stop()
        el.setAttrs({
          x: initX,
          y: initY,
          rotation: 0,
        })
      }, 20000)
    },

    fadeInItem: (el, duration) => {
      !duration && (duration = 2)
      let zero = parseInt(0)
      let one = 1
      // let initItemProps = el.attrs
      el.opacity(zero)

      el.tween = new Konva.Tween({
        node: el,
        duration: duration,
        opacity: one,
      })
      el.tween.play()
    },

    spellTowardsTheScreen: (el, duration) => {
      !duration && (duration = 10)

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.StrongEaseIn,
        duration: duration,
        scaleX: 12,
        scaleY: 12,
        opacity: 0,
        onFinish() {
          el[0].tween.reset()
        },
      })

      el[0].tween.play()
    },

    shrinkToCanvas: (el, duration) => {
      !duration && (duration = 10)

      el[0].scale({
        x: 12,
        y: 12,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.StrongEaseOut,
        duration: duration,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      })

      el[0].tween.play()
    },

    opacityFadeOut: (el, duration) => {
      !duration && (duration = 10)

      el[0].tween = new Konva.Tween({
        node: el[0],
        duration: duration,
        opacity: 0,
        onFinish() {
          el[0].tween.reset()
        },
      })

      el[0].tween.play()
    },

    opacityFadeIn: (el, duration) => {
      !duration && (duration = 10)

      el[0].opacity(0)
      el[0].tween = new Konva.Tween({
        node: el[0],
        duration: duration,
        opacity: 1,
      })

      el[0].tween.play()
    },

    typewriting: (el, duration) => {
      !duration && (duration = 10)

      if (el[0].attrs.name != "text") return

      const textValue = el[0].getText()

      let i = 0

      const typeWriter = () => {
        if (i <= textValue.length) {
          el[0].setAttrs({
            text: textValue.substr(0, i),
          })
          layer.draw()
          i++
          setTimeout(typeWriter, 50)
        }
      }
      typeWriter()
    },

    fallingAndBouncing: (el, duration) => {
      !duration && (duration = 10)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() / 2,
        y: 0,
      })
      el[0].opacity(0)

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BounceEaseOut,
        duration: duration,
        opacity: 1,
      })

      el[0].tween.play()
    },

    twistyFallingAndBouncing: (el, duration) => {
      !duration && (duration = 10)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)
      el[0].opacity(0)
      el[0].position({
        x: stage.width() / 2,
        y: 0,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BounceEaseOut,
        duration,
        opacity: 1,
      })

      el[0].tween.play()

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.EaseInOut,
        duration: duration,
        rotation: 0,
      })

      el[0].tween.play()
    },

    backEasingMiddleToTop: (el, duration) => {
      !duration && (duration = 7.5)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.BackEaseOut,
        duration,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateClassicNegative: (el, duration) => {
      !duration && (duration = 15)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.StrongEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateClassicPositive: (el, duration) => {
      !duration && (duration = 15)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.StrongEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotateNegative: (el, duration) => {
      !duration && (duration = 24.5)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(-30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.ElasticEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    middleToTopAndRotatePositive: (el, duration) => {
      !duration && (duration = 24.5)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)
      el[0].opacity(0)

      el[0].position({
        x: stage.width() / 2,
        y: stage.height(),
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        y: initY,
        easing: Konva.Easings.ElasticEaseOut,
        duration,
        rotation: 0,
        opacity: 1,
      })

      el[0].tween.play()
    },

    twistyRotatedRightToTheLeft: (el, duration) => {
      !duration && (duration = 18)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].rotate(30)
      el[0].opacity(0)
      el[0].position({
        x: stage.width(),
        y: initY,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        easing: Konva.Easings.BackEaseOut,
        duration,
        opacity: 1,
      })

      el[0].tween.play()

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.ElasticEaseOut,
        duration: duration + 1.5,
        rotation: 0,
      })

      el[0].tween.play()
    },

    centeredResizingAndRotationingOnTheMiddle: (el, duration) => {
      !duration && (duration = 10)

      el[0].scale({
        x: 0,
        y: 0,
      })

      el[0].rotate(30)

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.BackEaseOut,
        duration,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      })

      el[0].tween.play()
    },

    centeredResizingOnTheMiddle: (el, duration) => {
      !duration && (duration = 10)

      el[0].scale({
        x: 0,
        y: 0,
      })

      el[0].tween = new Konva.Tween({
        node: el[0],
        easing: Konva.Easings.BackEaseOut,
        duration,
        scaleX: 1,
        scaleY: 1,
      })

      el[0].tween.play()
    },

    easingRightToTheLeft: (el, duration) => {
      !duration && (duration = 10)

      let initX = el[0].attrs.x
      let initY = el[0].attrs.y

      el[0].position({
        x: stage.width() + el[0].attrs.x / 2,
        y: stage.height() / 2,
      })

      el[0].opacity(0)

      el[0].tween = new Konva.Tween({
        node: el[0],
        x: initX,
        easing: Konva.Easings.StrongEaseOut,
        duration,
        opacity: 1,
      })

      el[0].tween.play()
    },
  }

  const itemType = {
    textLayer: (layerData) => {
      const FONT_SIZE = parseInt(layerData.meta.fontSize)
      let el = new Konva.Text({
        // width: layerData.dimentions.width,
        // height: layerData.dimentions.height,
        x: layerData.dimentions.coords.x,
        y: layerData.dimentions.coords.y,
        text: layerData.meta.value,
        fontSize: FONT_SIZE,
        fontFamily: layerData.meta.fontFamily,
        fill: "red", //txtLayersData.meta.color,// berel
        opacity: layerData.opacity,
        name: "textLayer",
      })

      //Layeri stexcman koordinatner
      el.setAttr("offset", {
        x: 0,
        y: 0,
      })
      layer.add(el)
      layer.draw()
    },
    image: (layerData) => {
      let imgUrl = layerData.meta.value
      // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tk7Wlyh7QyNhcMUhvwQ5mn1keNtI88IOEA&usqp=CAU"
      let el = Konva.Image.fromURL(imgUrl, (el) => {
        el.setAttrs({
          width: layerData.dimentions.width,
          height: layerData.dimentions.height,
          x: layerData.dimentions.coords.x,
          y: layerData.dimentions.coords.y,
          name: "image",
          order: layerData.order,
        })

        layer.add(el)
        layer.batchDraw()
        el.setAttr("offset", {
          x: 0,
          y: 0,
        })
      })
    },
  }

  const randomEffect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)]

  if (layerData.type === "TEXT_LAYER") {
    itemType["textLayer"](layerData)
    animationType[randomEffect](stage.find("." + "textLayer"))
  }

  if (
    layerData.type === "IMAGE_LAYER" &&
    layerData.placeholder.type !== "Background"
  ) {
    itemType["image"](layerData)
    animationType[randomEffect](stage.find("." + "image"))
  }

  //To select shapes by name with Konva, we can use the find() method using the . selector.
  // The find() method returns an array of nodes that match the selector string.
  // animationType[textRandomEffect](stage.find("." + "textLayer"))
}

const rendVideo = async ({ outputDir, output }) => {
  const canvasSize = stateJson.layers.mainState.canvasSize

  const stage = new Konva.Stage({
    width: canvasSize.width,
    height: canvasSize.height,
  })

  const start = Date.now()
  const frames = layersDataArr.length * videoFps

  try {
    let layer = new Konva.Layer({})
    let group = new Konva.Group({ clip: data.frameGroup })
    let image = new Konva.Image({ draggable: false })
    let fadeImage = null

    const backgroundLayerData = layersDataArr.find((templateLayers) => {
      return templateLayers.placeholder.type === "Background"
    })

    //backgroundLayerData.meta.value --> background Image URL
    let imageObj = await loadImage(backgroundLayerData.meta.value)
    stage.add(layer)

    // Use the html image object to load the image and handle when laoded.
    const rendBackground = (image, imageObj, group, fadeImage, layer, data) => {
      image.image(imageObj) // set the Konva image content to the html image content

      // set the Konva image attributes as needed
      image.setAttrs({
        // image: video,
        draggable: false,
        x: data.frameGroup.x,
        y: data.frameGroup.y,
        width: data.frameGroup.width,
        height: data.frameGroup.height,
      })

      group.add(image) // add the image to the frame group

      // make a clone of the image to be used as the fade image.
      fadeImage = image.clone({
        draggable: false,
        opacity: data.fadeImage.opacity,
      })
      layer.add(fadeImage)
    }
    rendBackground(image, imageObj, group, fadeImage, layer, data)

    const rendLayers = (stage, layer, EFFECTS, layersDataArr) => {
      // const txtLayersData = layersDataArr.find((templateLayers) => {
      //   return templateLayers.type === "TEXT_LAYER"
      // })
      // const txtLayersArr = txtLayersData.meta.value

      //ms ---> delay-i pakagci tivna het talis
      // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

      // ;(async () => {
      //   let index = 0
      //   while (index < layersDataArr.length) {
      //     // Wait to do this one until a delay after the last one
      //     if (index > 0) {
      //       await delay(5000)
      //     }
      //     // Do this one
      //     // console.log("layersDataArr[index]----------599",layersDataArr[index])
      //     rendLayersEffect(stage, layer, EFFECTS, layersDataArr[index])
      //     ++index
      //   }
      // })()

      var i = 0
      var interval = setInterval(() => {
        var layerObj = layersDataArr[i]
        // do whatever
        rendLayersEffect(stage, layer, EFFECTS, layerObj)
        i++
        if (i === layersDataArr.length) clearInterval(interval)
      }, 3000)
    }

    const animate = combineAnimations(
      rendLayers(stage, layer, EFFECTS, layersDataArr)
    )

    console.log("generating frames...")

    let frame = 0
    while (frame < frames) {
      animate(frame)
      layer.draw()

      await saveFrame({ stage, outputDir, frame })

      if ((frame + 1) % videoFps === 0) {
        console.log(`rendered ${(frame + 1) / videoFps} second(s)`)
      }
      ++frame
    }
  } finally {
    stage.destroy()
  }
  console.log("creating video")
  createVideo({ fps: videoFps, outputDir, output })
  const time = Date.now() - start
  console.log(`done in ${time} ms. ${(frames * 1000) / (time || 0.01)} FPS`)
}

module.exports = {
  rendVideo,
}
