import React from "react";

import {PantoModals, Modal} from "../../../../components/PantoModal"
import PantoCalendar from "../../../../components/PantoCalendar"
import PantoButton from "../../../../components/PantoButton"


import DeviceTripsTable from "./DeviceTripsTable"
import DeviceTripsSelector from "./DeviceTripsSelector"

import {connect} from "react-redux";
import Aux from "../../../../components/_Aux";
import * as actions from "../../_DataHandler/_actions";
import {$API} from "../../../../../api/server";
import update from "react-addons-update";
import {RenderValidation} from "../../../../components/PantoValidation";


class Index extends React.Component {

    constructor(props) {
        super(props);

        this.setCalendarRange = this.setCalendarRange.bind(this)
        this.setStartDuration = this.setStartDuration.bind(this)
        this.setEndDuration = this.setEndDuration.bind(this)
        this.chooseDevice = this.chooseDevice.bind(this)
        this.selectShowTrip = this.selectShowTrip.bind(this)
        this.cancel = this.cancel.bind(this)
        this.okay = this.okay.bind(this)
        this.getTrips = this.getTrips.bind(this)
    }


    state = {
        start_duration: null,
        end_duration: null,

        _calendar_range: [null, null],

        _device_trips: [],

        device_index: null,
        show_trips: [],
        loading: false,

        isValid: true,
        checkValid: false
    }









    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.duration !== this.props.duration) {
            this.setState({
                start_duration: this.props.duration[0],
                end_duration: this.props.duration[1]
            })
        }
        if (prevProps.calendar_range !== this.props.calendar_range) {
            this.setState({
                _calendar_range: this.props.calendar_range
            }, () => {
                this.getTrips()
            })
        }




    }


    getTrips(){
        this.setState({loading: true})
        $API.getMyDevicesTrips({duration: this.state._calendar_range}, (response) => {
            if (response.ok) {
                const {result} = response
                let $ts = []
                for(let ii=0;ii<result.trips.length;ii++) {
                    if(ii >= 5) break;
                    $ts.push(ii)
                }
                this.setState({
                    _device_trips: result.trips || [],
                    show_trips: $ts,
                    device_index: ($ts.length > 0 ? 0 : null)
                })
            }
            this.setState({loading: false})
        })


    }


    checkValid = () => {
        return new Promise(resolve => {
            this.setState({checkValid: [true]}, () => {
                resolve('resolved');
            })
        });
    }


    okay = async () => {
        await this.checkValid()
        if (!this.state.isValid) return;
        this.props.openWhatWhenModal(false)

        if(this.state._device_trips!==this.props.device_trips) {
            this.props.setDevicesTrips(this.state._device_trips)
        }
        if(this.state.start_duration!==this.props.duration[0] || this.state.end_duration!==this.props.duration[1]){
            this.props.setDuration([this.state.start_duration, this.state.end_duration])
        }
        if(this.state.device_index!==this.props.device_index) {
            this.props.setDevice(this.state.device_index)
        }
        if(this.state._calendar_range[0]!==this.props.calendar_range[0] || this.state._calendar_range[1]!==this.props.calendar_range[1]) {
            this.props.setCalendarRange(this.state._calendar_range)
        }
        if(this.state.show_trips!==this.props.show_trips) {
            this.props.setShowTrips(this.state.show_trips)
        }
    }

    cancel = () => {
        this.props.openWhatWhenModal(false)
        this.setState({
            device_index: this.props.device_index,
            _calendar_range: this.props.calendar_range
        }, () => {
            this.setState({
                start_duration: this.props.duration[0],
                end_duration: this.props.duration[1],
                _device_trips: this.props.device_trips,
                show_trips: this.props.show_trips,
            })
        })
    }

    setCalendarRange(range) {
        this.setState({
            device_index: null,
            show_trips: [],
            _calendar_range: range
        }, () => {
            this.getTrips()
        })
    }

    setStartDuration(v) {
        this.setState({
            start_duration: v
        })
    }

    setEndDuration(v) {
        this.setState({
            end_duration: v
        })
    }

    selectShowTrip(id, value) {
        if (value) {
            if (!this.state.show_trips.includes(id)) {
                if (this.state.show_trips.length >= 5) {
                    this.props.addNotification({
                        children: "Maximum device is 5",
                        duration: 3000,
                    })
                } else {
                    this.setState({
                        show_trips: update(this.state.show_trips, {$push: [id]})
                    })
                }
            }
        } else {
            if (this.state.show_trips.length === 1) {
                this.props.addNotification({
                    children: "You must have one device",
                    duration: 3000,
                })
            } else {
                if (this.state.show_trips.includes(id)) {
                    const ii = this.state.show_trips.indexOf(id)
                    this.setState({
                        show_trips: update(this.state.show_trips, {$splice: [[ii, 1]]})
                    })
                }
            }
        }
    }

    chooseDevice(id) {
        this.setState({device_index: id})
    }

    render() {

        const {
            what_when_modal
        } = this.props

        const {
            start_duration,
            end_duration,

            _calendar_range,
            _device_trips,

            device_index,
            show_trips,

            loading,

            checkValid
        } = this.state

        const $footer_modal = <Aux>
            <PantoButton className={'outline'} onClick={this.cancel}>Cancel</PantoButton>
            <PantoButton onClick={this.okay}>Ok</PantoButton>
        </Aux>

        const $validation = what_when_modal ? <>
            <RenderValidation
                data={{
                    device: device_index,
                    duration: [this.state.start_duration, this.state.end_duration]
                }}
                rules={[
                    {
                        name: 'device',
                        valid: ["minValue", 0],
                        error: "Please select device"
                    },
                    {
                        name: 'duration',
                        valid: ["isDuration"],
                        error: "Duration is not valid"
                    }
                ]}
                setValid={(e) => {
                    this.setState({isValid: e})
                }}
                checkValid={checkValid}
            />
        </> : null

        return (
            <>
                <PantoModals>

                    <Modal
                        name={'customize-time'}
                        header={''}
                        footer={$footer_modal}
                        visible={what_when_modal}
                        dismiss={this.cancel}
                        loading={loading}
                    >

                        <div className="panto-row">
                            <div className="panto-col">
                                <PantoCalendar
                                    calendar_range={_calendar_range}
                                    setCalendarRange={this.setCalendarRange}
                                />
                            </div>

                            <div className="panto-col hide-scrollbar" style={{width: "300px"}}>

                                <DeviceTripsTable
                                    device_trips={_device_trips}
                                    show_trips_devices={show_trips}
                                    selected_device={device_index}
                                    selectShowTrip={this.selectShowTrip}
                                    chooseDevice={this.chooseDevice}
                                />

                            </div>

                        </div>

                        <div className="panto-row">

                            <div className="device-trips-selector">

                                <DeviceTripsSelector
                                    start_duration={start_duration}
                                    end_duration={end_duration}
                                    setStartDuration={this.setStartDuration}
                                    setEndDuration={this.setEndDuration}
                                    device_trips={_device_trips}
                                    calendar_range={_calendar_range}
                                    show_trips_devices={show_trips}
                                />

                            </div>

                        </div>


                    </Modal>

                </PantoModals>
                {$validation}
            </>
        )


    }

}

const stt2prp = (state) => {
    return {
        what_when_modal: state.what_when_modal,

        calendar_range: state.calendar_range,
        duration: state.duration,
        device_trips: state.device_trips,

        device_index: state.device_index,

        show_trips: state.show_trips,


        isDisabled: (item) => {
            return actions.isDisabled(state, item)
        }
    }
}

const dispatch2prp = (dispatch) => {
    return {

        openWhatWhenModal: (value) => actions.set(dispatch, 'what_when_modal', value),
        setCalendarRange: (value) => actions.set(dispatch, 'calendar_range', value),
        setDuration: (value) => actions.set(dispatch, 'duration', value),
        setDevicesTrips: (value) => actions.set(dispatch, 'device_trips', value),
        setShowTrips: (value) => actions.set(dispatch, 'show_trips', value),

        addNotification: (notify) => actions.addNotification(dispatch, notify),

        setDevice: (index) => actions.setDevice(dispatch, index),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)

