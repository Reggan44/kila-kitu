// url=https://www.figma.com/design/gB4irrmRVO3lnQlE2hJcpk/Untitled?node-id=20-2
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

// Extract properties from the Figma component
const label = instance.getString('Label')
const variant = instance.getEnum('Variant', {
  'Primary': 'primary',
  'Dark': 'dark',
  'Outline': 'outline',
  'Dark Outline': 'dark-outline',
  'Ghost': 'ghost',
})
const size = instance.getEnum('Size', {
  'Small': 'sm',
  'Medium': 'md',
  'Large': 'lg',
})
const withArrow = instance.getBoolean('With Arrow')
const disabled = instance.getBoolean('Disabled')
const hasIcon = instance.getBoolean('Has Icon')
const icon = hasIcon ? instance.getInstanceSwap('Icon') : null

let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`
    <Button
      variant="${variant}"
      size="${size}"
      ${withArrow ? 'withArrow' : ''}
      ${disabled ? 'disabled' : ''}
      ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    >
      ${label}
    </Button>
  `,
  imports: ['import { Button } from "@/components/Button"'],
  id: 'button',
  metadata: {
    nestable: true,
  },
}
