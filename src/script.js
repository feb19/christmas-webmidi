import * as PIXI from 'pixi.js'
import SnowFlake1 from './SnowFlake1.js'
import SnowFlake2 from './SnowFlake2.js'
import SnowFlake3 from './SnowFlake3.js'
import SnowFlake4 from './SnowFlake4.js'
import SnowFlake5 from './SnowFlake5.js'
import SnowFlake6 from './SnowFlake6.js'
import SnowFlake7 from './SnowFlake7.js'
import SnowCircle from './SnowCircle.js'

var snowFlakes = []
var renderer
var app
var container1 = new PIXI.Container()
var container2 = new PIXI.Container()
var blurFilter1 = new PIXI.filters.BlurFilter()
var blurFilter2 = new PIXI.filters.BlurFilter()

function start() {
  let appContainer = document.getElementById('app-container')
  renderer = PIXI.autoDetectRenderer(appContainer.clientWidth, appContainer.clientHeight)

  app = new PIXI.Application(appContainer.clientWidth, appContainer.clientHeight, {backgroundColor : 0})
  appContainer.appendChild(app.view)

  app.stage.addChild(container1)
  app.stage.addChild(container2)
  animate()
  requestMIDI()

  container1.filters = [blurFilter1]
  container2.filters = [blurFilter2]

  document.body.addEventListener('touchend', function(e) {
    createRandomSnowFlake()
    e.preventDefault()
  }, false);
  document.body.addEventListener('click', function(e) {
    createRandomSnowFlake()
  }, false);

  setInterval(function() {
    snowFlakes.push(new SnowCircle(container1, window.innerWidth * Math.random(), -10, Math.random() * 10, app.view.clientHeight))
  }, 300)
  // document.body.requestFullScreen();
}
function createRandomSnowFlake() {
  let ratio = Math.random()
  if (ratio < 1/7) {
    snowFlakes.push(new SnowFlake1(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else if (ratio < 2/7) {
    snowFlakes.push(new SnowFlake2(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else if (ratio < 3/7) {
    snowFlakes.push(new SnowFlake3(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else if (ratio < 4/7) {
    snowFlakes.push(new SnowFlake4(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else if (ratio < 5/7) {
    snowFlakes.push(new SnowFlake5(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else if (ratio < 6/7) {
    snowFlakes.push(new SnowFlake6(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  } else {
    snowFlakes.push(new SnowFlake7(app.stage, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, Math.random() * 100, app.view.clientHeight))
  }
}
function animate() {
  requestAnimationFrame(animate)
  snowFlakes.forEach(function(snowFlake) {
    snowFlake.draw()
  })
  renderer.render(app.stage);

  blurFilter1.blur = 1
  blurFilter2.blur = 2
}
function setNote(note, velocity) {
  var c = container1
  if (velocity < 10 || velocity > 120) {
    c = container2
  } else if (velocity > 30 && velocity < 110) {
    c = app.stage
  }
  if (note == 0) {
    snowFlakes.push(new SnowFlake1(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 1) {
    snowFlakes.push(new SnowFlake2(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 2) {
    snowFlakes.push(new SnowFlake3(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 3) {
    snowFlakes.push(new SnowFlake4(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 4) {
    snowFlakes.push(new SnowFlake5(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 5) {
    snowFlakes.push(new SnowFlake6(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  } else if (note == 6) {
    snowFlakes.push(new SnowFlake7(c, window.innerWidth * Math.random(), window.innerHeight * Math.random() * 0.5, velocity, app.view.clientHeight))
  }
}

var midiDevices = {
  inputs: {},
  outputs: {}
};
function requestMIDI() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(requestSuccess, requestError)
  } else {
    requestError()
  }
}
function requestSuccess(data) {
  var inputIterator = data.inputs.values()
  for (var input = inputIterator.next(); !input.done; input = inputIterator.next()) {
    var value = input.value
    midiDevices.inputs[value.name] = value
    input.value.addEventListener('midimessage', inputEvent, false)
  }

  var outputIterator = data.outputs.values()
  for (var output = outputIterator.next(); !output.done; output = outputIterator.next()) {
    var value = output.value
    midiDevices.outputs[value.name] = value
  }
}
function requestError(error) {
  console.error('error', error)
}
function inputEvent(e) {
  var target = e.target
  var device = midiDevices.outputs[target.name]
  var message = ''
  var numArray = []
  event.data.forEach(function(val) {
    numArray.push(('00' + val.toString(16)).substr(-2))
  })
  message = numArray.join(' ')
  if (message !== 'f8' && message !== 'fe') {
    console.log(message)
    let m = message.split(' ')
    if (m[0].substr(0,1) == '9' && parseInt(m[2], 16) !== 0 ){
      //note on
      let noteNumber = parseInt(m[1], 16)
      let velocity = parseInt(m[2], 16)
      let note = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
      setNote(note[noteNumber % note.length], velocity * 2)
    }
  }
}


document.addEventListener('DOMContentLoaded', function(e) {
  start()
}, false)
