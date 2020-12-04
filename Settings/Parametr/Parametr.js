import React from "react";
import Aux from "../../../components/_Aux";
import PantoCard from "../../../components/PantoCard";
import ShockPoints from "./__ShockPoints";
import ShockRegion from "./__ShockRegion";
import Height from "./__Height";
import Zig_Zag from"./__Zig_Zag";
import {Scrollbars} from "react-custom-scrollbars";

import {connect} from "react-redux";
import * as actionTypes from "../DataHandler/_actions";
import {isDisabled, isFocused} from "../DataHandler";


import {Provider} from "react-redux";
import "../style.scss"

class Index extends React.Component {
    render() {
        const {

            isFocused,
            setFocused,
            setBlurred,


        } = this.props



        return (
            <PantoCard>
                <header>
                    <h6>Parameters thresholds</h6>

                </header>


                <div className="parametr-container">
                    <ShockPoints/>
                    <ShockRegion/>
                    <Height/>
                    <Zig_Zag/>

                </div>

            </PantoCard>
        )
    }

}


const stt2prp = (state) => {
    return {
        loading: state.loading,


        isFocused: (item) => {
            return isFocused(state, item)
        },
    }
}

const dispatch2prp = (dispatch) => {
    return {
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)