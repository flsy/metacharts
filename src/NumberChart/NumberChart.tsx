import * as React from "react";

import focusedHOC from "../focusedHOC";
import { tooltipFormat } from "../utils";
import { Motion, spring } from 'react-motion';

interface Props {
    value: number;
    label?: string;

    valueFormat?: (value: number) => string;
    tooltipValueFormat?: (value: number) => string;
}

const NumberChart: React.FC<Props> = ({ value, label, valueFormat, tooltipValueFormat, children }) => {

    return (
        <div className="NumberChart"
             title={`${label ? `${label}: ` : ""}${tooltipFormat(value, tooltipValueFormat, valueFormat)}`}>
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
