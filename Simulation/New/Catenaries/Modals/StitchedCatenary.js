import React from "react";
import Aux from "../../../../../components/_Aux";
import {Modal, PantoModals} from "../../../../../components/PantoModal";
import PantoButton from "../../../../../components/PantoButton";
import PantoInput from "../../../../../components/PantoInput"
import PantoSelectList from "../../../../../components/PantoSelectList"
import PantoRadio from "../../../../../components/PantoRadio"
import {Icons} from "../index"
import update from "react-addons-update";

import {RenderValidation} from "../../../../../components/PantoValidation";


const types_items = [
    {
        label: 'Re 160',
        value: 're_160'
    },
    {
        label: 'Re 200',
        value: 're_200'
    },
    {
        label: 'Re 200 mod',
        value: 're_200_mod'
    },
    {
        label: 'Re 250',
        value: 're_250'
    },
    {
        label: 'Re 330',
        value: 're_330'
    }
]





const validations_rules = [
    {
        name: 'project_name',
        valid: ["minLength", 3],
        error: "Enter a valid name for project"
    },
    {
        name: 'project_model',
        valid: ["equalOne", ["re_200"]],
        error: "Just RE200 model is available"
    }
]





class Index extends React.Component {


    state = {
        catenary_type: 'stitched_catenary',
        name: '',
        tags: [],
        model: 're_200',

        tag_list_open: false,
        my_tags: [],


        isValid: true,
        checkValid: false,
        loading: false
    }

    default_states = {
        catenary_type: 'stitched_catenary',
        name: '',
        tags: [],
        model: 're_200',
    }






    componentDidMount() {
        this.setState({
            my_tags: this.props.my_tags
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.my_tags !== this.props.my_tags) {
            this.setState({
                my_tags: this.props.my_tags
            })
        }

        else if (prevProps.visible !== this.props.visible) {
            this.setState({...this.default_states})
            this.setState({loading: false})
        }
    }




    checkValid = () => {
        return new Promise(resolve => {
            this.setState({checkValid: [true]}, ()=>{
                resolve('resolved');
            })
        });
    }


    cancel = () => {
        this.props.cancel()
        this.setState({...this.default_states})
    }


    okay = async () => {
        await this.checkValid()
        if(!this.state.isValid) return;
        this.setState({loading: true})
        const {
            catenary_type,
            name,
            tags,
            model
        } = this.state
        const pp = {catenary_type, name, tags, model}
        this.props.okay(pp)
    }


    add_new_item = (entered) => {
        this.setState({
            my_tags: update(this.state.my_tags, {
                $push: [{
                    name: entered,
                    value: entered
                }]
            }),
            tags: update(this.state.tags, {$push: [entered]})
        })
    }


    render() {


        const {
            tag_list_open,
            tags,
            my_tags,
            name,
            model,
            isValid,
            loading
        } = this.state


        const $validation = this.props.visible ? <>
            <RenderValidation
                data={{
                    project_name: name,
                    project_model: model
                }}
                rules={validations_rules}
                setValid={(e)=>{this.setState({isValid: e})}}
                checkValid={this.state.checkValid}
            />
        </> : null


        const $footer_modal = <Aux>
            <PantoButton className={'outline'} onClick={this.cancel}>Cancel</PantoButton>
            <PantoButton onClick={this.okay} disabled={!isValid}>Ok</PantoButton>
        </Aux>


        const not_found = () => {
            return "Type first tag"
        }


        const no_result = (entered) => {
            return <div className={"add-custom-item-container"}>
                <div className={"add-custom-item-name"}>{entered}</div>
                <span className={"add-custom-item-button"} onClick={() => {
                    this.add_new_item(entered)
                }}>create?</span>
            </div>
        }


        return <>
            <PantoModals>

                <Modal
                    name={'stitched_catenary'}
                    header={'Stitched catenary'}
                    footer={$footer_modal}
                    visible={this.props.visible}
                    dismiss={this.cancel}
                    loading={loading}
                >

                    <div className="panto-row">

                        <div className="panto-col" style={{width: "300px"}}>

                            <div className="panto-row">
                                <label>Project name</label>
                                <PantoInput
                                    onChange={(v) => {
                                        this.setState({name: v})
                                    }}
                                    value={name}
                                />
                            </div>

                            <div className="panto-row">
                                <label>Tags</label>
                                <PantoSelectList
                                    open={tag_list_open}
                                    onOpen={() => {
                                        this.setState({tag_list_open: true})
                                    }}
                                    onClose={() => {
                                        this.setState({tag_list_open: false})
                                    }}
                                    disabled={false}
                                    placeholder={"Not Selected"}
                                    items={my_tags}
                                    live_search={true}
                                    multiple={true}
                                    onChange={(v) => {
                                        this.setState({tags: v})
                                    }}
                                    value={tags}
                                    no_result={no_result}
                                    not_found={not_found}
                                />
                            </div>


                            <div className="panto-row simulation-type">
                                <PantoRadio
                                    items={types_items}
                                    onChange={(v) => {
                                        this.setState({model: v})
                                    }}
                                    value={model}
                                />
                            </div>

                        </div>

                        <div className="panto-col" style={{width: "300px"}}>
                            <Icons.stitched_catenary color="#4467A5"/>
                        </div>

                    </div>


                </Modal>
            </PantoModals>

            {$validation}
        </>

    }

}

export default Index