import { useState } from 'react';
import './styles/main.css';
import {
    Button,
    ControlGroup,
    FormGroup,
    Icon,
    NumericInput,
    Section,
    SectionCard,
    Slider,
    Switch,
    Text,
} from '@blueprintjs/core';

// or using a ESM bundler which resolves CSS files as modules:
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
// include blueprint-icons.css for icon font support
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

function App() {
    const [darkTheme, setDarkTheme] = useState(true);
    const [yardsToMOA, setYardsToMOA] = useState(100);
    const [clicksPerMOA, setClicksPerMOA] = useState(null);
    const [otherValuesToTarget, setotherValuesToTarget] = useState({
        feet: 0,
        meter: 0,
    });
    const [yardsToTarget, setYardsToTarget] = useState(null);
    const [inchesOffTarget, setinchesOffTarget] = useState(null);
    const [clicks, setClicks] = useState(0);

    function calculateClicks() {
        if (
            clicksPerMOA &&
            yardsToTarget &&
            inchesOffTarget &&
            typeof clicksPerMOA == 'number' &&
            typeof yardsToTarget == 'number' &&
            typeof inchesOffTarget == 'number' &&
            inchesOffTarget > 0 &&
            clicksPerMOA > 0
        ) {
            const _inchesOffTarget = parseFloat(inchesOffTarget);
            const inchesPerMOAAdjustment = yardsToTarget / 100;
            const MOA = _inchesOffTarget / inchesPerMOAAdjustment;
            const clicksOnScope = clicksPerMOA * MOA;

            if (
                clicksOnScope &&
                typeof clicksOnScope == 'number' &&
                clicksOnScope >= 0
            ) {
                setClicks(clicksOnScope);
            } else {
                console.log(
                    `There was issue calculating clicks required in the MOA. ${clicksOnScope}`
                );
            }
        } else {
            console.log(
                `Verifying the inputs failed! Please fix the issues first.`
            );
        }
    }

    const _yardsToTarget = (valueInNumber, valueInString) => {
        if (
            (valueInNumber && typeof valueInNumber == 'number') ||
            valueInNumber === 0
        ) {
            setYardsToTarget(valueInNumber);

            let conversion = {
                feet: 3,
                meter: 0.9144,
            };

            let converted = {
                feet: conversion.feet * valueInNumber,
                meter: conversion.meter * valueInNumber,
            };

            setotherValuesToTarget(converted);
            console.log(valueInNumber, converted);
        }
    };

    const resetFields = () => {
        // setYardsToMOA(100)
        setClicksPerMOA('');
        setYardsToTarget('');
        setinchesOffTarget('');
        setClicks(0);
    };

    return (
        <div
            className={darkTheme ? 'main bp5-dark' : 'main'}
            style={{ background: darkTheme ? '#30343b' : '#ffffff' }}
        >
            <div className="main-wrapper">
                <Switch
                    defaultChecked={darkTheme}
                    labelElement={<Icon icon={darkTheme ? 'moon' : 'flash'} />}
                    onClick={() => setDarkTheme(!darkTheme)}
                />
                <Section
                    title={'Zero your Red Dot Sight'}
                    subtitle={'Assists with zero-ing your Red Dot Sight.'}
                    icon="ammunition"
                    elevation={2}
                    collapsible={false}
                >
                    <SectionCard padded={true}>
                        <FormGroup
                            helperText={`1 MOA is ${
                                (yardsToMOA / 100) * 1.047
                            } inches for ${yardsToMOA} yards. Floored: ${Math.floor(
                                (yardsToMOA / 100) * 1.047
                            ).toFixed(2)} inches`}
                            label="Play around (not required for calculation)"
                        >
                            <Slider
                                initialValue={100}
                                max={1000}
                                min={100}
                                stepSize={100}
                                value={yardsToMOA}
                                onChange={(value) => setYardsToMOA(value)}
                                labelRenderer={true}
                                labelStepSize={100}
                                showTrackFill={true}
                            ></Slider>
                        </FormGroup>
                        <ControlGroup vertical={false}>
                            <FormGroup
                                helperText="Check your RDS or RDS manual."
                                label={`Clicks per MOA.`}
                                labelInfo="(required)"
                            >
                                <NumericInput
                                    onValueChange={setClicksPerMOA}
                                    leftIcon={<Icon icon="numerical" />}
                                    placeholder="1 click per MOA, maybe?"
                                    title="1 click per MOA, maybe?"
                                    min={0}
                                />
                            </FormGroup>
                            <FormGroup
                                helperText={`Feet: ${otherValuesToTarget.feet}, Meters: ${otherValuesToTarget.meter}`}
                                label="Yards to target"
                                labelInfo="(required)"
                                style={{ marginLeft: '10px' }}
                            >
                                <NumericInput
                                    title="Please provide yards to target, Note: YARDS."
                                    placeholder="Just the number"
                                    onValueChange={_yardsToTarget}
                                    min={0}
                                    leftIcon={<Icon icon="numerical" />}
                                />
                            </FormGroup>
                        </ControlGroup>
                        <ControlGroup fill={true} vertical={false}>
                            <FormGroup
                                label="Inches off target"
                                labelInfo="(required)"
                            >
                                <NumericInput
                                    title="Provide positive value whether it be elevation/windage."
                                    placeholder="Provide positive value whether it be elevation/windage."
                                    fill={true}
                                    leftIcon={<Icon icon="numerical" />}
                                    min={0}
                                    onValueChange={(val) =>
                                        setinchesOffTarget(val)
                                    }
                                />
                            </FormGroup>
                        </ControlGroup>
                        <FormGroup fill={true}>
                            <Text style={{ fontSize: '14px' }}>
                                <Icon icon="calculator" />
                                &nbsp; {clicks} clicks or ~{Math.floor(clicks)}{' '}
                                clicks.
                            </Text>
                        </FormGroup>
                        <ControlGroup
                            fill={false}
                            style={{
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                icon="calculator"
                                text="Calculate"
                                style={{ outline: 'none' }}
                                onClick={calculateClicks}
                                fill={true}
                            />
                            {/* <Button
                                icon="refresh"
                                text="Reset"
                                style={{ outline: 'none', marginLeft: '10px' }}
                                onClick={resetFields}
                            /> */}
                        </ControlGroup>
                        <ControlGroup
                            fill={true}
                            style={{
                                marginTop: '20px',
                                flexDirection: 'column',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    width: '100%',
                                }}
                            >
                                Made with {<Icon icon="heart" color="red" />} in
                                Virginia.
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                }}
                            >
                                Copyright &copy; 2024,{' '}
                                <a href="https://prashant.me">
                                    Prashant Shrestha
                                </a>
                            </Text>
                        </ControlGroup>
                    </SectionCard>
                </Section>
            </div>
        </div>
    );
}

export default App;
