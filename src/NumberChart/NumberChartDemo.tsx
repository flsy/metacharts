import * as React from "react";
import { NumberChart } from '../export';
import DemoContainer from '../DemoContainer';
import './demo.css';

const NumberChartDemo: React.FC = () => {

    return (
        <DemoContainer
            title="Number chart"
            data={50}
            settings={{ useCustomLabel: false, useCustomValueFormat: true }}
        >
            {(settings, input) => (
                <NumberChart
                    width={200}
                    color="#88BB88"
                    value={input}
                    label={settings.useCustomLabel ? 'custom label' : undefined}
                    valueFormat={settings.useCustomValueFormat ? (val) => `${Math.floor(val)},-` : undefined}
                />
            )}
        </DemoContainer>
    );
};

export default NumberChartDemo;
