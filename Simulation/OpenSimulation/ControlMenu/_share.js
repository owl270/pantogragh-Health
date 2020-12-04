import * as React from "react";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";

class Index extends React.Component {

    name = "share"


    openShare = () => {
        this.props.setControlMenuSubOpen(this.name)
    }

    render() {
        const {project} = this.props

        let prp = {}
        if(project.permission!=="full") prp.className = "disabled"
        else{
            prp.onClick = this.openShare
            if(this.props.open_control_menu_sub===this.name) prp.className = "opened"
        }

        return <li {...prp}>
            <span>Share</span>
        </li>

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
        setControlMenuSubOpen: (value) => actions.setControlMenuSubOpen(dispatch, value),
    };
};

export default connect(stt2prp, dispatch2prp)(Index);