import L from 'leaflet';

// import $point_fl from "../../../../../assets/images/map_points/point_fl.png"
// import $point_fl_2x from "../../../../../assets/images/map_points/point_fl@2x.png"
//

import * as React from "react"

const $first_point = (props) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
                <circle cx="3" cy="3" r="3" fill="#fd5858"/>
            </svg>`
}

const $last_point = (props) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
                <circle cx="3" cy="3" r="3" fill="#fd5858"/>
            </svg>`
}

const $height_point = (props) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="8.391" height="11.145" viewBox="0 0 8.391 11.145">
                <path d="M4.2,11.145a.406.406,0,0,1-.373-.319,3.987,3.987,0,0,0-.754-1.534,3.087,3.087,0,0,0-.292-.222A8.066,8.066,0,0,1,1.09,7.547,4.717,4.717,0,0,1,0,4.542,4.384,4.384,0,0,1,4.2,0a4.384,4.384,0,0,1,4.2,4.542A4.717,4.717,0,0,1,7.3,7.547,8.066,8.066,0,0,1,5.614,9.07a3.087,3.087,0,0,0-.292.222,3.986,3.986,0,0,0-.754,1.534A.4.4,0,0,1,4.2,11.145Zm-1-4.822.987,1.069.988-1.069H4.431V3.116h.741L4.184,2.047,3.2,3.116h.741V6.323Z" fill="${props.fill || '#AFB0B2'}"/>
            </svg>`
}

const $zigzag_point = (props) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="7.391" height="10.145" viewBox="0 0 7.391 10.145">
                <path d="M3.7,10.145a.361.361,0,0,1-.328-.291,3.68,3.68,0,0,0-.664-1.4,2.731,2.731,0,0,0-.257-.2A7.187,7.187,0,0,1,.96,6.87,4.383,4.383,0,0,1,0,4.134,3.938,3.938,0,0,1,3.7,0a3.938,3.938,0,0,1,3.7,4.134,4.383,4.383,0,0,1-.96,2.735A7.187,7.187,0,0,1,4.945,8.256a2.731,2.731,0,0,0-.257.2,3.679,3.679,0,0,0-.664,1.4A.36.36,0,0,1,3.7,10.145ZM2.707,4.874h0l1.942,1.4.4-.286L3.1,4.588,4.644,3.475l0,0,.4-.286,0,0,0,0-.4-.286,0,0L2.7,1.5l-.4.286,1.942,1.4L2.707,4.3l0,0-.4.286,0,0,0,0,.4.286,0,0Z" fill="${props.fill || '#AFB0B2'}"/>
            </svg>`
}

const $shock_point = (props) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="9.14" height="11.667" viewBox="0 0 9.14 11.667">
                <path d="M4.57,12.667a.438.438,0,0,1-.406-.334,4.11,4.11,0,0,0-.821-1.606,3.353,3.353,0,0,0-.318-.232A8.682,8.682,0,0,1,1.187,8.9a4.828,4.828,0,0,1,.151-6.508,4.445,4.445,0,0,1,6.462,0A4.828,4.828,0,0,1,7.952,8.9a8.682,8.682,0,0,1-1.838,1.594,3.353,3.353,0,0,0-.318.232,4.117,4.117,0,0,0-.821,1.606A.436.436,0,0,1,4.57,12.667ZM3.607,7.812l.629.654.315.327.315-.327.629-.654H4.865V7.158H7.381V6.5H1.721v.654H4.236v.654ZM1.721,5.195v.654h5.66V5.195Zm0-1.309V4.54h5.66V3.886H4.865V3.232h.629l-.629-.654L4.551,2.25l-.315.327-.629.654h.629v.654Z" transform="translate(0 -1)" fill="${props.fill || '#AFB0B2'}"/>
            </svg>`
}

export default {
    FirstPoint: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($first_point())}`,
        iconSize: [12, 12], // size of the icon
        iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
        popupAnchor: [-70, 80] // point from which the popup should open relative to the iconAnchor
    }),
    LastPoint: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($last_point())}`,
        iconSize: [12, 12], // size of the icon
        iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
        popupAnchor: [70, 0] // point from which the popup should open relative to the iconAnchor
    }),
    HeightPointLvl1: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($height_point({fill: "#AFB0B2"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    HeightPointLvl2: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($height_point({fill: "#A17D48"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    HeightPointLvl3: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($height_point({fill: "#A25154"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),

    ZigZagPointLvl1: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($zigzag_point({fill: "#AFB0B2"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    ZigZagPointLvl2: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($zigzag_point({fill: "#A17D48"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    ZigZagPointLvl3: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($zigzag_point({fill: "#A25154"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),

    ShockPointLvl1: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($shock_point({fill: "#AFB0B2"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    ShockPointLvl2: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($shock_point({fill: "#A17D48"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),
    ShockPointLvl3: L.icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent($shock_point({fill: "#A25154"}))}`,
        iconSize: [16, 20], // size of the icon
        iconAnchor: [8, 23], // point of the icon which will correspond to marker's location
        popupAnchor: [70, -15] // point from which the popup should open relative to the iconAnchor
    }),

}