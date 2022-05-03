import { Bar, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Label, ResponsiveContainerProps } from 'recharts'
import React, { useState } from 'react'
import { IBarChart } from '../interfaces'
import focusedHOC, { InjectedProps } from '../focusedHOC'
import { getColour } from '../utils'
import XAxisLabelTooltip from './components/XAxisLabelTooltip';
import XAxisTick from './components/XAxisTick'
import { getXAxisHeight, getYAxisWidth } from './utils'

interface IProps extends Omit<IBarChart, 'width' | 'xAxisTicksRotate'> {
  xAxisTicksRotate: boolean,
  width?: ResponsiveContainerProps['width'];
  isAnimationActive?: boolean;
}

const FONT_SIZE = 12;


const BarChartV2 = (props: IProps & InjectedProps) => {
  const [tooltip, setTooltip] = useState<string>('');
  const { height, data, filters, colour, colours, focused, keyFormat, valueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel, xAxisTicksTooltip, xAxisTicksTooltipFormat } = props;

  const xAxisHeight = getXAxisHeight(props);
  const yAxisWidth = getYAxisWidth(props);

  return (
    <ResponsiveContainer height={height} width={props.width}>
      <BarChart data={data}>
        <XAxisLabelTooltip
          xAxisTicksTooltip={xAxisTicksTooltip}
          yAxisWidth={yAxisWidth}
          height={height}
          xAxisHeight={xAxisHeight}
          xAxisTicksTooltipFormat={xAxisTicksTooltipFormat}
          tooltip={tooltip}
        />
        <XAxis
          dataKey="key"
          interval={0}
          tickLine={false}
          height={xAxisHeight}
          tickFormatter={keyFormat}
          tick={<XAxisTick onMouseEnter={setTooltip} onMouseLeave={() => setTooltip('')} xAxisTicksRotate={xAxisTicksRotate} />}
        >
          {xAxisLabel && <Label value={xAxisLabel} fontSize={FONT_SIZE} offset={0} position="insideBottom" />}
        </XAxis>
        <YAxis tick={{ fontSize: 10 }} interval={0} width={yAxisWidth} tickFormatter={valueFormat}>
          {yAxisLabel && <Label value={yAxisLabel} fontSize={FONT_SIZE} angle={-90} position="insideBottomLeft"/>}
        </YAxis>
        <Bar dataKey="value" isAnimationActive={props.isAnimationActive}>
          {data.map((entry, index) => {
            const c = colours && colours[index] ? colours[index] : colour;
            return (
              <Cell
                cursor={onFilter ? "pointer" : "default"}
                onClick={onFilter ? () => onFilter(entry.key) : undefined}
                fill={getColour(c, entry.key, filters, focused === entry.key)}
                key={`cell-${index}`}
                onMouseEnter={() => onFocus(entry.key)}
                onMouseLeave={() => onFocus(undefined)}
              />
            )
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default focusedHOC(BarChartV2);
