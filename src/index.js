import './components/graphdrawer/index.js'
import { isVerifiableInputIntegrity, stringToArrayConverter, unsafeStringToArrayConverter } from './lib/helpers.js'

/**
 * This page shows an example usage of the graphdrawer element.
 *
  * The graphdrawer element is a custom element that can be used to render an array of numbers as a graph.
  * The element is defined in the file src/components/graphdrawer/index.js
  */

// Get the elements from the DOM.
const graphdrawer = document.querySelector('jk224jv-graphdrawer')
const arrayInput = document.querySelector('#arrayInput')
const renderButton = document.querySelector('#renderButton')
const clearButton = document.querySelector('#clearButton')
const setColorButton = document.querySelector('#setColorsButton')
const setAxisButton = document.querySelector('#setAxisButton')
const setSizeButton = document.querySelector('#setSizeButton')
const setFontSettingsButton = document.querySelector('#setFontSettingsButton')
const errorMessage = document.querySelector('#errormessage')
const resetButton = document.querySelector('#resetbutton')

errorMessage.textContent = ''
resetButton.style.display = 'none'

// Add eventlisteners to the buttons.
renderButton.addEventListener('click', renderGraph)
clearButton.addEventListener('click', clearGraph)
setColorButton.addEventListener('click', setColors)
setAxisButton.addEventListener('click', setAxisTitles)
setSizeButton.addEventListener('click', setSize)
setFontSettingsButton.addEventListener('click', setFontSettings)
resetButton.addEventListener('click', reset)
// see what these functions do below.

// IMPORTANT: Im using a minimum of error handling in this example to allow you to see what the graphdrawer does when it receives invalid input. You should always validate user input on the server. This is just an example.
function renderGraph () {
  errorMessage.textContent = ''
  try {
    // Check if the input is valid.
    let arrayToRender
    if (!isVerifiableInputIntegrity(arrayInput.value)) {
      // If not, try to render it anyway. just to get the error message.
      arrayToRender = unsafeStringToArrayConverter(arrayInput.value)
    } else {
      // If it is, parse it as numbers and render it.
      arrayToRender = stringToArrayConverter(arrayInput.value)
    }
    graphdrawer.renderArrayAsGraph(arrayToRender)
  } catch (error) {
    errorMessage.textContent = error.message
    renderButton.style.display = 'block'
  }
}

function clearGraph () {
  errorMessage.textContent = ''
  try {
    graphdrawer.clear()
  } catch (error) {
    errorMessage.textContent = error.message
    renderButton.style.display = 'block'
  }
}

function setColors () {
  errorMessage.textContent = ''
  try {
    // get the values from the select elements.
    const lineColor = document.querySelector('#line-select').value
    const dotColor = document.querySelector('#dot-select').value
    const zeroLineColor = document.querySelector('#zero-select').value
    const axisColor = document.querySelector('#axis-select').value
    const labelColor = document.querySelector('#label-select').value
    const titleColor = document.querySelector('#title-select').value
    const backgroundColor = document.querySelector('#background-select').value

    const colorArgument = [
      { graphLineColor: lineColor },
      { graphDotColor: dotColor },
      { zeroLineColor: zeroLineColor },
      { axisColor: axisColor },
      { labelColor: labelColor },
      { titleColor: titleColor },
      { backgroundColor: backgroundColor }
    ]

    // set the colors.
    graphdrawer.setColors(colorArgument)
  } catch (error) {
    errorMessage.textContent = error.message
    renderButton.style.display = 'block'
  }
}

function setAxisTitles () {
  errorMessage.textContent = ''
  try {
    // get the values from the select elements.
    const xAxis = document.querySelector('#xaxis').value
    const yAxis = document.querySelector('#yaxis').value

    // set the axis.
    graphdrawer.setAxisTitles({ xAxis: xAxis, yAxis: yAxis })
  } catch (error) {
    errorMessage.textContent = error.message
  }
}

function setSize () {
  errorMessage.textContent = ''
  try {
    // get the values from the select elements.
    const width = document.querySelector('#width').value
    const height = document.querySelector('#height').value

    // set the size.
    graphdrawer.setSize({ width: width, height: height })
  } catch (error) {
    errorMessage.textContent = error.message
    renderButton.style.display = 'block'
  }
}

function setFontSettings () {
  errorMessage.textContent = ''
  try {
    // get the values from the select elements.
    const fontFamily = document.querySelector('#fontFamily').value
    const labelSize = document.querySelector('#labelSize').value
    const titleSize = document.querySelector('#titleSize').value


    // set the font settings.
    graphdrawer.setFontSettings({ fontFamily: fontFamily, labelSize: labelSize, titleSize: titleSize })
  } catch (error) {
    errorMessage.textContent = error.message
    renderButton.style.display = 'block'
  }
}

function reset () {
  // something have jammed up completely, reload the page.
  location.reload()
}