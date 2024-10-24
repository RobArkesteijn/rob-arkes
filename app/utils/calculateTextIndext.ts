const calculateTextIndents = (elements: HTMLElement[], rotation: number) => {
  elements.forEach((line, index) => {
    const lineHeight = line.offsetHeight
    const distanceToTop = (lineHeight * (index + 1)) - 36
    const radians = rotation * (Math.PI / 180)
    const indent = distanceToTop * Math.sin(radians)

    line.style.textIndent = `${indent}px`
  })
}

export default calculateTextIndents
