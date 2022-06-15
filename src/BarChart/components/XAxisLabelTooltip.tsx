import React from 'react'
import { Tooltip } from 'recharts'
import { ITooltip } from '../interfaces';

interface IProps {
  xAxisTicksTooltip?: boolean;
  yAxisWidth: number;
  height: number;
  xAxisHeight: number
  xAxisTicksTooltipFormat?: (tooltip: ITooltip) => string;
  tooltip?: ITooltip;
}

const XAxisLabelTooltip = ({ xAxisTicksTooltip, yAxisWidth, height, xAxisHeight, xAxisTicksTooltipFormat, tooltip }: IProps) => (
  <Tooltip
    cursor={false}
    wrapperStyle={{
      visibility: tooltip && xAxisTicksTooltip ? 'visible' : 'hidden',
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid #aaa',
      fontSize: '13px',
      padding: '0 5px',
    }}
    position={{ x: yAxisWidth + 10, y: height - xAxisHeight - 30 }}
    content={() => (xAxisTicksTooltipFormat && tooltip ? xAxisTicksTooltipFormat(tooltip) : tooltip ? tooltip.label : '') || ''}
  />
)

/**
 * Needed in order to Recharts to render
 */
XAxisLabelTooltip.displayName = Tooltip.displayName
export default XAxisLabelTooltip
