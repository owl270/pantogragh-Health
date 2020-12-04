import React from "react";
import {ADD_FIGURE, REMOVE_FIGURE, SET} from "../_DataHandler/_actions";
import {connect} from "react-redux";
import Aux from "../../../components/_Aux";
import Chart from "./chart"
import {Scrollbars} from "react-custom-scrollbars";

class Index extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            last_pos_top: 0
        }

        this.onScrollFrame = this.onScrollFrame.bind(this)
        this.onScrollStart = this.onScrollStart.bind(this)
        this.onScrollStop = this.onScrollStop.bind(this)
    }

    renderThumb({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#91B9FB',
            width: '7px',
            padding: 0,
            borderRadius: '8px',
            left: '-1.0px',
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackVertical({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "5px",
            right: "3px",
            bottom: "2px",
            top: "0",
            borderRadius: "8px",
            backgroundColor: "#151516",
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            marginRight: "-30px",
            marginBottom: "-30px",
            paddingRight: "13px",
            paddingBottom: "13px",
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderThumbX({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    chart_frame = 180

    onScrollFrame(e){

    }


    onScrollStart() {
        // const e = this.refs.scrollbars.getValues()
        // const scTop = e.scrollTop
        // if(this.props.figures.length>2) {
        //     if(scTop > this.state.last_pos_top){
        //         this.refs.scrollbars.scrollTop(scTop + this.chart_frame)
        //
        //         // this.props.set('signal_selected', [this.props.signal_selected[1], this.props.signal_selected[1] + 1])
        //     }
        //     else{
        //         this.refs.scrollbars.scrollTop(scTop - this.chart_frame)
        //         // this.props.set('signal_selected', [this.props.signal_selected[0] - 1, this.props.signal_selected[0]])
        //     }
        //     this.setState({last_pos_top: scTop})
        // }
        // console.log('start', e)
    }
    onScrollStop() {
        const e = this.refs.scrollbars.getValues()
        // const scTop = e.scrollTop
        // if(this.props.figures.length>2) {
        //     if(scTop > this.state.last_pos_top){
        //         this.refs.scrollbars.scrollTop(scTop + this.chart_frame)
        //
        //         // this.props.set('signal_selected', [this.props.signal_selected[1], this.props.signal_selected[1] + 1])
        //     }
        //     else{
        //         this.refs.scrollbars.scrollTop(scTop - this.chart_frame)
        //         // this.props.set('signal_selected', [this.props.signal_selected[0] - 1, this.props.signal_selected[0]])
        //     }
        //     this.setState({last_pos_top: scTop})
        // }
        // console.log('stop', e)
    }

    onScroll(e){
        // e.defaultPrevented = true
    }

    onWheel(e){
        // e.preventDefault()
    }





    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        if(prevProps.figures!==this.props.figures) {
            if(this.props.figures.length===0) this.props.set('signal_selected', [])
            else if(this.props.figures.length===1) this.props.set('signal_selected', [0])
            else if(this.props.figures.length===2) this.props.set('signal_selected', [0, 1])
            else{
                // when scroll
            }
        }
        if(prevProps.loading_signal!==this.props.loading_signal) {
            if(this.props.loading_signal) {
                // this.refs.scrollbars.view.scroll({
                //     top: (this.props.figures.length + 1) * this.chart_frame,
                //     left: 0,
                // })
            }
        }
        if(prevProps.signal_selected!==this.props.signal_selected) {
            if(this.props.signal_selected.length) {
                // this.refs.scrollbars.view.scroll({
                //     top: (this.props.figures.length + 1) * this.chart_frame,
                //     left: 0,
                // })
            }
        }
        */
    }


    render() {


        const $chart = this.props.figures.map((item, i) => {
            return <li
                key={i}
            >
                <Chart
                    id={i}
                    title={item.title}
                    x={item.data[0]}
                    y={item.data[1]}
                    l={item.thresholds}
                    remove={this.props.removeFigure}
                    current_time={this.props.current_time}
                    interval={this.props.interval_time}
                    ytitle={item.ytitle}
                />

            </li>
        })


        return (
            <Aux>
                <div className={"figures-list hide-scrollbar"}>


                    <Scrollbars
                        ref="scrollbars"
                        onScrollFrame={this.onScrollFrame}
                        onScroll={this.onScroll}
                        onScrollStart={this.onScrollStart}
                        onScrollStop={this.onScrollStop}
                        renderThumbVertical={this.renderThumb}
                        renderTrackVertical={this.renderTrackVertical}
                        renderView={this.renderView}
                        autoHide
                        renderThumbHorizontal={this.renderThumbX}
                        onWheel={this.onWheel}
                    >
                        <ul className="signals-charts">
                            {$chart}

                            {this.props.loading_signal ?
                                <li className="loading-figure"/>
                                : !this.props.figures.length ?
                                    <li className="no-figure"/>
                                    : null}


                        </ul>
                    </Scrollbars>

                </div>

            </Aux>
        )

    }


}


const stt2prp = (state) => {
    return {
        current_time: state.current_time,
        figures: state.figures,
        interval_time: state.interval_time,
        loading_signal: state.loading_signal,
        signal_selected: state.signal_selected

    }
}

const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: SET, state, value}),
        removeFigure: (figure) => dispatch({type: REMOVE_FIGURE, figure})

    }
}

export default connect(stt2prp, dispatch2prp)(Index)