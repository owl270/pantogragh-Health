import React, {Suspense} from "react";

// redux
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import DataHandler from "./DataHandler";
import {Link, Redirect, Route, Switch, useLocation} from 'react-router-dom';

import Aux from "../../components/_Aux";
import PantoCard from "../../components/PantoCard";
import PantoButton from "../../components/PantoButton";
import {Scrollbars} from "react-custom-scrollbars";
import Validator from "./DataHandler/_validator";

import Parametr from "./Parametr/Parametr";
import Advance from "./Advance/index";
import ManageAccount from "./ManageAccount/index";

import "./style.scss";

const $DataHandler = createStore(
    DataHandler
);

class Index extends React.Component {
    render() {
        return  <Provider store={$DataHandler}>
            <Validator/>


        <div>
                <div className="panto-row">
                    <div className="panto-col setting-col">
                        <Parametr />
                    </div>
                </div>
                <div className="panto-row">
                    <div className="panto-col advance-setting-col">
                        <Advance/>

                    </div>
                    <div className="panto-col manage-account-col">
                        <ManageAccount/>
                        <div className="region-btn">
                        <PantoButton>MAke Region</PantoButton>
                        </div>
                    </div>

                </div>


            </div>

        </Provider>
    }

}

export default Index;