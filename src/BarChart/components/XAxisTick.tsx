import React from 'react'

interface IProps {
  x?: number;
  y?: number;
  payload?: any;
  xAxisTicksRotate: boolean;
  onMouseEnter: (label: string) => void
  onMouseLeave: (label: string) => void
}

const XAxisTick = ( { x, y, payload, xAxisTicksRotate, onMouseEnter, onMouseLeave }: IProps) => {
  const isAbbreviated = payload.value.length > 15;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-12}
        dy={16}
        fontSize={12}
        textAnchor={xAxisTicksRotate ? "end" : "middle"}
        fill="#666"
        transform={xAxisTicksRotate ? "rotate(-90)" : ''}
        onMouseEnter={() => onMouseEnter(payload.value)}
        onMouseLeave={() => onMouseLeave(payload.value)}
      >
        {`${payload.value.substr(0, 15)}${isAbbreviated ? '...' : ''}`}
      </text>
    </g>
  );
}

export default XAxisTick;
