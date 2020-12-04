import React from "react";
import PantoInput from "../../../components/PantoInput";


import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";

class Index extends React.Component {


    render() {

        const {
            region,
            setRegionWhite,
            setRegionRed,
            setRegionYellow,
            setFocused,
            setBlurred
        } = this.props

        return (

            <div className="parametr-group">
                <label className="parametr-label">Shock Regions</label>
                <div className="parametr-content">

                    <div className="icon-input">
                        <i className={' panto-icon  ph-red-shock'}/>
                        <div className="icon-input">
                            <PantoInput
                                containerClass="first-input-parametr"
                                style={{color:'#A25154'}}
                                value={region.red}
                                onChange={setRegionRed}
                                onFocus={() => {
                                    setFocused('region_red')
                                }}
                                onBlur={() => {
                                    setBlurred('region_red')
                                }}
                                readOnly={!isFocused('region_red')}
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
                                value={region.yellow}
                                onChange={setRegionYellow}
                                onFocus={() => {
                                    setFocused('region_yellow')
                                }}
                                onBlur={() => {
                                    setBlurred('region_yellow')
                                }}
                                readOnly={!isFocused('region_yellow')}
                            />
                            <span className="yellow">g</span>
                        </div>
                    </div>
                    <div className="icon-input">
                        <i className={' panto-icon  ph-white-shock-bg'}/>
                        <div className="icon-input">
                            <PantoInput
                                containerClass="first-input-parametr"
                                style={{color:'#9FA2A9'}}
                                value={region.white}
                                onChange={setRegionWhite}
                                onFocus={() => {
                                    setFocused('region_white')
                                }}
                                onBlur={() => {
                                    setBlurred('region_white')
                                }}
                                readOnly={!isFocused('region_white')}
                                readOnly={!isFocused('region_white')}
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
        region: state.region,
        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {
        setRegionRed: (value) => dispatch({type: actionTypes.CHANGE_REGION_RED, value}),
        setRegionWhite :(value) =>dispatch({type:actionTypes.CHANGE_REGION_WHITE, value}),
        setRegionYellow:(value)=>dispatch({type:actionTypes.CHANGE_REGION_YELLOW, value}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)