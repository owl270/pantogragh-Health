import * as React from "react";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";

class Index extends React.Component {


    save = () => {
        this.props.setControlMenuSubOpen(null)
        this.props.addNotification({
            id: 'saved-project',
            children: "Project saved successfully",
            type: "success",
            duration: 3000
        })
    }


    render() {
        const {project} = this.props

        let prp = {}
        if(project.permission==="read") prp.className = "disabled"
        else {
            prp.onClick = this.save
            if(this.props.open_control_menu_sub==='save') prp.className = "opened"
        }

        return <li {...prp}>
            <span>Save</span>
        </li>

    }

}

const stt2prp = (state) => {
    return {
        project: state.project,
    };
};

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),
        setControlMenuSubOpen: (value) => actions.setControlMenuSubOpen(dispatch, value),
    };
};

export default connect(stt2prp, dispatch2prp)(Index);