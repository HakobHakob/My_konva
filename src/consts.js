const txtEffects = [
  "leftToRight",
  "rotateExitRight",  
  "typewriting",
  "opacityFadeOut",
  "fallingAndBouncing",  
  "twistyRotatedRightToTheLeft",  
  "easingRightToTheLeft",
]

const imgEffects = [
  "easingLeftToRight",
  "shrinkToCanvas",
  "middleToTopAndRotateClassicNegative",
  "middleToTopAndRotateClassicPositive",
  "middleToTopAndRotateNegative",    
  "middleToTopAndRotatePositive",
  "opacityFadeIn",
  "centeredResizingAndRotationingOnTheMiddle",
  "centeredResizingOnTheMiddle",
  "twistyFallingAndBouncing",
  "backEasingMiddleToTop", 
]

const animationType = {
  leftToRight: (el, duration) => {
    const layersAttributes = el.map((element) => {
      return element["attrs"]
    })

    //get last element from array
    const lastLayerData = layersAttributes.at(-1)

    if (lastLayerData !== undefined) {
      var initX = lastLayerData.x
      var initY = lastLayerData.y
    }

    let time = duration
    !time ? (time = 8) : (time = duration)

    el.position({
      x: -lastLayerData.width,
      y: 0,
    })

    el.to({
      x: initX,
      y: initY,
      duration: time,
    })
  },

  rotateExitRight: (el) => {
    const layersAttributes = el.map((element) => {
      return element["attrs"]
    })
    const lastLayerData = layersAttributes.at(-1)

    if (lastLayerData !== undefined) {
      var initX = lastLayerData.x
      var initY = lastLayerData.y
    }
    let animSpeed = 0.4
    let animInit = false

    let animRotate = new Konva.Animation((frame) => {
      el.rotation((frame.time * animSpeed) % 360)
    }, el.konvaLayer)

    let animMove = new Konva.Animation((frame) => {
      initX
      el.x((lastLayerData.width * 2) - frame.time / 10)
    }, el.konvaLayer)

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
    }, 15000)
  },

  typewriting: (el, duration) => {
    !duration && (duration = 10)

    const id = el[0].attrs.layerData

    if (el[0].attrs.type !== "TEXT_LAYER") return

    const textValue = el[0].getText()

    let i = 0
    const typeWriter = () => {
      if (i <= textValue.length) {
        el[0].setAttrs({
          text: textValue.substr(0, i),
        })
        i++
        setTimeout(typeWriter, 400)
      }
    }
    typeWriter()
  },

  opacityFadeOut: (el, duration) => {
    !duration && (duration = 15)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].position({
      x: initX,
      y: initY,
    })

    el[0].tween = new Konva.Tween({
      node: el[0],
      easing: Konva.Easings.EaseOut,
      x: initX,
      y: initY,
      duration: duration,
      opacity: 0,
      onFinish: () => {
        el[0].tween.reset()
      },
    })

    el[0].tween.play()
  },

  fallingAndBouncing: (el, duration) => {
    !duration && (duration = 15)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].position({
      x: 0,
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

  twistyRotatedRightToTheLeft: (el, duration) => {
    !duration && (duration = 23)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].rotate(30)
    el[0].opacity(0)
    el[0].position({
      x: el[0].attrs.width,
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

  easingRightToTheLeft: (el, duration) => {
    !duration && (duration = 10)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].position({
      x: el[0].attrs.width + el[0].attrs.x / 2,
      y: el[0].attrs.height / 2,
    })

    el[0].opacity(0)

    el[0].tween = new Konva.Tween({
      node: el[0],
      x: initX,
      y: initY,
      easing: Konva.Easings.StrongEaseOut,
      duration,
      opacity: 1,
    })

    el[0].tween.play()
  },

  easingLeftToRight: (el, duration) => {
    !duration && (duration = 10)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el.position({
      x: -el[0].attrs.x,
      y: initY,
    })

    el.tween = new Konva.Tween({
      node: el[0],
      x: initX,
      easing: Konva.Easings.StrongEaseOut,
      duration: duration,
    })

    el.tween.play()
  },

  shrinkToCanvas: (el, duration) => {
    !duration && (duration = 20)

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
  middleToTopAndRotateClassicNegative: (el, duration) => {
    !duration && (duration = 15)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].rotate(-30)
    el[0].opacity(0)

    el[0].position({
      x: el[0].attrs.width,
      y: el[0].attrs.height,
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
      x: el[0].attrs.width,
      y: el[0].attrs.height,
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
      x: el[0].attrs.width,
      y: el[0].attrs.height,
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
      x: el[0].attrs.width,
      y: el[0].attrs.height,
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

  opacityFadeIn: (el, duration) => {
    !duration && (duration = 10)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].position({
      x: el[0].attrs.width,
      y: el[0].attrs.height,
    })

    el[0].opacity(0)
    el[0].tween = new Konva.Tween({
      node: el[0],
      x: initX,
      y: initY,
      duration: duration,
      opacity: 1,
    }).play()
  },

  centeredResizingAndRotationingOnTheMiddle: (el, duration) => {
    !duration && (duration = 10)

    el[0].scale({
      x: 0,
      y: 0,
    })

    el[0].rotate(30)
    el[0].opacity(0)

    el[0].tween = new Konva.Tween({
      node: el[0],
      easing: Konva.Easings.BackEaseOut,
      duration,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      rotation: 0,
    })

    el[0].tween.play()
  },

  centeredResizingOnTheMiddle: (el, duration) => {
    !duration && (duration = 8)

    el[0].scale({
      x: 0,
      y: 0,
    })
    el[0].opacity(0)

    el[0].tween = new Konva.Tween({
      node: el[0],
      easing: Konva.Easings.BackEaseOut,
      duration,
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
    })

    el[0].tween.play()
  },

  twistyFallingAndBouncing: (el, duration) => {
    !duration && (duration = 20)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].rotate(-30)
    el[0].opacity(0)
    el[0].position({
      x: el[0].attrs.width / 2,
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
    !duration && (duration = 10)

    let initX = el[0].attrs.x
    let initY = el[0].attrs.y

    el[0].position({
      x: el[0].attrs.width / 2,
      y: el[0].attrs.height,
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
}

const videoFps = 25 // Number of frames per second

module.exports = { 
  animationType,
  txtEffects,
  imgEffects,
  videoFps,
}


 
