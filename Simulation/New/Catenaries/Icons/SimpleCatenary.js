import React from "react";

class Index extends React.Component {

    render() {

        const $color = this.props.color || "#60769b"

        return <svg viewBox="0 0 162 81.169">

            <g stroke={$color}>
                <path
                    d="M160.799.492C64.684 17.523 1.385.492 1.385.492"
                    fill="none"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M23.917 4.814v14.43"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M135.066 4.367v15.676"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M50.105 6.772v13.274"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M76.559 7.574v13.274"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M97.401 7.574v13.274"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M115.035 6.772v13.274"
                />
                <path
                    d="M159.224 18.72S56.973 24.386 2.13 17.32"
                    fill="none"
                />
                <g fill={$color}>
                    <path stroke="none" d="M158 .169h4v81h-4z" />
                    <path fill="none" d="M158.5.669h3v80h-3z" />
                </g>
                <g fill={$color}>
                    <path stroke="none" d="M0 .169h3v81H0z" />
                    <path fill="none" d="M.5.669h2v80h-2z" />
                </g>
            </g>
        </svg>

    }

}

export default Index