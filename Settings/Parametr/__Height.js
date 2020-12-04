
import React from "react";
import PantoInput from "../../../components/PantoInput";

import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";


class Index extends React.Component {


    render() {

        const {
            height,
            setHeightUpRed,
            setHeightUpWhite,
            setHeightUpYellow,

            setHeightDownRed,
            setHeightDownWhite,
            setHeightDownYellow,

            isFocused,
            setFocused,
            setBlurred
        } = this.props


        return (
            <div className="parametr-group">
                <label className="parametr-label">Height</label>

                <div className="parametr-content-second">

                    <div className="sub-lable">
                        <span >Down limite</span>
                        <div className="content-limit">
                        <div className="icon-input">
                            <i className={' panto-icon  ph-white-height'}/>
                            <div className="icon-input">
                                <PantoInput
                                    style={{color:'#9FA2A9'}}
                                    value={height.whiteDown}
                                    onChange={setHeightDownWhite}
                                    onFocus={() => {
                                        setFocused('height_whiteDown')
                                    }}
                                    onBlur={() => {
                                        setBlurred('height_whiteDown')
                                    }}
                                    readOnly={!isFocused('height_whiteDown')}
                                />
                                <span className="white">cm</span>
                            </div>
                        </div>
                        <div className="icon-input">
                            <i className={' panto-icon  ph-yellow-height'}/>
                            <div className="icon-input">
                                <PantoInput
                                    style={{color:'#A17D48'}}
                                    value={height.yellowDown}
                                    onChange={setHeightDownYellow}
                                    onFocus={() => {
                                        setFocused('height_yellowDown')
                                    }}
                                    onBlur={() => {
                                        setBlurred('height_yellowDown')
                                    }}
                                    readOnly={!isFocused('height_yellowDown')}
                                />
                                <span className="yellow">cm</span>
                            </div>
                        </div>
                        <div className="icon-input">
                            <i className={' panto-icon  ph-red-height'}/>
                            <div className="icon-input">
                                <PantoInput
                                    style={{color:'#A25154'}}
                                    value={height.redDown}
                                    onChange={setHeightDownRed}
                                    onFocus={() => {
                                        setFocused('height_redDown')
                                    }}
                                    onBlur={() => {
                                        setBlurred('height_redDown')
                                    }}
                                    readOnly={!isFocused('height_redDown')}
                                />
                                <span className="red">cm</span>
                            </div>
                        </div>

                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="sub-lable">
                        <span className="subtitle">Up limite</span>
                        <div className="content-limit">
                            <div className="icon-input">
                                <i className={'icon panto-icon ph-white-height'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#9FA2A9'}}
                                        value={height.whiteUp}
                                        onChange={setHeightUpWhite}
                                        onFocus={() => {
                                            setFocused('height_whiteUp')
                                        }}
                                        onBlur={() => {
                                            setBlurred('height_whiteUp')
                                        }}
                                        readOnly={!isFocused('height_whiteUp')}
                                    />
                                    <span className="white">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-yellow-height'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A17D48'}}
                                        value={height.yellowUp}
                                        onChange={setHeightUpYellow}
                                        onFocus={() => {
                                            setFocused('height_yellowUp')
                                        }}
                                        onBlur={() => {
                                            setBlurred('height_yellowUp')
                                        }}
                                        readOnly={!isFocused('height_yellowUp')}
                                    />
                                    <span className="yellow">cm</span>
                                </div>
                            </div>
                            <div className="icon-input">
                                <i className={'icon panto-icon  ph-red-height'}/>
                                <div className="icon-input">
                                    <PantoInput
                                        style={{color:'#A25154'}}
                                        value={height.redUp}
                                        onChange={setHeightUpRed}
                                        onFocus={() => {
                                            setFocused('height_redUp')
                                        }}
                                        onBlur={() => {
                                            setBlurred('height_redUp')
                                        }}
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
        height: state.height,
        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {

        setHeightUpRed: (value) => dispatch({type: actionTypes.CHANGE_UP_RED, value}),
        setHeightUpWhite: (value) => dispatch({type: actionTypes.CHANGE_UP_WHITE, value}),
        setHeightUpYellow: (value)=> dispatch({type: actionTypes.CHANGE_UP_YELLOW, value}),

        setHeightDownRed: (value) => dispatch({type: actionTypes.CHANGE_DOWN_RED, value}),
        setHeightDownWhite: (value) => dispatch({type: actionTypes.CHANGE_DOWN_WHITE, value}),
        setHeightDownYellow: (value) => dispatch({type: actionTypes.CHANGE_DOWN_YELLOW, value}),

        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)