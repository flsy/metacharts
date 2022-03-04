import React from 'react'
import { Tooltip } from 'recharts'

const BarChartTooltip = ({ xAxisTicksTooltip, yAxisWidth, height, xAxisHeight, xAxisTicksTooltipFormat, tooltip }: any) => {
  return (
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
    />)
}

/**
 * Needed in order to Recharts to render
 */
BarChartTooltip.defaultProps = Tooltip.defaultProps
BarChartTooltip.displayName = Tooltip.displayName
BarChartTooltip.getComposedData = Tooltip.contextType

export default BarChartTooltip
