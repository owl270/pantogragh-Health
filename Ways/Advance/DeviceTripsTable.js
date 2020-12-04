import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {connect} from "react-redux";
import stc from 'string-to-color';


const DeviceTrips = (props) => {
    return (
        <tr>
            <td style={{color: props.color}}>{props.device}</td>
            <td style={{color: props.color}}>{props.trips}</td>
        </tr>
    )
}


class Index extends React.Component {


    renderThumbVertical({style, ...props}) {
        const thumbStyle = {
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
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderThumbHorizontal({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderTrackHorizontal({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }




    render() {


        let $trips = this.props.device_trips.map((item) => {
            return (
                <DeviceTrips
                    device={item.device}
                    trips={item.trips.length}
                    color={item.color}
                />
            )
        })

        if(!$trips.length) $trips = <tr className="not-found">
            <td colSpan="2">No trip found :(</td>
        </tr>

        return (
            <Scrollbars
                ref="scrollbars"
                renderThumbVertical={this.renderThumbVertical}
                renderTrackVertical={this.renderTrackVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderView={this.renderView}
                autoHide
            >


                <table className="device-trips-table">
                    <tbody>

                    <tr>
                        <td>Device ID</td>
                        <td>Number of trips</td>
                    </tr>

                    {$trips}
                    </tbody>
                </table>


            </Scrollbars>
        )
    }

}




export default Index