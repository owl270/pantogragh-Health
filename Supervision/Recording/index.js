import React from "react";
import PantoButton from "../../../components/PantoButton";


// function App() {
//     const { isRecording, recording, toggleRecording } = useScreenRecording();
//
//     return (
//         <div>
//             <button onClick={toggleRecording}>
//                 {isRecording ? "Stop" : "Start Recording"}
//             </button>
//
//             {!!recording && (
//                 <video autoPlay src={recording && URL.createObjectURL(recording)} />
//             )}
//         </div>
//     );
// }


class Index extends React.Component {


    render() {


        return (
            <PantoButton
                onClick={() => {

                }}
            >
                Record & Save result
            </PantoButton>
        )

    }


}


export default Index