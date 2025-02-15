import colorVariables from '@/assets/exports/colors.json'
import type { ColorSettings } from '#build/imports'

const gridColors = (colorType: string | undefined): ColorSettings => {
  const borderColor = colorVariables.variables.find(el => el.name === `$highlight-${colorType}`)?.value
  const cursorColor = colorVariables.variables.find(el => el.name === `$accent-${colorType}`)?.value
  const hoverShadowColor = colorVariables.variables.find(el => el.name === `$secondary-${colorType}`)?.value

  return {
    borderColor,
    cursorColor,
    hoverShadowColor,
  }
}

export default gridColors
