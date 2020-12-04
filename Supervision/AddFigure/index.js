import React from "react";
import PantoSelectList from "../../../components/PantoSelectList";

import {connect} from "react-redux";
import PantoButton from "../../../components/PantoButton";
import {PantoModals, Modal} from "../../../components/PantoModal";
import PantoSwitchButton from "../../../components/PantoSwitchButton";
import PantoRadio from "../../../components/PantoRadio";
import PantoInput from "../../../components/PantoInput";
import Api from "../../../../api";
import * as actionTypes from "../_DataHandler/_actions";
import Aux from "../../../components/_Aux";

class Index extends React.Component {



    state = {
        loading: false,

        $sensor_type_open: false,
        $signal_filter_open: false,


        figure_type: 'acceleration-1',
        figure_option: 'z',

        threshold: false,
        threshold_type: 'default',
        threshold_manually_values: ['', '', ''],

        signal_filter: false,
        signal_filter_type: 'window-rms',

        window_length: 1,
        overlap: 0.1,
    }

    default_state = {
        loading: false,

        $sensor_type_open: false,
        $signal_filter_open: false,

        figure_type: 'acceleration-1',
        figure_option: 'z',

        threshold: false,
        threshold_type: 'default',
        threshold_manually_values: ['', '', ''],

        signal_filter: false,
        signal_filter_type: 'window-rms',

        window_length: 1,
        overlap: 0.1,
    }


    cancel = () => {
        this.props.set('add_figure_open', false)
    }

    okay = () => {
        const {
            figure_type,
            figure_option,

            threshold,
            threshold_type,
            threshold_manually_values,

            signal_filter,
            signal_filter_type,

            window_length,
            overlap

        } = this.state


        const figure = {
            figure_type,
            figure_option,
            threshold,
            threshold_type,
            threshold_manually_values,
            signal_filter,
            signal_filter_type,
            window_length: (window_length + 's'),
            overlap
        }

        this.props.set('figure_properties', figure)

        this.props.set('add_figure_open', false)

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.figure_properties !== this.props.figure_properties) {
            if (!this.props.figure_properties) {
                this.setState(this.default_state)
            }
            else {
                this.setState({
                    loading: true
                })
            }
        }
        else if (prevState.figure_type !== this.state.figure_type) {
            if(this.state.figure_type.startsWith('acceleration')) this.setState({
                figure_option: 'z',
                signal_filter: false,
                threshold: false
            })
            else if(this.state.figure_type==='temperature') this.setState({
                figure_option: 'in',
                signal_filter: false,
                threshold: false
            })
            else if(this.state.figure_type==='electricity') this.setState({
                figure_option: 'battery',
                signal_filter: false,
                threshold: false
            })
        }
    }


    render() {

        const {
            loading,

            figure_type,
            figure_option,

            threshold,
            threshold_type,
            threshold_manually_values,

            signal_filter,
            signal_filter_type,

            window_length,
            overlap,

            $sensor_type_open,
            $signal_filter_open

        } = this.state

        const threshold_default = [0.8, 1, 1.2]


        const _disabled_mth = !threshold || threshold_type === 'default'


        let figure_list
        let gg = new Array(this.props.device_acceleration).fill(0)
        figure_list = gg.map((v, i)=>{
            return {
                name: `Acceleration-${i+1}`,
                value: `acceleration-${i+1}`
            }
        })
        figure_list.push({
            name: `Temperature`,
            value: `temperature`
        })
        figure_list.push({
            name: `Electricity`,
            value: `electricity`
        })


        const $footer = <Aux>
            <PantoButton
                className={'outline'}
                onClick={this.cancel}
            >
                Cancel
            </PantoButton>

            <PantoButton
                onClick={this.okay}
            >
                Ok
            </PantoButton>
        </Aux>


        return (
            <div className="add-figure-container">

                <PantoButton
                    onClick={() => {
                        this.props.set('add_figure_open', true)
                    }}
                    disabled={this.props.loading_signal}
                >
                    Add a figure
                </PantoButton>


                <PantoModals>

                    <Modal
                        name={'add-figure'}
                        header={'Figure property'}
                        footer={$footer}
                        visible={this.props.add_figure_open}
                        loading={loading}
                        dismiss={this.cancel}
                    >


                        <div className="panto-row">

                            <div className="panto-col">

                                <div className="figure-property-section">

                                    <div className="sensor-type-label">
                                        <label>Figure type</label>
                                    </div>
                                    <PantoSelectList
                                        items={figure_list}
                                        placeholder={"Figure type"}
                                        value={figure_type}
                                        disabled={false}
                                        open={$sensor_type_open}
                                        onOpen={() => {
                                            this.setState({$sensor_type_open: true})
                                        }}
                                        onClose={() => {
                                            this.setState({$sensor_type_open: false})
                                        }}
                                        onChange={(value) => {
                                            this.setState({figure_type: value})
                                        }}
                                    />


                                    {figure_type.startsWith('acceleration') ?
                                        <div className="figure-option">
                                            <PantoRadio
                                                items={[
                                                    {
                                                        value: 'x',
                                                        label: <label>x</label>
                                                    },
                                                    {
                                                        value: 'y',
                                                        label: <label>y</label>
                                                    },
                                                    {
                                                        value: 'z',
                                                        label: <label>z</label>
                                                    }
                                                ]}
                                                value={figure_option}
                                                onChange={(value) => {
                                                    this.setState({figure_option: value})
                                                }}
                                            />
                                        </div>
                                        : null}


                                    {figure_type === 'temperature' ?
                                        <div className="figure-option">
                                            <PantoRadio
                                                items={[
                                                    {
                                                        value: 'out',
                                                        label: <label>out</label>
                                                    },
                                                    {
                                                        value: 'in',
                                                        label: <label>in</label>
                                                    }
                                                ]}
                                                value={figure_option}
                                                onChange={(value) => {
                                                    this.setState({figure_option: value})
                                                }}
                                            />
                                        </div>
                                        : null}

                                    {figure_type === 'electricity' ?
                                        <div className="figure-option">
                                            <PantoRadio
                                                items={[
                                                    {
                                                        value: 'battery',
                                                        label: <label>battery</label>
                                                    },
                                                    {
                                                        value: 'solar',
                                                        label: <label>solar</label>
                                                    },
                                                    {
                                                        value: 'turbine',
                                                        label: <label>turbine</label>
                                                    }
                                                ]}
                                                value={figure_option}
                                                onChange={(value) => {
                                                    this.setState({figure_option: value})
                                                }}
                                            />
                                        </div>
                                        : null}

                                </div>


                            </div>

                            <div className="panto-col">


                                <div className="figure-property-section" style={{marginLeft: "80px"}}>

                                    <PantoSwitchButton
                                        value={threshold}
                                        onChange={(value) => {
                                            if(!this.state.figure_type.startsWith('acceleration')) return;
                                            this.setState({threshold: value})
                                        }}
                                        label={<label>Threshold</label>}
                                    />

                                    <div className="threshold-type">
                                        <PantoRadio
                                            items={[
                                                {
                                                    value: 'default',
                                                    label: <div className="threshold-label">
                                                        <label>Default</label>
                                                        <div className="threshold-property" style={{display: (threshold_type==='default' ? "flex" : "none")}}>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_default[0]}
                                                                    readOnly={true}
                                                                    disabled={!threshold}
                                                                />
                                                                <label className={(!threshold ? "disabled" : "")}>(g)</label>
                                                            </div>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_default[1]}
                                                                    readOnly={true}
                                                                    disabled={!threshold}
                                                                />
                                                                <label className={(!threshold ? "disabled" : "")}>(g)</label>
                                                            </div>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_default[2]}
                                                                    readOnly={true}
                                                                    disabled={!threshold}
                                                                />
                                                                <label className={(!threshold ? "disabled" : "")}>(g)</label>
                                                            </div>


                                                        </div>
                                                    </div>
                                                },
                                                {
                                                    value: 'manually',
                                                    label: <div className="threshold-label">
                                                        <label>Manually</label>
                                                        <div className="threshold-property" style={{display: (threshold_type==='manually' ? "flex" : "none")}}>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_manually_values[0]}
                                                                    onChange={(value) => {
                                                                        threshold_manually_values[0] = value
                                                                        this.setState({threshold_manually_values})
                                                                    }}
                                                                    disabled={_disabled_mth}
                                                                />
                                                                <label className={(_disabled_mth ? "disabled" : "")}>(g)</label>
                                                            </div>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_manually_values[1]}
                                                                    onChange={(value) => {
                                                                        threshold_manually_values[1] = value
                                                                        this.setState({threshold_manually_values})
                                                                    }}
                                                                    disabled={_disabled_mth}
                                                                />
                                                                <label className={(_disabled_mth ? "disabled" : "")}>(g)</label>
                                                            </div>

                                                            <div>
                                                                <PantoInput
                                                                    value={threshold_manually_values[2]}
                                                                    onChange={(value) => {
                                                                        threshold_manually_values[2] = value
                                                                        this.setState({threshold_manually_values})
                                                                    }}
                                                                    disabled={_disabled_mth}
                                                                />
                                                                <label className={(_disabled_mth ? "disabled" : "")}>(g)</label>
                                                            </div>


                                                        </div>
                                                    </div>
                                                }
                                            ]}
                                            value={threshold_type}
                                            onChange={(value) => {
                                                this.setState({threshold_type: value})
                                            }}
                                            disabled={!threshold}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="panto-row">

                            <div className="panto-col">

                                <div className="figure-property-section">

                                    <PantoSwitchButton
                                        value={signal_filter}
                                        onChange={(value) => {
                                            if(!this.state.figure_type.startsWith('acceleration')) return;
                                            this.setState({signal_filter: value})
                                        }}
                                        label={<label>signal filter</label>}
                                    />


                                    <PantoSelectList
                                        items={[
                                            {
                                                name: "window rms",
                                                value: "window-rms"
                                            },
                                            {
                                                name: "window std",
                                                value: "window-std"
                                            },
                                            {
                                                name: "fft",
                                                value: "fft"
                                            }
                                        ]}
                                        placeholder={"signal filter"}
                                        value={signal_filter_type}
                                        disabled={!signal_filter}
                                        open={$signal_filter_open}
                                        onOpen={() => {
                                            this.setState({$signal_filter_open: true})
                                        }}
                                        onClose={() => {
                                            this.setState({$signal_filter_open: false})
                                        }}
                                        onChange={(value) => {
                                            this.setState({signal_filter_type: value})
                                        }}
                                    />


                                    <div className="signal-filter-properties">

                                        <div>
                                            <label className={(!signal_filter ? "disabled" : "")}>window length</label>
                                            <PantoInput
                                                value={window_length}
                                                onChange={(value) => {
                                                    this.setState({window_length: value})
                                                }}
                                                disabled={!signal_filter}
                                            />
                                            <label className={(!signal_filter ? "disabled" : "")}>(s)</label>
                                        </div>

                                        <div>
                                            <label className="disabled">Overlap</label>
                                            <PantoInput
                                                value={overlap}
                                                onChange={(value) => {
                                                    this.setState({overlap: value})
                                                }}
                                                disabled={true}
                                            />
                                            <label className="disabled">(s)</label>
                                        </div>

                                    </div>

                                </div>


                            </div>


                        </div>


                    </Modal>

                </PantoModals>

            </div>
        )

    }

}

const stt2prp = (state) => {
    return {
        figure_properties: state.figure_properties,
        add_figure_open: state.add_figure_open,
        device_acceleration: state.device_acceleration,
        loading_signal: state.loading_signal
    }
}

const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: actionTypes.SET, state, value}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)