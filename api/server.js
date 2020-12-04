import React from "react";
import api from "./index"
import PopUpLogin from "../app/internalPages/PopUpLogin";

import {Notification, PantoNotification} from "../app/components/PantoNotify";
import update from "react-addons-update";



export function addNotification(notify) {
    this.setState({
        notifications: update(this.state.notifications, {
            $push: [notify]
        })
    })
}


export function download(result) {
    let {fileData, fileName, fileType} = result.file

    if (fileType === 'application/zip') fileData = new Uint8Array(fileData.data);

    const blob = new Blob([fileData]);
    const fileUrl = URL.createObjectURL(blob);

    this.setState({
        download: {
            url: fileUrl,
            name: fileName,
            type: fileType
        }
    }, () => {
        this.downloader.click()
    })
}


function errorHandler(response) {
    const {ok, status, error, description} = response
    if (!ok) {
        addNotification({
            id: error,
            type: 'warning',
            children: <>
                <b>{status}: </b>
                {description || error}
            </>
        })
        switch (error) {
            case "AUTHENTICATION_FAILED":
                this.setState({login_popup: true})
                return true

            default:

                break
        }


    }
    return false
}


function _callback(api, callback, response) {
    this.setState({last_api: api})
    if (errorHandler(response)) return;
    callback(response)
}


function runLastApi() {
    if (typeof this.state.last_api === "object") {
        if (this.state.last_api[0] && typeof $API[this.state.last_api[0]] === "function") {
            $API[this.state.last_api[0]](this.state.last_api[1], this.state.last_api[2])
        }
    }
}


/*
webService.getTrains = () => {
    return sendRequest('GET', 'train/myTrains');
}

webService.getTrainDevices = (train_id) => {
    return sendRequest('GET', 'train/'+train_id+'/getDevices');
}

webService.getLastUpdate = (device_id) => {
    return sendRequest('GET', 'device/'+device_id+'/getLastUpdate');
}

webService.lastTrip = () => {
    return sendRequest('GET', 'ways/lastTrip');
}

webService.getWaysData = (data) => {
    return sendRequest('POST', 'ways/getWaysData', data);
}

webService.downloadSignal = (data) => {
    return sendRequest('POST', 'ways/downloadSignal', data);
}

webService.getMyDevicesTrips = (data) => {
    return sendRequest('POST', 'device/getMyDevicesTrips', data);
}

webService.requestVideo = (data) => {
    return sendRequest('POST', 'ways/requestVideo', data);
}

webService.getMap = (data) => {
    return sendRequest('POST', 'ways/getMap', data);
}
*/


export const $API = {
    // ways
    getMyDevicesTrips: (props, callback) => {
        const $callback = (response) => _callback(["getMyDevicesTrips", props, callback], callback, response)
        api.getMyDevicesTrips(props).then($callback)
    },
    getWaysData: (props, callback) => {
        const $callback = (response) => _callback(["getWaysData", props, callback], callback, response)
        api.getWaysData(props).then($callback)
    },
    downloadSignal: (props, callback) => {
        const $callback = (response) => _callback(["downloadSignal", props, callback], callback, response)
        api.downloadSignal(props).then($callback)
    },

    // lastTrip: (props, callback) => {
    //     const $callback = (response) => _callback(["lastTrip", props, callback], callback, response)
    //     api.lastTrip(props).then($callback)
    // },

    requestVideo: (props, callback) => {
        const $callback = (response) => _callback(["requestVideo", props, callback], callback, response)
        api.requestVideo(props).then($callback)
    },
    getMap: (props, callback) => {
        const $callback = (response) => _callback(["getMap", props, callback], callback, response)
        api.getMap(props).then($callback)
    },





    // simulation
    createSimulationProject: (props, callback) => {
        const $callback = (response) => _callback(["createSimulationProject", props, callback], callback, response)
        api.createSimulationProject(props).then($callback)
    },
    getSimulationProjects: (props, callback) => {
        const $callback = (response) => _callback(["getSimulationProjects", props, callback], callback, response)
        api.getSimulationProjects(props).then($callback)
    },
    getSimulationProject: (props, callback) => {
        const $callback = (response) => _callback(["getSimulationProject", props, callback], callback, response)
        api.getSimulationProject(props.token, props.data).then($callback)
    },
    simulationProjectEditName: (props, callback) => {
        const $callback = (response) => _callback(["simulationProjectEditName", props, callback], callback, response)
        api.simulationProjectEditName(props.token, props.data).then($callback)
    }


}


class Server extends React.Component {


    constructor(props) {
        super(props);


        errorHandler = errorHandler.bind(this)
        addNotification = addNotification.bind(this)
        download = download.bind(this)
        runLastApi = runLastApi.bind(this)
        _callback = _callback.bind(this)
    }


    state = {
        last_api: null,
        notifications: [],
        login_popup: false,

        download: null
    }


    render() {

        const {notifications} = this.state


        const $notify = notifications.map((value, index) => {
            return <Notification
                {...value}
                key={index}
            />
        })


        return <>

            {this.state.download === null ? null :
                <a
                    ref={(downloader) => {
                        this.downloader = downloader;
                    }}
                    href={this.state.download.url}
                    download={this.state.download.name}
                    type={this.state.download.type}
                />
            }

            <PopUpLogin
                visible={this.state.login_popup}
                setUnVisible={() => {
                    this.setState({login_popup: false})
                }}
                onLogin={() => {
                    runLastApi()
                    addNotification({
                        id: 'login-success',
                        type: 'success',
                        children: <b>You're logged in successfully</b>
                    })
                }}
            />

            <PantoNotification>
                {$notify}
            </PantoNotification>

        </>
    }


}


export default Server




