import { useEffect, useState } from 'react';
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

// Constants
const conversion = {
    feet: 3,
    meter: 0.9144,
};

function App() {
    const [darkTheme, setDarkTheme] = useState(() => {
        if (localStorage && localStorage.getItem('darktheme')) {
            const savedTheme = JSON.parse(localStorage.getItem('darktheme'));
            console.log(
                `Retrieved darktheme = ${savedTheme} from local storage.`
            );
            return savedTheme;
        } else {
            // Issue w/ the local storage or getting the value for darktheme, set true by default.
            return true;
        }
    });
    const [clicksPerMOA, setClicksPerMOA] = useState(() => {
        if (localStorage && localStorage.getItem('clicksPerMOA')) {
            const _clicksPerMOA = JSON.parse(
                localStorage.getItem('clicksPerMOA')
            );
            console.log(
                `Retrieved clicksPerMOA = ${_clicksPerMOA} from local storage.`
            );
            return _clicksPerMOA;
        } else {
            // Issue w/ the local storage or getting the value for darktheme, set true by default.
            return '';
        }
    });
    const [otherValuesToTarget, setotherValuesToTarget] = useState({
        feet: 0,
        meter: 0,
    });
    const [yardsToTarget, setYardsToTarget] = useState(() => {
        if (localStorage && localStorage.getItem('yardsToTarget')) {
            const _yardsToTarget = JSON.parse(
                localStorage.getItem('yardsToTarget')
            );
            console.log(
                `Retrieved yardsToTarget = ${_yardsToTarget} from local storage.`
            );

            setotherValuesToTarget({
                feet: conversion.feet * _yardsToTarget,
                meter: conversion.meter * _yardsToTarget,
            });
            return _yardsToTarget;
        } else {
            // Issue w/ the local storage or getting the value for darktheme, set true by default.
            return '';
        }
    });
    const [inchesOffTarget, setinchesOffTarget] = useState('');
    const [clicks, setClicks] = useState(0);
    const [sectionOpen, setsectionOpen] = useState(true);

    function calculateClicks() {
        if (
            clicksPerMOA &&
            yardsToTarget &&
            inchesOffTarget &&
            typeof clicksPerMOA == 'number' &&
            typeof yardsToTarget == 'number' &&
            typeof inchesOffTarget == 'number' &&
            inchesOffTarget >= 0 &&
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
                setClicks(clicksOnScope.toFixed(3));
            } else {
                console.log(
                    `There was issue calculating clicks required in the MOA. ${clicksOnScope}`
                );
            }
        } else {
            console.log(
                `Verifying the inputs failed! Please fix the issues first.`,
                clicksPerMOA,
                yardsToTarget,
                inchesOffTarget,
                typeof inchesOffTarget
            );
        }
    }

    const _yardsToTarget = (valueInNumber, valueInString) => {
        if (
            (valueInNumber && typeof valueInNumber == 'number') ||
            valueInNumber === 0
        ) {
            setYardsToTarget(valueInNumber);

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

    useEffect(() => {
        if (localStorage) {
            if (darkTheme != null) {
                localStorage.setItem('darktheme', JSON.stringify(darkTheme));
            }
            if (clicksPerMOA) {
                localStorage.setItem(
                    'clicksPerMOA',
                    JSON.stringify(clicksPerMOA)
                );
            }
            if (yardsToTarget) {
                localStorage.setItem(
                    'yardsToTarget',
                    JSON.stringify(yardsToTarget)
                );
            }
            console.log(
                `Saved to local storage. darktheme = ${darkTheme}, clicksPerMOA = ${clicksPerMOA}, yardsToTarget = ${yardsToTarget}.`
            );
        }
    }, [darkTheme, clicksPerMOA, yardsToTarget]);

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
                    collapsible={true}
                    collapseProps={{
                        isOpen: sectionOpen,
                        onToggle: () => setsectionOpen(!sectionOpen),
                    }}
                >
                    <SectionCard padded={true}>
                        {/* <Playground /> */}
                        <ControlGroup vertical={true}>
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
                                    fill={true}
                                    defaultValue={clicksPerMOA}
                                    selectAllOnFocus={true}
                                />
                            </FormGroup>
                            <FormGroup
                                helperText={`Feet: ${otherValuesToTarget.feet}, Meters: ${otherValuesToTarget.meter}`}
                                label="Yards to target"
                                labelInfo="(required)"
                                // style={{ marginLeft: '10px' }}
                            >
                                <NumericInput
                                    title="Please provide yards to target, Note: YARDS."
                                    placeholder="Just the number"
                                    onValueChange={_yardsToTarget}
                                    defaultValue={yardsToTarget}
                                    min={0}
                                    fill={true}
                                    selectAllOnFocus={true}
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
                                    placeholder="Positive elevation or windage."
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
                                &nbsp; <Code code={clicks} /> clicks or&nbsp;
                                <Code code={`~${Math.floor(clicks)}`} /> clicks.
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
                        </ControlGroup>

                        <Footer />
                    </SectionCard>
                </Section>

                <Playground />
            </div>
        </div>
    );
}

const Code = ({ code }) => {
    return <code className="bp5-code">{code}</code>;
};

const Playground = () => {
    const [yardsToMOA, setYardsToMOA] = useState(100);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Section
            title={'Knowledgebase'}
            subtitle={'Learn how the above calculations are done!'}
            icon="info-sign"
            elevation={2}
            collapsible={true}
            collapseProps={{
                isOpen: isOpen,
                onToggle: () => setIsOpen(!isOpen),
            }}
        >
            <SectionCard padded={true}>
                <FormGroup
                    helperText={`1 MOA is ~${(
                        (yardsToMOA / 100) *
                        1.047
                    ).toFixed(
                        3
                    )} inches for ${yardsToMOA} yards. Floored: ${Math.floor(
                        (yardsToMOA / 100) * 1.047
                    ).toFixed(3)} inches`}
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
            </SectionCard>
        </Section>
    );
};

const Footer = () => {
    return (
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
                Made with {<Icon icon="heart" color="red" />} in Virginia.
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
                <a href="https://prashant.me">Prashant Shrestha</a>
            </Text>
        </ControlGroup>
    );
};

export default App;
