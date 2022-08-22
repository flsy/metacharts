import * as React from 'react'
import focusedHOC from '../focusedHOC'
import { IDonutChart } from '../interfaces'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface Props extends Pick<IDonutChart, 'data' | 'height' | 'valueFormat' | 'isAnimationActive'> {
  maxLegendItems?: {
    count: number;
    aggregatedLabel: string;
    aggregatedColor?: string;
  }
}


const renderLegend = (valueFormat, maxLegendItems?: Props['maxLegendItems']) => (props) => {
  let payload = props.payload
    .sort((a, b) => a?.payload?.value < b?.payload?.value ? 1 : -1)

  if(maxLegendItems && props.payload.length > maxLegendItems.count) {
    payload = payload.reduce((acc, curr, idx) => {
      if(idx < maxLegendItems.count) {
        acc.push(curr);
      } else {
        // Modify last item
        const item = acc[maxLegendItems.count - 1];
        acc[maxLegendItems.count -1] = {
          ...item,
          color: maxLegendItems.aggregatedColor ?? 'none',
          payload: {
            ...item.payload,
            label: maxLegendItems.aggregatedLabel,
            value: item.payload.value + curr.payload.value,
          }
        }
      }

      return acc;
    }, [])
  }

  return (
    <div>
      {
        payload
          .map((entry, index) => (
          <div key={`item-${index}`}>
            <span style={{
              height: "7px",
              width: "7px",
              marginRight: "3px",
              backgroundColor: entry?.color,
              borderRadius:'50%',
              display: 'inline-block'
            }}></span>
            {entry?.payload?.label}: {valueFormat?.(entry?.payload?.value)}</div>
        ))
      }
    </div>
  );
}

const DonutChartV2 = ({  data = [], height, valueFormat, isAnimationActive = true, maxLegendItems }: Props) => (
  <ResponsiveContainer height={height}>
    <PieChart>
      <Tooltip formatter={(_a, _b, record) => [record?.payload?.value, record?.payload?.label]} />
      <Legend layout="vertical" content={renderLegend(valueFormat, maxLegendItems)}  />
      <Pie data={data} dataKey="value" isAnimationActive={isAnimationActive}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.colour} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

export default focusedHOC(DonutChartV2)
