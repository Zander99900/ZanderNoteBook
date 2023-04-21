import { useState } from "react";
import noteContext from "./NoteContext"

const NoteState = (props) =>{
    const s1 = {
        "name":"Zander",
        "class":"10 G"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState ({
                "name":"Dipankar",
                "class":"5 E"
            })
        }, 1000)
    }
    return(
        <noteContext.Provider value = {{state:state, update:update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState