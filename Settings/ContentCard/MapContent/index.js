import React from "react";

import {Map as LeafletMap, GeoJSON, Polyline, TileLayer, Popup, Marker, Tooltip} from 'react-leaflet';
import IranMap from '../../../../data/GeoJson/countries/Iran.json';
import Europe from '../../../../data/GeoJson/continents/Europe.json';
import PantoButton from "../../../../components/PantoButton";
import * as actionTypes from "../../_DataHandler/_actions";
import {connect} from "react-redux";
import MapMarker from "./markers";
import * as moment from "moment";


function generate_map(map_points, gg) {

    let polyline = [], markers = []

    for (let j = 0; j < map_points.length; j++) {

        let {lat, lon, time, shock_level} = map_points[j]

        polyline.push([lat, lon])


        if (!gg || gg && (j + 1) !== map_points.length) {
            if (shock_level) {
                markers.push(
                    <Marker
                        icon={MapMarker[`ShockPointLvl${shock_level}`]}
                        position={[lat, lon]}
                    >
                        <Popup>
                            <b>Shock point level{shock_level}</b>
                            <span>
                                <span>{moment(time).format('YYYY.MM.DD')}</span>
                                <span>{moment(time).format('HH:mm:ss')}</span>
                            </span>
                        </Popup>
                    </Marker>
                )
            }
        }

    }


    return {
        polyline,
        markers
    }
}


class Index extends React.Component {


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.signals_selected.length !== this.props.signals_selected.length) {
            if (prevProps.signals_selected.length < this.props.signals_selected.length) {
                const $pr = prevProps.signals_selected
                const $no = this.props.signals_selected
                for (let i = 0; i < $no.length; i++) {
                    if (!$pr.includes($no[i])) {
                        const $el = window.$('.poly-line-map-' + ($no[i]))
                        $el.addClass("selected-signal")
                    }
                }

            } else {
                const $pr = prevProps.signals_selected
                const $no = this.props.signals_selected
                for (let i = 0; i < $pr.length; i++) {
                    if (!$no.includes($pr[i])) {
                        const $el = window.$('.poly-line-map-' + ($pr[i]))
                        $el.removeClass("selected-signal")
                    }
                }

            }
        } else if (prevProps.open_tools !== this.props.open_tools) {
            if (this.props.open_tools !== null) {
                const $el = window.$('.poly-line-map-' + (this.props.open_tools))
                $el.addClass("open-tools")
                const $pel = window.$('.poly-line-map-' + (prevProps.open_tools))
                $pel.removeClass("open-tools")
            } else {
                const $pel = window.$('.poly-line-map-' + (prevProps.open_tools))
                $pel.removeClass("open-tools")
            }
        }


    }


    render() {

        let {
            map_central_point,

            signal_list,
            setSignalHighlight,

            setFullMap,
            map_city_name_active,
            map_city_border_active,
            map_railway_active
        } = this.props


        let $markers = []
        let polyLines = []
        let first_point = null, last_point = null

        let pp = {id: '', points: []}
/*        for (let ii = 0; ii < signal_list.length; ii++) {
            let pointsArr = signal_list[ii].points
            let gg = signal_list[ii + 1] && signal_list[ii + 1].points.length > 0
            // if(gg) pointsArr.push(signal_list[ii+1].points[0])

            const {polyline, markers} = generate_map(pointsArr, gg)
            pp = {
                id: ii,
                points: polyline
            }
            $markers.push(markers)
            // polyLines.push(pp)
            if (ii === 0) polyLines.push(pp)

            if (!first_point) first_point = signal_list[ii].points.length > 0 ? signal_list[ii].points[0] : null
            // last_point = signal_list[ii].points.length > 0 ? signal_list[ii].points[signal_list[ii].points.length - 1] : null
        }*/


        console.log(polyLines)


        let $polyLines = polyLines.map((item) => {
            return <Polyline
                positions={item.points}
                onClick={() => {
                    setSignalHighlight(item.id)
                }}
                className={'poly-line-map poly-line-map-' + (item.id)}
                weight={2}
            />
        })


        if (first_point) {
            $markers.push(
                <Marker
                    icon={MapMarker.FirstPoint}
                    position={[first_point['lat'], first_point['lon']]}
                >
                    <Popup>
                        <b>Start</b>
                        <span>
                            <span>{moment(first_point['time']).format('YYYY.MM.DD')}</span>
                            <span>{moment(first_point['time']).format('HH:mm:ss')}</span>
                        </span>
                    </Popup>
                </Marker>
            )
        }
        if (last_point) {
            $markers.push(
                <Marker
                    icon={MapMarker.LastPoint}
                    position={[last_point['lat'], last_point['lon']]}
                >
                    <Popup>
                        <b>End</b>
                        <span>
                            <span>{moment(last_point['time']).format('YYYY.MM.DD')}</span>
                            <span>{moment(last_point['time']).format('HH:mm:ss')}</span>
                        </span>
                    </Popup>
                </Marker>
            )
        }


        return (
            <div className="map">

                <LeafletMap
                    center={((map_central_point && map_central_point.length > 0) ? map_central_point : [35, 48])}
                    zoom={10}
                    minZoom={4}
                    //maxZoom={10}
                    attributionControl={false}
                    zoomControl={false}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >
                    {map_city_name_active ?
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        />
                        : null}
                    {map_railway_active ?
                        <TileLayer
                            url="http://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        />
                        : null}


                    <GeoJSON
                        data={Europe}
                        style={() => ({
                            color: '#383A3F',
                            weight: 0.5,
                            fillColor: "#555E6D",
                            fillOpacity: 1
                        })}
                    />


                    {$polyLines}
                    {$markers}


                    <div className="map-tools">


                        <PantoButton
                            onClick={() => {
                                setFullMap(true)
                            }}
                        >
                            Full map
                        </PantoButton>

                    </div>


                </LeafletMap>


            </div>
        )
    }


}


const stt2prp = (state) => {
    return {
        map_central_point: state.map_central_point,
        map_railway_active: state.map_railway_active,
        map_city_border_active: state.map_city_border_active,
        map_city_name_active: state.map_city_name_active,

        signals: state.signals,
        signal_highlight: state.signal_highlight,
        open_tools: state.open_tools,
        signals_selected: state.signals_selected
    }
}

const dispatch2prp = (dispatch) => {
    return {
        // changeMapPoints: (id, points) => dispatch({type: actionTypes.CHANGE_MAP_POINTS, id, points}),
        // setFullMap: (value) => dispatch({type: actionTypes.SET, state: 'full_map', value}),
        // setSignalHighlight: (value) => dispatch({type: actionTypes.SET, state: 'signal_highlight', value}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)