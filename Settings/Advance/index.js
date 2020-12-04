import React from "react";

import Aux from "../../../components/_Aux";
import PantoCard from "../../../components/PantoCard";
import PantoInput from "../../../components/PantoInput";
import PantoButton from"../../../components/PantoButton";
import PantoRadio from "../../../components/PantoRadio";
import {deleteUser } from '../DataHandler'
import DeviceTripsTable from "./DeviceTripsTable";


import {Scrollbars} from "react-custom-scrollbars";
import GpsGuid from "./GpsGuid";
import PointMeaning from"./PointMeaning";
import * as moment from "moment";
import * as actionTypes from "../DataHandler/_actions";

import {isDisabled, isFocused} from "../DataHandler";
import {connect} from "react-redux";
import "../style.scss"

class Index extends React.Component {
    renderThumbY({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#4467A5',
            width: '4px',
            padding: 0,
            borderRadius: '5px'
        }
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackY({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "0px",
            bottom: "0px",
            top: "0px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }



    constructor(props) {
        super(props);

        this.state = {
            is_sign_up: false,
            doValidate: false,
            alert_message: '',
            success_modal_visible: false,

            email: '',

            news_letters: false
        }


    }

    validate = {

        email: [
            ['email', true]
        ],

    }


    field_validation = (field) => {
        let okay = true
        let valid = null
        for (let i = 0; i < this.validate[field].length; i++) {
            valid = this.validate[field][i]
                okay = false

        }
        return okay
    }

    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }


    $signUp = (response) => {
        this.setState({is_sign_up: false})

        let {ok, result, error, description, detail} = response;
        if (ok) {
            this.modal_dismiss()
            this.setState({
                alert_message: '',
                success_modal_visible: true
            })
        } else {
            this.setState({
                alert_message: description
            })
        }
    }


    handleSignUp = () => {
        let okay = true
        for (const field in this.validate) {
            if (!this.field_validation(field)) okay = false
        }
        if (okay) {
            const sign_up_fields = {
                email: this.state.email,
            }
            this.setState({is_sign_up: true, alert_message: ''})
        } else {
            this.setState({
                doValidate: true
            })
        }
    }



    modal_dismiss = () => {
        if (this.state.is_sign_up) return
        this.props.dismiss()
        this.setState({
            email: '',
            news_letters: false
        })
    }

    render() {



        const {

            gpsGuid,
            device_trips,
            setGuidGps,
            pointMeaning,
            setPoint,
            isFocused,
            deleteUser,
            setFocused,
            setBlurred
        } = this.props


        return (
            <PantoCard>
                <header>
                    <h6>Advance setting</h6>

                </header>


                <div className="advance-container">
                    <Scrollbars
                        ref="scrollbars"
                        renderThumbVertical={this.renderThumbY}
                        hideTracksWhenNotNeeded
                    >
                        <Aux>
                            <li  className="navigation-item navigation-menu-caption">
                                <hr/>
                                <label>Point meaning</label>
                            </li>
                        </Aux>

                        <div className="point-meaning">
                            <div className="sub-point">
                        <span>All events include a point if <span className="gps-span"> d {"<"} </span></span>
                            <PantoInput
                                containerClass="point-meaning-input"
                                value={pointMeaning.point}
                                onChange={setPoint}
                                onFocus={() => {
                                    setFocused('pointMeaning_point')
                                }}
                                onBlur={() => {
                                    setBlurred('pointMeaning_point')
                                }}
                                readOnly={!isFocused('pointMeaning_point')} />
                            <span className="unit">m</span >
                            </div>
                            <PointMeaning/>

                    </div>
                        <Aux>
                            <li  className="navigation-item navigation-menu-caption">
                                <hr/>
                                <label>GPS</label>
                            </li>
                        </Aux>

                    <div className="point-meaning">
                        <div className="sub-point">
                        <span>Ignor GPS point if <span className="gps-span"> L ></span></span>
                        <PantoInput
                            containerClass="point-meaning-input"
                            value={gpsGuid.gps}
                            onChange={setGuidGps}
                            onFocus={() => {
                                setFocused('gpsGuid_gps')
                            }}
                            onBlur={() => {
                                setBlurred('gpsGuid_gps')
                            }}
                            readOnly={!isFocused('gpsGuid_gps')}
                        />
                        <span className="unit">m</span >
                        </div>
                        <GpsGuid/>

                    </div>
                        <Aux>
                            <li  className="navigation-item navigation-menu-caption">
                                <hr/>
                                <label>Notifications</label>
                            </li>

                        </Aux>
                    <div className="advance-notification">
                        <PantoRadio
                            items={[
                                {
                                    label:
                                        <Aux>
                                            <label>send email when got notification</label>
                                            <PantoInput
                                                containerClass="radio-input-section"
                                                type="email"
                                                placeHolder="Email address"
                                                autocomplete="off"
                                                autocorrect="off"
                                                autocapitalize="off"
                                                spellcheck="false"
                                                value={this.state.email}
                                                name={'email'}
                                                disabled={this.state.is_sign_up}
                                                onChange={this.handleChange}
                                                roles={this.validate.email}
                                                doValidate={this.state.doValidate}


                                            />
                                        </Aux>

                                }]}/>
                        <PantoButton > Add Email </PantoButton>
                        <div className="panto-col hide-scrollbar" style={{width: "300px"}}>

                            <DeviceTripsTable
                                device_trips={device_trips}
                            />

                        </div>

                    </div>

                <Aux>
                    <li  className="navigation-item navigation-menu-caption">
                        <hr/>
                        <label>Trip</label>
                    </li>
                </Aux>


                    </Scrollbars>
                </div>

            </PantoCard>
        )
    }

}


const stt2prp = (state) => {
    return {
        device_trips: state.device_trips,
        point: state.point,
        gpsGuid: state.gpsGuid,
        pointMeaning:state.pointMeaning,
        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {

        setGuidGps: (value) => dispatch({type: actionTypes.CHANGE_GUID_GPS, value}),
        setPoint :(value) => dispatch({type: actionTypes.CHANGE_POINT_MEANING, value}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)
