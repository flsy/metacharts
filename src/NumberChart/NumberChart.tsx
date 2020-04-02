import * as React from "react";
import { Motion, spring } from 'react-motion';

import focusedHOC from "../focusedHOC";
import { tooltipFormat } from "../utils";
import { INumberChart } from '../interfaces';

const NumberChart: React.FC<INumberChart> = ({ value, label, valueFormat, tooltipValueFormat, width , color, children }) => {
    return (
        <div
            className="NumberChart"
            title={`${label ? `${label}: ` : ""}${tooltipFormat(value, tooltipValueFormat, valueFormat)}`}
            style={{ width: `${width}px`, height: `${width}px`, backgroundColor: color, lineHeight: `${width}px` }}
        >
            {children}

            <Motion
                key={label}
                defaultStyle={{ x: 0 }}
                style={{ x: spring(value, { precision: 10 }) }}
            >
                {(val) => <div className="value">{valueFormat ? valueFormat(val.x) : val.x}</div>}
            </Motion>
        </div>
    );
};

export default focusedHOC(NumberChart);
