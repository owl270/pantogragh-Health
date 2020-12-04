import React from "react";
import htmlToImage from 'html-to-image';
import PantoCard from "../../components/PantoCard";


import Main from "./Main";
import "./style.scss"

import DataHandler from "./_DataHandler";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";

import Server from "./_DataHandler/_server";
import Validator from "./_DataHandler/_validator";


import Aux from "../../components/_Aux";
import * as actionTypes from "./_DataHandler/_actions";
import moment from "moment";
import config from "../../../config";


const $DataHandler = createStore(DataHandler);


class Index extends React.Component {


    state = {
        mount: false,
        close_animation: false
    }


    componentWillUnmount() {
        this.setState({mount: false})
        $DataHandler.dispatch({type: actionTypes.UNMOUNT})
        window.$("#main-container").removeClass("stretch-mode")
    }

    componentDidMount() {
        $DataHandler.dispatch({type: actionTypes.MOUNT})
        window.$("#main-container").addClass("stretch-mode")
        this.setState({mount: true})
    }


    unmount = () => {
        this.setState({close_animation: true})
        setTimeout(() => {
            $DataHandler.dispatch({type: actionTypes.UNMOUNT})
            this.props.unmount()
        }, 700)
    }


    render() {

        document.title = 'Supervision | ' + config.defaultTitle;

        const {
            mount
        } = this.state


        return <Aux>
            <Provider store={$DataHandler}>

                <div className="supervision-container" id="supervision-container">

                    <div className={"supervision-render" + (this.state.close_animation ? " closed" : "")}>


                        {
                            mount ?
                                <Server
                                    duration={this.props.duration}
                                    train_id={this.props.train_id}
                                    device_id={this.props.device_id}
                                />
                                : null
                        }


                        <div className="panto-row">
                            <div className="panto-col supervision-col">
                                <Main
                                    unmount={this.unmount}
                                    duration={this.props.duration}
                                    train_id={this.props.train_id}
                                    device_id={this.props.device_id}
                                />
                            </div>
                        </div>

                    </div>


                </div>


                <canvas
                        style={{
                            "position": "absolute",
                            "left": "0px",
                            "top": "0px",
                            "width": "619px",
                            "height": "300px"
                        }}
                        width="1238"
                        height="600"
                >
                </canvas>


            </Provider>
        </Aux>


    }

}


export default Index