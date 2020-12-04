import React from "react";
import PantoInput from "../../../components/PantoInput";

import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";

class Index extends React.Component {


    render() {

        const {
            point,
            setPointRed,
            setPointWhite,
            setPointYellow,
            isFocused,
            setFocused,
            setBlurred
        } = this.props

        return (

            <div className="parametr-group">
                <label className="parametr-label">Shock Point</label>
                <div className="parametr-content">

                    <div className="icon-input">
                        <i className={' panto-icon  ph-red-shock'}/>
                        <div className="icon-input">
                    <PantoInput
                        containerClass="first-input-parametr"
                        style={{color:'#A25154'}}
                        value={point.red}
                        onChange={setPointRed}
                        onFocus={() => {
                            setFocused('point_red')
                        }}
                        onBlur={() => {
                            setBlurred('point_red')
                        }}
                        readOnly={!isFocused('point_red')}
                    />
                            <span className="red">g</span>
                        </div>
                    </div>
                    <div className="icon-input">
                        <i className={' panto-icon  ph-yellow-shock-bg'}/>
                        <div className="icon-input">
                            <PantoInput
                                containerClass="first-input-parametr"
                                style={{color:'#A17D48'}}
                                value={point.yellow}
                                onChange={setPointYellow}
                                onFocus={() => {
                                    setFocused('point_yellow')
                                }}
                                onBlur={() => {
                                    setBlurred('point_yellow')
                                }}
                                readOnly={!isFocused('point_yellow')}
                            />
                            <span className="yellow">g</span>
                        </div>
                    </div>
                    <div className="icon-input">
                        <i className={' panto-icon  ph-white-shock-bg'}/>
                        <div className="icon-input">
                            <PantoInput
                                style={{color:'#9FA2A9'}}
                                value={point.white}
                                onChange={setPointWhite}
                                onFocus={() => {
                                    setFocused('point_white')
                                }}
                                onBlur={() => {
                                    setBlurred('point_white')
                                }}
                                readOnly={!isFocused('point_white')}
                            />
                            <span className="white">g</span>
                        </div>
                    </div>




                </div>
            </div>
        )
    }

}

const stt2prp = (state) => {
    return {
        point: state.point,
        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {
        setPointRed: (value) => dispatch({type: actionTypes.CHANGE_POINT_RED, value}),
        setPointWhite :(value) =>dispatch({type:actionTypes.CHANGE_POINT_WHITE, value}),
        setPointYellow:(value)=>dispatch({type:actionTypes.CHANGE_POINT_YELLOW, value}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)