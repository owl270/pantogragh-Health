import React from "react";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {connect} from "react-redux";

import L from "leaflet";
import Icon from "../../../../assets/images/map_point_supervision.png"
import * as moment from "moment";


let MapMarker = L.icon({
    iconUrl: Icon,
    iconSize: [21, 25], // size of the icon
    iconAnchor: [6, 6] // point of the icon which will correspond to marker's location
})


class Index extends React.Component {


    state = {
        position: [0, 0]
    }

    marker_point = null


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.map_points !== this.props.map_points || prevProps.showing_number !== this.props.showing_number) {
            const mp = this.props.map_points[this.props.showing_number]
            if (mp) {
                const ff = (mp[30000] ? 30000 : 0)
                if(mp[ff]) {
                    this.setState({
                        position: [mp[ff]['lat'], mp[ff]['lon']]
                    })
                }
                if(mp[0]){
                    this.marker_point = [mp[0]['lat'], mp[0]['lon']]
                }
            }

        }


        if (prevProps.current_time !== this.props.current_time) {
            const mp = this.props.map_points[this.props.showing_number]
            let ff = Math.round(this.props.current_time * 60000 / this.props.interval_time)
            let gg = ff * this.props.interval_time
            if (mp) {
                if (mp[gg]) {
                    this.marker_point = [mp[gg]['lat'], mp[gg]['lon']]
                }
                else {
                    ff--
                    gg = ff * this.props.interval_time
                    if (mp[gg]) {
                        this.marker_point = [mp[gg]['lat'], mp[gg]['lon']]
                    }
                }
            }
        }
    }


    render() {




        return (
            <div className="map-container">

                <Map
                    center={this.state.position}
                    zoom={17}
                    attributionControl={false}
                    zoomControl={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    dragging={false}
                    animate={false}
                    easeLinearity={0.35}
                >


                    <TileLayer
                        url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    />

                    {this.marker_point && <Marker position={this.marker_point} icon={MapMarker}/>}
                </Map>

            </div>
        )

    }

}

const stt2prp = (state) => {
    return {
        map_points: state.map_points,
        current_time: state.current_time,
        showing_number: state.showing_number,
        interval_time: state.interval_time,

    }
}

const dispatch2prp = (dispatch) => {
    return {}
}

export default connect(stt2prp, dispatch2prp)(Index)