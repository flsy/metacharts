import * as React from 'react'
import focusedHOC from '../focusedHOC'
import { IDonutChart } from '../interfaces'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const DonutChartV2 = ({  data = [], height, valueFormat, isAnimationActive = true }: Pick<IDonutChart, 'data' | 'height' | 'valueFormat' | 'isAnimationActive'>) => (
  <ResponsiveContainer height={height}>
    <PieChart>
      <Tooltip formatter={(_a, _b, record) => [record?.payload?.value, record?.payload?.label]} />
      <Legend layout="vertical" formatter={(value, entry: any) => `${entry?.payload?.label}: ${valueFormat?.(entry?.payload?.value)}`} />
      <Pie data={data} dataKey="value" isAnimationActive={isAnimationActive}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.colour} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

export default focusedHOC(DonutChartV2)
