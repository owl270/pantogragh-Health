import * as React from "react";
import Aux from "../../../../components/_Aux";
import {Scrollbars} from "react-custom-scrollbars";

import catenary_list, {Icons} from "../Catenaries";
import moment from "moment";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";
import {
    Redirect,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import PantoSelectList from "../../../../components/PantoSelectList";
import {$API} from "../../../../../api/server";




const OpenSimulation = (props) => {
    let location = useLocation();

    if(props.disabled(props.token)) {
        return (<>{props.children}</>)
    }
    else {
        return (
            <Link
                to={{
                    pathname: `/empowerment/simulation/${props.token}`,
                    // state: {background: location}
                }}
            >
                <>{props.children}</>
            </Link>
        )
    }

}





const _item_access = [
    {
        name: "All Access",
        value: "all"
    },
    {
        name: "Full",
        value: "full"
    },
    {
        name: "Read",
        value: "read"
    },
    {
        name: "Write",
        value: "write"
    }
]


const _item_catenary_type = [
    {
        name: "All Catenary",
        value: "all"
    },
    {
        name: "Simple",
        value: "simple_catenary"
    },
    {
        name: "Stitched",
        value: "stitched_catenary"
    },
    {
        name: "Compound",
        value: "compound_catenary"
    }
]



class Index extends React.Component {

    state = {
        // isValidToken: false,





        filter_open: null,


        filter_tag: [],
        filter_access: "all",
        filter_catenary_type: "all",

    }

    renderThumbY({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#4467A5',
            width: '4px',
            padding: 0,
            borderRadius: '5px'
        }
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackY({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "2px",
            bottom: "2px",
            top: "0px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    componentDidMount() {
        this.getProjects()
        // if(this.props.token) {
        //     setTimeout(()=>{
        //         this.setState({
        //             isValidToken: true
        //         })
        //     }, 5000)
        // }
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.filter_open!==prevState.filter_open) {
            if(!this.state.filter_open) {
                setTimeout(()=>{
                    this.getProjects()
                }, 100)
            }
        }
        if(this.props.get_project!==prevProps.get_project) {

            this.setState({
                filter_tag: [],
                filter_access: "all",
                filter_catenary_type: "all",
            }, ()=>{
                this.getProjects()
            })

        }
    }






    getProjects() {

        const {
            filter_tag,
            filter_access,
            filter_catenary_type
        } = this.state


        // this.props.setLoading(true)

        let data = {}

        if(filter_tag.length > 0) data["tags"] = filter_tag
        if(filter_catenary_type!=="all") data["catenary_type"] = filter_catenary_type
        if(filter_access!=="all") data["access"] = filter_access



        $API.getSimulationProjects(data, (response) => {
            if(response.ok) {
                let {my_projects} = response.result
                this.props.setProjects(my_projects)

                if(!Object.keys(data).length) {
                    let mt = [], st = []
                    for(let i=0;i<my_projects.length;i++) {
                        for(let j=0;j<my_projects[i].tags.length;j++) {
                            if(!st.includes(my_projects[i].tags[j])) {
                                mt.push({
                                    name: my_projects[i].tags[j],
                                    value: my_projects[i].tags[j]
                                })
                                st.push(my_projects[i].tags[j])
                            }
                        }
                    }
                    this.props.setMyTags(mt)
                }


                this.props.setLoading(false)
            }
        })

    }



    render() {

        const {
            isDisabled,
            my_projects,
            my_tags
        } = this.props

        const {
            filter_open,

            filter_tag,
            filter_access,
            filter_catenary_type
        } = this.state



        let $my_projects = my_projects.map((v, i) => {
            const Icon = Icons[v.catenary_type]

            return <li key={i}>
                <OpenSimulation
                    token={v.token}
                    disabled={isDisabled}
                >
                    <div className="my-catenary-item">
                        <div className="thump-place">
                            <Icon />
                        </div>
                        <span className="project-name">{v.name}</span>
                        <span className="project-last-update"><b>Updated: </b>{moment(v.last_update).format("DDMMM YYYY HH:mm")}</span>
                        <div className="project-detail">
                            <span className="project-access">{v.permission}</span>
                        </div>
                    </div>
                </OpenSimulation>
            </li>
        })

        let $content = 'Not Project found'
        if($my_projects.length > 0) {
            $content = <Scrollbars
                ref="scrollbars"
                renderThumbVertical={this.renderThumbY}
                renderTrackVertical={this.renderTrackY}
                hideTracksWhenNotNeeded
            >
                <ul>
                    {$my_projects}
                </ul>
            </Scrollbars>
        }





        return <Aux>

            <header>
                <h6>Catenary Pool</h6>
                <div className="catenary-pool-filtering">


                    {/* access */}
                    <PantoSelectList
                        open={filter_open==='access'}
                        onOpen={() => {
                            this.setState({filter_open: 'access'})
                        }}
                        onClose={() => {
                            this.setState({filter_open: null})
                        }}
                        disabled={false}
                        placeholder={"Access"}
                        items={_item_access}

                        onChange={(v) => {
                            this.setState({filter_access: v})
                        }}
                        value={filter_access}
                    />


                    {/* catenary_type */}
                    <PantoSelectList
                        open={filter_open==='catenary_type'}
                        onOpen={() => {
                            this.setState({filter_open: 'catenary_type'})
                        }}
                        onClose={() => {
                            this.setState({filter_open: null})
                        }}
                        disabled={false}
                        placeholder={"CatenaryType"}
                        items={_item_catenary_type}
                        onChange={(v) => {
                            this.setState({filter_catenary_type: v})
                        }}
                        value={filter_catenary_type}
                    />



                    {/* tag */}
                    <PantoSelectList
                        open={filter_open==='tag'}
                        onOpen={() => {
                            this.setState({filter_open: 'tag'})
                        }}
                        onClose={() => {
                            this.setState({filter_open: null})
                        }}
                        disabled={false}
                        placeholder={"No selected"}
                        items={my_tags}
                        multiple={true}
                        onChange={(v) => {
                            this.setState({filter_tag: v})
                        }}
                        value={filter_tag}
                    />


                </div>
            </header>


            <div className="my-projects-list-container hide-scrollbar">
                {$content}
            </div>

        </Aux>

    }


}



const stt2prp = (state) => {
    return {
        my_projects: state.my_projects,
        my_tags: state.my_tags,
        get_project: state.get_project,
        isDisabled: (stt) => actions.isDisabled(state, {type: '', state: stt, value: ''}),
    }
}

const dispatch2prp = (dispatch, state) => {
    return {
        setProjects: (my_projects) => actions.setProjects(dispatch, my_projects),
        setMyTags: (my_tags) => actions.setMyTags(dispatch, my_tags),
        setLoading: (value) => actions.setLoading(dispatch, value)
    }
}

export default connect(stt2prp, dispatch2prp)(Index);