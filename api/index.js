

const apiBaseUrl = process.env.REACT_APP_API_URL
const apiVersion = process.env.REACT_APP_API_VERSION
const client_key = process.env.REACT_APP_CLIENT_KEY

let sendRequest = async (requestMethod, method, data, to_json=true) => {

    let $init = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "client_key": client_key,
            "auth_key": localStorage.getItem('auth_key') || null
        },
        method: requestMethod
    }

    let url = apiBaseUrl + 'api/v' + apiVersion + '/' + method

    if(data) {
        if (requestMethod !== 'GET' && requestMethod !== 'HEAD') $init.body = JSON.stringify(data)
        else {
            const querystring = require('querystring')
            url += "?" + querystring.stringify(data)
        }
    }

    let response =  await fetch(url, $init)
    if(to_json) return await response.json()
    else return response;
}


let webService = {};

webService.getMe = () => {
    return sendRequest('POST', 'account/getMe');
}

webService.login = (data) => {
    return sendRequest('POST', 'account/login', data);
}

webService.signUp = (data) => {
    return sendRequest('POST', 'account/signUp', data);
}





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






webService.getFigure = (data) => {
    return sendRequest('POST', 'supervision/getFigure', data);
}

webService.getSignalData = (data) => {
    return sendRequest('POST', 'supervision/getSignalData', data);
}

webService.video = (time, data) => {
    return sendRequest('POST', `supervision/${time}`, data, false);
}







webService.createSimulationProject = (data) => {
    return sendRequest('POST', 'simulation', data);
}

webService.getSimulationProjects = (data) => {
    return sendRequest('GET', 'simulation', data);
}

webService.getSimulationProject = (project_token, data) => {
    // data => w=ffgfhgf || r=ffhfjlp
    return sendRequest('GET', `simulation/${project_token}`, data);
}

webService.simulationProjectEditName = (project_token, data) => {
    return sendRequest('POST', `simulation/${project_token}/edit_name`, data);
}

webService.simulationProjectSave = (project_token, data) => {
    return sendRequest('POST', `simulation/${project_token}/save`, data);
}

webService.simulationProjectCalculate = (project_token, data) => {
    return sendRequest('GET', `simulation/${project_token}/calculate`, data);
}





export default webService;