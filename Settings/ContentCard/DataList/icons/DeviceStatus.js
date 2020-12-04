import * as React from "react";


class DeviceStatus extends React.Component {

    render() {
        return <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={45}
                viewBox="0 0 16.035 36.238"
                style={{margin: "0 10px", cursor: "pointer"}}
                {...this.props}
            >
                <defs>
                    <style>
                        {
                            ".prefix__b{fill:none;stroke:#fbb040;stroke-linecap:round;stroke-linejoin:round}"
                        }
                    </style>
                </defs>
                <g fill="none">
                    <path d="M9 32H5a5.006 5.006 0 01-5-5V5a5.006 5.006 0 015-5h4a5.006 5.006 0 015 5v13.818h-1.5v5.719H14V27a5.006 5.006 0 01-5 5z" />
                    <path
                        d="M9 31c2.206 0 4-1.795 4-4v-1.463h-1.502v-7.719H13V5c0-2.205-1.794-4-4-4H5C2.794 1 1 2.795 1 5v22c0 2.205 1.794 4 4 4h4m0 1H5c-2.757 0-5-2.244-5-5V5c0-2.757 2.243-5 5-5h4c2.758 0 5 2.243 5 5v13.818h-1.502v5.719H14v2.462c0 2.757-2.242 5-5 5z"
                        fill="#fbb040"
                    />
                </g>
                <g transform="translate(1.853 3.552)">
                    <circle
                        className="prefix__b"
                        cx={1.188}
                        cy={1.188}
                        r={1.188}
                        transform="translate(3.528 3.528)"
                    />
                    <path
                        className="prefix__b"
                        d="M7.917 6.024a.71.71 0 00.142.783l.026.026A.861.861 0 116.867 8.05l-.026-.026a.716.716 0 00-1.213.508v.073a.861.861 0 11-1.721 0v-.039a.745.745 0 00-1.248-.508l-.026.026a.861.861 0 11-1.217-1.217l.026-.026a.716.716 0 00-.508-1.213H.861a.861.861 0 110-1.721H.9a.745.745 0 00.508-1.248l-.026-.026A.861.861 0 112.6 1.416l.026.026a.71.71 0 00.783.142h.034a.71.71 0 00.43-.65V.861a.861.861 0 111.721 0V.9a.716.716 0 001.213.508l.026-.026A.861.861 0 118.05 2.6l-.026.026a.71.71 0 00-.142.783v.034a.71.71 0 00.65.43h.073a.861.861 0 110 1.721h-.039a.71.71 0 00-.649.43z"
                    />
                </g>
                <path stroke="#fbb040" fill="none" d="M7.102 31.815v4.138" />
                <path
                    strokeLinecap="round"
                    stroke="#fbb040"
                    fill="none"
                    d="M15.535 35.738H7.102"
                />
            </svg>
        </>
    }

}


export default DeviceStatus