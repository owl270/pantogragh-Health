import React from "react";
import PantoInput from "../../../components/PantoInput";

import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";


class Index extends React.Component {


    render() {

        const {
            zig_zag,
            setZigZagRightRed,
            setZigZagRightWhite,
            setZigZagRightYellow,

            setZigZagLeftRed,
            setZigZagLeftWhite,
            setZigZagLeftYellow,

            isFocused,
            setFocused,
            setBlurred
        } = this.props



        return (
            <div className="parametr-group">
                <label className="parametr-label">Zig-Zag</label>

                <div className="parametr-content-second">

                    <div className="sub-lable">
                        <span>Right limite</span>
                        <div className="content-limit">
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-white-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#9FA2A9'}}
                                        value={zig_zag.whiteRight}
                                        onChange={setZigZagRightWhite}
                                        onFocus={() => {
                                            setFocused('zig_zag_whiteRight')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_whiteRight')
                                        }}
                                        readOnly={!isFocused('zio_zag_whiteRight')}
                                    />
                                    <span className="white">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-yellow-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A17D48'}}
                                        value={zig_zag.yellowRight}
                                        onChange={setZigZagRightYellow}
                                        onFocus={() => {
                                            setFocused('zig_zag_yellowRight')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_yellowRight')
                                        }}
                                        readOnly={!isFocused('zig_zag_yellowRight')}
                                    />
                                    <span className="yellow">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-red-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A25154'}}
                                        value={zig_zag.redRight}
                                        onChange={setZigZagRightRed}
                                        onFocus={() => {
                                            setFocused('zig_zag_redRight')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_redRight')
                                        }}
                                        readOnly={!isFocused('zig_zag_redRight')}
                                    />
                                    <span className="red">cm</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="sub-lable">
                        <span className="subtitle">Left limite</span>
                        <div className="content-limit">
                            <div className="icon-input">
                                <i className={'icon panto-icon ph-white-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#9FA2A9'}}
                                        value={zig_zag.whiteLeft}
                                        onChange={setZigZagLeftWhite}
                                        onFocus={() => {
                                            setFocused('zig_zag_whiteLeft')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_whiteLeft')
                                        }}
                                        readOnly={!isFocused('zig_zag_whiteLeft')}
                                    />
                                    <span className="white">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-yellow-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A17D48'}}
                                        value={zig_zag.yellowLeft}
                                        onChange={setZigZagLeftYellow}
                                        onFocus={() => {
                                            setFocused('zig_zag_yellowLeft')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_yellowLeft')
                                        }}
                                        readOnly={!isFocused('zig_zag_yellowLeft')}
                                    />
                                    <span className="yellow">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-red-zig-zog'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A25154'}}
                                        value={zig_zag.redLeft}
                                        onChange={setZigZagLeftRed}
                                        onFocus={() => {
                                            setFocused('zig_zag_redLeft')
                                        }}
                                        onBlur={() => {
                                            setBlurred('zig_zag_redLeft')
                                        }}
                                        readOnly={!isFocused('zig_zag_redLeft')}
                                    />
                                    <span className="red">cm</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

}





const stt2prp = (state) => {
    return {
        zig_zag: state.zig_zag,
        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {

        setZigZagRightRed: (value) => dispatch({type: actionTypes.CHANGE_RIGHT_RED, value}),
        setZigZagRightWhite: (value) => dispatch({type: actionTypes.CHANGE_RIGHT_WHITE, value}),
        setZigZagRightYellow: (value)=> dispatch({type: actionTypes.CHANGE_RIGHT_YELLOW, value}),

        setZigZagLeftRed: (value) => dispatch({type: actionTypes.CHANGE_LEFT_RED, value}),
        setZigZagLeftWhite: (value) => dispatch({type: actionTypes.CHANGE_LEFT_WHITE, value}),
        setZigZagLeftYellow: (value) => dispatch({type: actionTypes.CHANGE_LEFT_YELLOW, value}),

        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)