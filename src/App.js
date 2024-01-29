import { useState } from 'react'
import './styles/main.css'
import {
    Button,
    Card,
    ControlGroup,
    FormGroup,
    H3,
    Icon,
    InputGroup,
    NumericInput,
    Section,
    SectionCard,
    Slider,
    Spinner,
    Switch,
    Text,
} from '@blueprintjs/core'

// or using a ESM bundler which resolves CSS files as modules:
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
// include blueprint-icons.css for icon font support
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

function App() {
    const [darkTheme, setDarkTheme] = useState(true)
    const [yardsToMOA, setYardsToMOA] = useState(100)
    const [clicksPerMOA, setClicksPerMOA] = useState(null)
    const [yardsToTarget, setYardsToTarget] = useState(null)
    const [inchesOffTarget, setinchesOffTarget] = useState(null)
    const [clicks, setClicks] = useState(0)

    function calculateMOA(_inchesOffTarget) {
        const safeToCalculate = clicksPerMOA && yardsToTarget

        if (!safeToCalculate) {
        }
    }

    function calculateClicks(val) {
        const _inchesOffTarget = parseFloat(val)
        const inchesPerMOAAdjustment = yardsToTarget / 100
        const MOA = _inchesOffTarget / inchesPerMOAAdjustment
        const clicksOnScope = clicksPerMOA * MOA

        if (clicksOnScope) {
            setClicks(clicksOnScope)
        }

        // console.log(_inchesOffTarget, clicksOnScope, inchesPerMOAAdjustment, MOA)
    }

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
                    title={'Scope Calculation'}
                    subtitle={
                        'Assists with zero-ing your Red Dot Sight using MOA.'
                    }
                    icon="ammunition"
                    elevation={1}
                    collapsible={false}
                >
                    <SectionCard padded={true}>
                        <FormGroup
                            helperText={`1 MOA is ${
                                (yardsToMOA / 100) * 1.047
                            } for ${yardsToMOA} yards. Floored: ${Math.floor(
                                (yardsToMOA / 100) * 1.047
                            ).toFixed(2)}`}
                            label="Play around (not required for calculation)"
                            labelFor="playground"
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
                                label="Clicks per MOA."
                                labelFor="clicksPerMOA"
                                labelInfo="(required)"
                            >
                                <NumericInput
                                    onValueChange={(val) =>
                                        setClicksPerMOA(val)
                                    }
                                    // fill={true}
                                    leftIcon={<Icon icon="numerical" />}
                                    placeholder="1 click per MOA, maybe?"
                                    title="1 click per MOA, maybe?"
                                />
                            </FormGroup>
                            <FormGroup
                                helperText="How far is your target? (in yards)"
                                label="Yards to target"
                                labelFor="yardsToTarget"
                                labelInfo="(required)"
                                style={{ marginLeft: '10px' }}
                            >
                                <NumericInput
                                    title="Please provide yards to target, Note: YARDS."
                                    placeholder="Just the number"
                                    onValueChange={(val) =>
                                        setYardsToTarget(val)
                                    }
                                    leftIcon={<Icon icon="numerical" />}
                                />
                            </FormGroup>
                        </ControlGroup>
                        <ControlGroup fill={true} vertical={false}>
                            <FormGroup
                                label="Inches off target"
                                labelFor="inchesOffTarget"
                                labelInfo="(required)"
                                // fill={true}
                            >
                                <NumericInput
                                    title="Provide positive value whether it be elevation/windage."
                                    placeholder="Provide positive value whether it be elevation/windage."
                                    fill={true}
                                    leftIcon={<Icon icon="numerical" />}
                                    onValueChange={(val) =>
                                        calculateClicks(val)
                                    }
                                />
                            </FormGroup>
                        </ControlGroup>
                        <FormGroup
                            labelFor="inchesOffTarget"
                            fill={true}
                            style={{
                                paddingTop: '10px',
                                paddingBottom: '10px',
                            }}
                        >
                            <Text style={{ fontSize: '14px' }}>
                                <Icon icon="calculator" />
                                &nbsp; {clicks} clicks required!
                            </Text>
                        </FormGroup>
                        <Text
                            // fill={true}
                            style={{
                                textAlign: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            Copyright &copy; 2024, Prashant Shrestha
                        </Text>
                    </SectionCard>
                </Section>
            </div>
        </div>
    )
}

export default App
