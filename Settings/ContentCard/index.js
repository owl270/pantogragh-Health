import React from "react";
import PantoCard from "../../../components/PantoCard";



import DataList from "./DataList";
import MapContent from "./MapContent";
import Footer from "./Footer"

import {connect} from "react-redux";
import {$API} from "../../../../api/server";
import * as actions from "../_DataHandler/_actions";


class Index extends React.Component {

    state = {
        get_data: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.device !== this.props.device) {
            this.getData()
        }
        if (prevProps.duration !== this.props.duration) {
            this.getData()
        }
        if (prevProps.sorting !== this.props.sorting) {
            this.getData()
        }

        if(prevProps.refresh !== this.props.refresh) {
            if(this.state.get_data) {
                this.getData()
            }
        }
    }


    getData(){
        const {
            train,
            device,
            duration,
            sorting,

            setLoading,
            setSignals,
            setSorting
        } = this.props

        const body = {
            train,
            device,
            duration,
            sorting: sorting,
            parameters: {}
        }

        const ta = performance.now();
        setLoading(true)

        $API.getWaysData(body, (response) => {
            if (response.ok) {
                const {result} = response
                const {signals, parameters, sorting} = result
                setSignals(signals)
                setSorting(sorting)

                const tb = performance.now();
                this.props.setResultTime((tb - ta).toFixed(0))
            }
            this.setState({get_data: true})
            setLoading(false)
        })

    }


    render() {
        return (
            <PantoCard
                loading={this.props.loading}
                loading_label={this.props.loading_label}
            >
                <div className="body-content">
                    <DataList/>
                    <MapContent/>
                </div>
                <Footer/>
            </PantoCard>
        )
    }


}

const stt2prp = (state) => {
    return {
        loading: state.loading,
        loading_label: state.loading_label,

        train: state.train,
        device: state.device,
        duration: state.duration,
        sorting: state.sorting,

        download_queue: state.download_queue,
        _in_queue: state._in_queue,
        _in_downloading: state._in_downloading,
        _completed_download: state._completed_download,
    }
}


const dispatch2prp = (dispatch) => {
    return {
        setLoading: (value) => actions.setLoading(dispatch, value),

        setSignals: (value) => actions.setSignals(dispatch, value),
        setSorting: (value) => actions.setSorting(dispatch, value),
        setDuration: (value) => actions.set(dispatch, 'duration', value),

        setResultTime: (value) => actions.set(dispatch, 'get_result_time', value),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)