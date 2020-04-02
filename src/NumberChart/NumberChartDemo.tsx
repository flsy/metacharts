import * as React from "react";
import { NumberChart } from '../export';
import DemoContainer from '../DemoContainer';


const NumberChartDemo: React.FC = () => {

    return (
        <DemoContainer
            title="Number chart"
            data={50}
            settings={{ useCustomLabel: false, useCustomValueFormat: false }}
        >
            {(settings, input) => (
                <NumberChart
                    value={input}
                    label={settings.useCustomLabel ? 'custom label' : undefined}
                    valueFormat={settings.useCustomValueFormat ? (val) => `${val},-` : undefined}
                />
            )}
        </DemoContainer>
    );
};

export default NumberChartDemo;
