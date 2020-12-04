import * as React from "react";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";
import PantoInput from "../../../../components/PantoInput"

import {$API} from "../../../../../api/server";

import ClickOutHandler from "react-clickout-handler";
import ControlMenuItems from "./items";

import ShareContent from "./_share_content"
import {Spinner} from "react-bootstrap";


class Index extends React.Component {


    state = {
        project_name: this.props.project.name,
        focused: false
    }

    onChange = (v) => {
        if (this.props.project.permission === "full") {
            this.setState({project_name: v})
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.focused !== this.state.focused) {
            if (!this.state.focused) {
                if (this.state.project_name !== this.props.project.name) {
                    this.editName(this.state.project_name)
                }
            }
        }
    }


    editName = (new_name) => {
        $API.simulationProjectEditName({token: this.props.project.token, data: {new_name}}, (response) => {
            if (response.ok) {
                this.props.setProjectName(new_name)
                this.props.addNotification({
                    id: 'changed-name',
                    children: "Project name changed",
                    type: "success",
                    duration: 3000
                })
            }
        })
    }


    render() {
        let $pin = {}
        if (this.props.project.permission !== "full") {
            $pin = {
                disabled: true,
                readOnly: true
            }
        }


        const {
            open_control_menu,
            open_control_menu_sub,
            setControlMenuOpen,
            setControlMenuSubOpen
        } = this.props

        // const Loading = <>
        //     <div className="--loading-">
        //         <Spinner animation="border" size="sm" variant="primary"/>
        //     </div>
        // </>
        let subContent = null
        if (open_control_menu_sub) {
            switch (open_control_menu_sub) {
                case 'share':
                    subContent = <ShareContent/>
                    break
                default:
                    subContent = null
                    break
            }
        }


        return <>
            <div className="control-menu-container">

                <div className="control-menu-content">
                    <PantoInput
                        value={this.state.project_name}
                        onChange={this.onChange}
                        onFocus={() => this.setState({focused: true})}
                        onBlur={() => this.setState({focused: false})}
                        {...$pin}
                    />
                    <i className="panto-icon ph-right-arrow"
                       onClick={() => {
                           setControlMenuOpen(true)
                       }}/>
                </div>


                <ClickOutHandler
                    onClickOut={() => {
                        setControlMenuOpen(false)
                        setControlMenuSubOpen(null)
                    }}
                >
                    <div className={"control-menu-card" + (open_control_menu ? " rendered" : "")}>
                        <div className="control-menu--content">

                            <div className="control-menu-items">
                                <ul>
                                    {ControlMenuItems}
                                </ul>
                            </div>

                            <div className={"control-menu-items-sub" + (open_control_menu_sub ? " rendered" : "")}>
                                {subContent}
                            </div>

                        </div>
                    </div>
                </ClickOutHandler>


            </div>
        </>

    }

}


const stt2prp = (state) => {
    return {
        project: state.project,
        open_control_menu: state.open_control_menu,
        open_control_menu_sub: state.open_control_menu_sub
    };
};

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),
        setProjectName: (name) => actions.setProjectName(dispatch, name),

        setControlMenuOpen: (value) => actions.set(dispatch, 'open_control_menu', value),
        setControlMenuSubOpen: (value) => actions.set(dispatch, 'open_control_menu_sub', value),
    };
};

export default connect(stt2prp, dispatch2prp)(Index);