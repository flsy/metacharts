import { Bar, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Label } from 'recharts'
import React from 'react'
import { IBarChart } from '../interfaces'
import focusedHOC, { InjectedProps } from '../focusedHOC'
import { getColour } from '../utils'


interface IProps extends Omit<IBarChart, 'width' | 'xAxisTicksRotate'> {
  xAxisTicksRotate: boolean,
}

const LABEL_MAX_CHAR_COUNT = 15;

const CustomizedLabel = ( { x, y, stroke, payload, xAxisTicksRotate }: any) => {
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
       >
         {`${payload.value.substr(0, LABEL_MAX_CHAR_COUNT)}${isAbbreviated ? '...' : ''}`}
       </text>
     </g>
   );
}


const BarChartV2 = ({ height, data, filters, colour, colours, focused, keyFormat, valueFormat, onFilter, onFocus, xAxisTicksRotate, xAxisLabel, yAxisLabel, xAxisTicksTooltip, xAxisTicksTooltipFormat }: IProps & InjectedProps) => {
  const maxCurrentCharCount = data.reduce((acc, curr) => curr.key.length > acc ? curr.key.length : acc, 1);
  const labelHeight = 6 * Math.min(maxCurrentCharCount, LABEL_MAX_CHAR_COUNT) + (xAxisLabel ? 12 : 0);

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis
          dataKey="key"
          interval={0}
          tickLine={false}
          height={xAxisTicksRotate ? labelHeight : 30}
          tick={<CustomizedLabel xAxisTicksRotate={xAxisTicksRotate} />}
        >
          {xAxisLabel && <Label value={xAxisLabel} fontSize={12} offset={0} position="insideBottom" />}
        </XAxis>
        <YAxis interval={0} width={yAxisLabel ? 60 : 30} fontSize={12}>
          {yAxisLabel && <Label value={yAxisLabel} fontSize={12} angle={-90} />}
        </YAxis>
        <Bar dataKey="value">
          {data.map((entry, index) => {
            const c = colours && colours[index] ? colours[index] : colour;
            return (
              <Cell
                // cursor="pointer"
                fill={getColour(c, entry.key, filters, focused === entry.key)}
                key={`cell-${index}`}
              />
            )
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default focusedHOC(BarChartV2);
