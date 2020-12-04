
import SimpleCatenaryIcon from "./Icons/SimpleCatenary"
import StitchedCatenaryIcon from "./Icons/StitchedCatenary"
import CompoundCatenaryIcon from "./Icons/CompoundCatenary"
import RequestCatenaryIcon from "./Icons/RequestCatenary"


import StitchedCatenaryModal from "./Modals/StitchedCatenary"





export const Icons = {
    simple_catenary: SimpleCatenaryIcon,
    stitched_catenary: StitchedCatenaryIcon,
    compound_catenary: CompoundCatenaryIcon,
    request_catenary: RequestCatenaryIcon,
}

export const Modals = {
    stitched_catenary: StitchedCatenaryModal
}

export default [
    {
        id: 'simple_catenary',
        title: 'New simple catenary',
        disabled: true
    },
    {
        id: 'stitched_catenary',
        title: 'New stitched catenary',
        disabled: false
    },
    {
        id: 'compound_catenary',
        title: 'New compound catenary',
        disabled: true
    }
]

export const RequestCatenary = {
    id: 'request_catenary',
    title: 'Request for custom catenary',
    disabled: false
}


