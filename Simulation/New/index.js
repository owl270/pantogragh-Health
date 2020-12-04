import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";


import "./style.scss"
import DataHandler from "./_DataHandler";
import config from "../../../../config";

import Main from "./Main"

const $DataHandler = createStore(DataHandler)


class Index extends React.Component {

    render() {

        document.title = 'Simulation | ' + config.defaultTitle;
        const token = this.props.token


        return <Provider store={$DataHandler}>
            <div className="panto-row">
                <div className="panto-col simulation-list-container">
                    <Main/>
                </div>
            </div>
        </Provider>

    }

}

export default Index;