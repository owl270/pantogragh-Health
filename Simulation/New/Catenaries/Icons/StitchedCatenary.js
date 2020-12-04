import React from "react";

class Index extends React.Component {



    render() {

        const $color = this.props.color || "#60769b"

        return <svg viewBox="0 0 175.859 76.554">


            <g stroke={$color}>
                <path
                    d="M.18 8.973l15.589-5.859s19.748 5.314 53.572 6.58c23.951.9 89.279-9.18 89.279-9.18l17.069 6.289"
                    fill="none"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M36.166 8.604v12.45"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M136.803 6.199v14.616"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M59.878 8.799v13.255"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M83.829 9.525v12.019"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M102.7 8.604v12.94"
                />
                <path
                    fill="none"
                    strokeWidth={2}
                    d="M118.667 6.199v14.618"
                />
                <path
                    d="M166.224 19.336s-109.643 6.4-159.3 0"
                    fill="none"
                />


                <g fill={$color}>
                    <path stroke="none" d="M157.788.554h3v76h-3z" />
                    <path fill="none" d="M158.288 1.054h2v75h-2z" />
                </g>
                <g fill={$color}>
                    <path stroke="none" d="M13.788 3.554h3v73h-3z" />
                    <path fill="none" d="M14.288 4.054h2v72h-2z" />
                </g>


                <path fill="none" d="M.856 8.604h50.497"/>
                <path fill="none" d="M118.683 6.199h55.306"/>

            </g>
        </svg>

    }

}

export default Index