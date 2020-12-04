import React from "react";
import PantoSwitchButton from "../../../../components/PantoSwitchButton";

import * as actions from "../../_DataHandler/_actions";
import {connect} from "react-redux";
import WhatWhenModal from "../WhatWhenModal"


class Index extends React.Component {


    render() {

        const {
            toggleMapRailWayActive,
            toggleMapCityBorderActive,
            toggleMapCityNameActive,

            isDisabled,

            openWhatWhenModal
        } = this.props

        return (

            <div className="footer">
                <WhatWhenModal/>
                <hr/>


                <div className="footer-content">

                    <div className="footer-tools time-filter">

                        <ul>
                            <li
                                onClick={() => {
                                    if(isDisabled('what_when_modal')) return
                                    openWhatWhenModal(true)
                                }}
                                children="What & When"
                            />
                        </ul>

                    </div>


                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_railway_active}
                            onChange={toggleMapRailWayActive}
                            label={<label>railways</label>}
                            disabled={isDisabled('railway')}
                        />

                    </div>

                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_city_border_active}
                            onChange={toggleMapCityBorderActive}
                            label={<label>City border</label>}
                            disabled={isDisabled('city_border')}
                        />

                    </div>

                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_city_name_active}
                            onChange={toggleMapCityNameActive}
                            label={<label>City name</label>}
                            disabled={isDisabled('city_name')}
                        />

                    </div>

                </div>
            </div>
        )
    }


}

const stt2prp = (state) => {
    return {
        map_railway_active: state.map_railway_active,
        map_city_border_active: state.map_city_border_active,
        map_city_name_active: state.map_city_name_active,

        timing: state.timing,

        isDisabled: (item) => {
            return actions.isDisabled(state, item)
        }
    }
}

const dispatch2prp = (dispatch) => {
    return {
        toggleMapRailWayActive: (value) => actions.set(dispatch, 'map_railway_active', value),
        toggleMapCityBorderActive: (value) => actions.set(dispatch, 'map_city_border_active', value),
        toggleMapCityNameActive: (value) => actions.set(dispatch, 'map_city_name_active', value),

        openWhatWhenModal: (value) => actions.set(dispatch, 'what_when_modal', value),

    }
}

export default connect(stt2prp, dispatch2prp)(Index)