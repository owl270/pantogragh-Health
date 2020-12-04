import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import PantoCheckButton from "../../../../components/PantoCheckButton";


const DeviceTrips = ({name, tripCounts, isShowTrip, showTripID, isSelected, selectShowTrip, chooseDevice}) => {

    let classArray = []
    if(isSelected) classArray.push('selected')

    if(isShowTrip) {
        classArray.push(`device-color-${showTripID}`)
    }

    return (
        <tr className={classArray.join(" ")}>
            <td>
                <PantoCheckButton
                    value={isShowTrip}
                    onChange={(value) => {
                        selectShowTrip(value)
                    }}
                />
            </td>
            <td onClick={chooseDevice}>{name}</td>
            <td onClick={chooseDevice}>{tripCounts}</td>
        </tr>
    )
}



class Index extends React.Component {


    renderThumbVertical({style, ...props}) {
        const thumbStyle = {
            backgroundColor: "#4467A5",
            width: "4px",
            padding: 0,
            borderRadius: "5px",
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
            width: "4px",
            right: "0",
            bottom: "0",
            top: "35px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E",
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

        const {show_trips_devices, device_trips, selectShowTrip, chooseDevice, selected_device} = this.props

        let $trips = device_trips.map((item, i) => {
            return (
                <DeviceTrips
                    name={item.train + "-" + item.device}
                    tripCounts={item.trips.length}
                    isShowTrip={show_trips_devices.includes(i)}
                    showTripID={show_trips_devices.indexOf(i)}
                    isSelected={selected_device===i}
                    selectShowTrip={(value) => {
                        selectShowTrip(i, value)
                    }}
                    chooseDevice={() => {
                        chooseDevice(i)
                    }}
                />
            )
        })

        if (!$trips.length) $trips = <tr className="not-found">
            <td colSpan="3">No trip found :(</td>
        </tr>

        return (

            <Scrollbars
                renderThumbVertical={this.renderThumbVertical}
                renderTrackVertical={this.renderTrackVertical}
                renderTrackHorizontal={this.renderTrackHorizontal}
                hideTracksWhenNotNeeded
            >
                <table className="device-trips-table">

                    <thead>
                    <tr>
                        <th/>
                        <th>Train & Device</th>
                        <th>Number of trips</th>
                    </tr>
                    </thead>


                    <tbody>
                    {$trips}
                    </tbody>

                </table>

            </Scrollbars>
        )
    }

}


export default Index