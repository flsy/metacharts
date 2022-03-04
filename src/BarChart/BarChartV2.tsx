import { Bar, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Label, Tooltip } from 'recharts'
import React, { useState } from 'react'
import { IBarChart } from '../interfaces'
import focusedHOC, { InjectedProps } from '../focusedHOC'
import { getColour } from '../utils'
import { textWidth } from '../Axis/tools'

interface IProps extends Omit<IBarChart, 'width' | 'xAxisTicksRotate'> {
  xAxisTicksRotate: boolean,
}

const LABEL_MAX_CHAR_COUNT = 15;

const CustomizedLabel = ( { x, y, payload, xAxisTicksRotate, onHover }: any) => {
  const isAbbreviated = payload.value.length > LABEL_MAX_CHAR_COUNT;
  return (
    <g transform={`translate(${x},${y})`}>
       <text
         x={0}
         y={-12}
         dy={16}
         fontSize={10}
         textAnchor={xAxisTicksRotate ? "end" : "middle"}
         fill="#666"
         transform={xAxisTicksRotate ? "rotate(-90)" : ''}
         onMouseEnter={() => onHover(payload.value)}
         onMouseLeave={() => onHover('')}
       >
         {`${payload.value.substr(0, LABEL_MAX_CHAR_COUNT)}${isAbbreviated ? '...' : ''}`}
       </text>
     </g>
   );
}

const getLongestStr = (arr: string[]) => {
  const res = arr.reduce((acc, curr) => curr.length > acc.length ? curr : acc, '')
  return res.substr(0, LABEL_MAX_CHAR_COUNT)
}

const getXAxisHeight = (props: IProps & InjectedProps) => {
  if(!props.xAxisTicksRotate) {
    return 30;
  }

  const longestLabel = getLongestStr(props.data.map(d => d.key));
  return textWidth(longestLabel) + (props.xAxisLabel ? 12 : 0);
}

const getYAxisWidth = (props: IProps & InjectedProps) => {
  const longestLabel = getLongestStr(props.data.map(d => d.value.toString()));
  return textWidth(longestLabel) + (props.yAxisLabel ? 12 : 0);
}

const BarChartV2 = (props: IProps & InjectedProps) => {
  const [tooltip, setTooltip] = useState<string>('');
  const { height, data, filters, colour, colours, focused, keyFormat, valueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel, xAxisTicksTooltip, xAxisTicksTooltipFormat } = props;

  const xAxisHeight = getXAxisHeight(props);
  const yAxisWidth = getYAxisWidth(props);

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <Tooltip
            cursor={false}
            wrapperStyle={{
              visibility: tooltip ? 'visible' : 'hidden',
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid #aaa',
              fontSize: '13px',
              padding: '0 5px'
            }}
            position={{ x: yAxisWidth + 10, y: height - xAxisHeight - 25 }}
            content={() => tooltip}
        />
        <XAxis
          dataKey="key"
          interval={0}
          tickLine={false}
          height={xAxisHeight}
          tickFormatter={keyFormat}
          tick={<CustomizedLabel onHover={setTooltip} xAxisTicksRotate={xAxisTicksRotate} />}
        >
          {xAxisLabel && <Label value={xAxisLabel} fontSize={12} offset={0} position="insideBottom" />}
        </XAxis>
        <YAxis interval={0} fontSize={12} width={yAxisWidth} tickFormatter={valueFormat}>
          {yAxisLabel && <Label value={yAxisLabel} fontSize={12} angle={-90} position="insideBottomLeft"/>}
        </YAxis>
        <Bar dataKey="value">
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
