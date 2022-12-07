const EFFECTS = [
  "leftToRight",
  // "rotateExitRight",
  // "fadeInItem",
  // "spellTowardsTheScreen",
  // "shrinkToCanvas",
  // "opacityFadeOut",
  // "opacityFadeIn",
  // "typewriting",
  // "fallingAndBouncing",
  // "twistyFallingAndBouncing",
  // "backEasingMiddleToTop",
  // "middleToTopAndRotateClassicNegative",
  // "middleToTopAndRotateClassicPositive",
  // "middleToTopAndRotateNegative",
  // "middleToTopAndRotatePositive",
  // "twistyRotatedRightToTheLeft",
  // "centeredResizingAndRotationingOnTheMiddle",
  // "centeredResizingOnTheMiddle",
  // "easingRightToTheLeft",
]

const data = {
  frameGroup: {
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
  },
  fadeImage: { opacity: 1 },
}

const templateWidth = 1080
const templateHeight = 1080
const videoFps = 25 // 1 vayrkyanum kadreri qanak

const layersArr = [  
  {
    id: 46625,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://static.essemem.com/file-manager/6385a6d43d38e.jpg',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 2,
    title: 'Frame-79-(1)-min',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 1080,
      coords: [Object],
      height: 1080,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 430,
      originalHeight: 430
    },
    visibility: true,
    placeholder: { type: 'Background', layerId: '', placement: 'fill' },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46631,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://uf-2022.essemem.com/%22%22%2C3d3ecaa6-f011-4c89-9-flowerlogo.jpg',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 8,
    title: 'Image-placeholder',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 184,
      coords: [Object],
      height: 123,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 200,
      originalHeight: 200
    },
    visibility: true,
    placeholder: { type: 'Logo', layerId: '', placement: 'fit', isReplaced: true },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46632,
    flip: { h: false, v: false },
    meta: {
      color: [Object],
      value: [ 'Text Effect' ],
      fontId: '535',
      stroke: [Object],
      padding: [Array],
      fontSize: '54',
      fontStyle: 'regular',
      fontFamily: 'Lobster',
      fontWeight: '400',
      lineHeight: 1.1,
      letterSpacing: 0,
      backgroundColor: [Object],
      horizontalAlign: 'center'
    },
    type: 'TEXT_LAYER',
    order: 9,
    title: 'Dollar S...',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#ff00fb',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 742,
      coords: { x: 168, y: 63 },
      height: 118.797,
      maxWidth: 742,
      rotation: 0,
      originalWidth: 510,
      originalHeight: 99,
      cropInfo: { width: 742, height: 119, x: 0, y: 0 }
    },
    visibility: true,
    placeholder: { type: 'Title', layerId: '', placement: 'fill', isReplaced: true },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 98004,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://uf-2022.essemem.com/%22%22%2C5d900123-3c11-48f0-a-flower.jpg',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 11,
    title: 'Image-placeholder',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 709,
      coords: [Object],
      height: 838,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 200,
      originalHeight: 200
    },
    visibility: true,
    placeholder: { type: 'Image', layerId: '', placement: 'fill', isReplaced: true },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46630,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://static.essemem.com/file-manager/6385a7ac79e3e.png',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 12,
    title: 'Asset-2@2x-13-min',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 361,
      coords: [Object],
      height: 271,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 361,
      originalHeight: 271
    },
    visibility: true,
    placeholder: { type: '', layerId: '', placement: 'fill' },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46628,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://static.essemem.com/file-manager/6385a74c043d6.png',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 13,
    title: 'Asset-2@2x-14-min',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 696,
      coords: [Object],
      height: 215,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 430,
      originalHeight: 133
    },
    visibility: true,
    placeholder: { type: '', layerId: '', placement: 'fill' },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46629,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://static.essemem.com/file-manager/6385a793a3608.png',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 14,
    title: 'Asset-1@2x-9-min',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 455,
      coords: [Object],
      height: 310,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 430,
      originalHeight: 293
    },
    visibility: true,
    placeholder: { type: '', layerId: '', placement: 'fill' },
    parentLayerId: '',
    relativePosition: ''
  },
  {
    id: 46627,
    flip: { h: false, v: false },
    meta: {
      type: 'ImgType',
      value: 'https://static.essemem.com/file-manager/6385a7276f969.png',
      colorAdjustments: [Object]
    },
    type: 'IMAGE_LAYER',
    order: 15,
    title: 'Asset-3@2x-17-min',
    border: {
      type: '',
      solid: [Object],
      width: 20,
      gradient: [Object],
      position: 'inside'
    },
    shadow: {
      blur: 0,
      color: '#3b3939',
      spread: 0,
      distance: 0,
      direction: 0,
      isEnabled: false
    },
    movable: true,
    opacity: 1,
    constrains: {
      movable: true,
      draggable: true,
      placement: '',
      resizable: true,
      rotatable: true,
      selection: true
    },
    dimentions: {
      width: 811,
      coords: [Object],
      height: 226,
      cropInfo: [Object],
      rotation: 0,
      originalWidth: 430,
      originalHeight: 120
    },
    visibility: true,
    placeholder: { type: '', layerId: '', placement: 'fill' },
    parentLayerId: '',
    relativePosition: ''
  }
]



module.exports = { 
  EFFECTS,
  data,
  templateWidth,
  templateHeight,
  videoFps,
}
