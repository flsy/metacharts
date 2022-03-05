import React from 'react'
import { Tooltip } from 'recharts'

const XAxisLabelTooltip = ({ xAxisTicksTooltip, yAxisWidth, height, xAxisHeight, xAxisTicksTooltipFormat, tooltip }: any) => (
  <Tooltip
    cursor={false}
    wrapperStyle={{
      visibility: tooltip && xAxisTicksTooltip ? 'visible' : 'hidden',
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid #aaa',
      fontSize: '13px',
      padding: '0 5px',
    }}
    position={{ x: yAxisWidth + 10, y: height - xAxisHeight - 25 }}
    content={() => xAxisTicksTooltipFormat ? xAxisTicksTooltipFormat(tooltip, 0) : tooltip}
  />
)

/**
 * Needed in order to Recharts to render
 */
XAxisLabelTooltip.displayName = Tooltip.displayName
export default XAxisLabelTooltip
