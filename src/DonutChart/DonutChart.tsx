import { arc, pie } from 'd3'
import * as React from 'react'
import { Motion, spring } from 'react-motion'

import focusedHOC, { InjectedProps } from '../focusedHOC'
import { getColour, tooltipFormat } from '../utils'
import { IDonutChart, IDonutChartData } from '../interfaces'

const TableContent = ({
                        maxTableRows,
                        index,
                        rowHeight,
                        label,
                        focused,
                        onFilter,
                        onFocus,
                        isAnimationActive,
                        colour,
                        valueFormat,
                        val,
                        cursor,
                      }: any) => {
  if (maxTableRows && index >= maxTableRows) {
    return <></>
  }
  const circleR = rowHeight / 2
  const circleSize = label === focused ? circleR : 6
  return (
    <tr
      onClick={onFilter ? () => onFilter(label) : undefined}
      onMouseOver={() => onFocus(label || undefined)}
      onMouseOut={() => onFocus(undefined)}
      style={{ cursor, height: rowHeight }}
    >
      <td>
        <svg height={rowHeight} width={rowHeight}>
          {isAnimationActive ?
            <Motion defaultStyle={{ x: 0 }} style={{ x: spring(circleSize) }}>
              {({ x }) => (<circle cx={circleR} cy={circleR} r={x} fill={colour}/>)}
            </Motion>
            : <circle cx={circleR} cy={circleR} r={circleSize} fill={colour}/>
          }
        </svg>
      </td>
      <td>{label}</td>
      <td>{valueFormat ? valueFormat(val) : val}</td>
    </tr>
  )
}

const DonutChart = ({
                      data = [],
                      width,
                      height,
                      filters = [],
                      onFilter,
                      onFocus,
                      focused,
                      children,
                      valueFormat,
                      tooltipValueFormat,
                      maxTableRows,
                      isAnimationActive = true,
                    }: IDonutChart & InjectedProps) => {

  const cursor = onFilter ? 'pointer' : 'default'
  const margin = { top: 10, right: 10, bottom: 10, left: 10 }

  const rowHeight = 20
  const tableTopMargin = rowHeight
  const tableHeight = maxTableRows ? rowHeight * maxTableRows : rowHeight * data.length
  const donutHeight = height - tableHeight - tableTopMargin - margin.top - margin.left
  const donutWidth = width - margin.left - margin.right
  const getPie = pie<IDonutChartData>().value((d: IDonutChartData): number => d.value)

  const radius = Math.min(donutWidth, donutHeight) / 2

  const getArc: any = arc()
    .outerRadius(radius)
    .innerRadius(radius - (radius / 5))

  return (
    <div className="DonutChart" style={{ width, height }}>
      <svg width={donutWidth} height={donutHeight}
           style={{ margin: `${margin.top}px ${margin.left}px ${tableTopMargin}px ${margin.left}px` }}>
        <g transform={`translate(${donutWidth / 2}, ${(donutHeight / 2)})`}>
          {getPie(data)
            .filter((d) => !!d.data.colour)
            .map((slice) => (
              <Motion
                key={`${slice.data.label}-${slice.data.value}`}
                defaultStyle={{
                  startAngle: slice.startAngle,
                  endAngle: slice.endAngle,
                  padAngle: slice.padAngle,
                }}
                style={{
                  startAngle: isAnimationActive ? spring(slice.startAngle) : slice.startAngle,
                  endAngle: isAnimationActive ? spring(slice.endAngle) : slice.endAngle,
                  padAngle: isAnimationActive ? spring(slice.padAngle) : slice.padAngle,
                }}
              >
                {(value) => (
                  <g>
                    <path
                      fill={getColour(slice.data.colour, slice.data.label, filters, slice.data.label === focused)}
                      d={getArc(value)}
                      stroke="white"
                      strokeWidth={1}
                      cursor={cursor}
                      onClick={
                        onFilter
                          ? (event) => onFilter(slice.data.label)
                          : undefined
                      }
                      onMouseOver={() => onFocus(slice.data.label || undefined)}
                      onMouseOut={() => onFocus(undefined)}
                    />
                    <title>
                      {`${slice.data.label ? `${slice.data.label}: ` : ''}${tooltipFormat(slice.data.value, tooltipValueFormat, valueFormat)}`}
                    </title>
                  </g>
                )}
              </Motion>
            ))}
          {children}
        </g>
      </svg>
      <table cellSpacing={0} cellPadding={0} style={{
        border: 'none',
        borderCollapse: 'collapse',
        margin: `0 ${margin.left}px ${margin.bottom}px ${margin.left}px`,
      }}>
        {data.filter((d) => !!d.label).map(({ label, value, colour }, index) => (
          isAnimationActive ? <Motion
            key={label}
            defaultStyle={{ x: 0 }}
            style={{ x: spring(value, { precision: 10 }) }}
          >
            {(val) => (
              <TableContent
                maxTableRows={maxTableRows}
                index={index}
                rowHeight={rowHeight}
                label={label}
                focused={focused}
                onFilter={onFilter}
                onFocus={onFocus}
                isAnimationActive={isAnimationActive}
                colour={colour}
                valueFormat={valueFormat}
                val={val.x}
                cursor={cursor}
              />
            )}
          </Motion> : <TableContent
            maxTableRows={maxTableRows}
            index={index}
            rowHeight={rowHeight}
            label={label}
            focused={focused}
            onFilter={onFilter}
            onFocus={onFocus}
            isAnimationActive={isAnimationActive}
            colour={colour}
            valueFormat={valueFormat}
            val={value}
            cursor={cursor}/>
        ))}
      </table>
    </div>
  )
}

export default focusedHOC(DonutChart)
