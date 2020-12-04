import React from "react";
import PantoCard from "../../../components/PantoCard";


import VideoPlayer from "../VideoPlayer";
import SignalCharts from "../SignalCharts";
import Train from "../Train";
import Map from "../Map";
import Recording from "../Recording";
import AddFigure from "../AddFigure";

import SuperVisionLogo from "../../../../assets/images/supervision_logo.svg";
import {connect} from "react-redux";


import * as actionTypes from "../_DataHandler/_actions";



class Index extends React.Component {



    render() {

        return (
            <PantoCard
                loading={this.props.loading}
                loading_label={this.props.loading_label}
            >


                <div className="panto-col left-side">
                    <div className="supervision-header">
                        <img src={SuperVisionLogo} alt="supervision-logo"/>
                        <Recording/>
                    </div>

                    <Train/>

                    <Map
                        duration={this.props.duration}
                    />

                    <div className="dismiss-supervision" onClick={this.props.unmount}>
                        <i className="panto-icon ph-list-caret ph-icon-ltr"/>
                    </div>
                </div>

                <div className="panto-col right-side">

                    <PantoCard>
                        <VideoPlayer duration={this.props.duration} unmount={this.props.unmount}/>
                        <SignalCharts duration={this.props.duration}/>
                        <AddFigure duration={this.props.duration}/>
                    </PantoCard>


                </div>

            </PantoCard>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        loading_label: state.loading_label
    }
}
const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: actionTypes.SET, state, value})
    }
}

export default connect(mapStateToProps, dispatch2prp)(Index)