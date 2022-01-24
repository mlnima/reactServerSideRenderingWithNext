import {FC} from "react";
import parse from 'html-react-parser'

interface ScriptParserPropTypes {
    script:string
}

const ScriptParser: FC<ScriptParserPropTypes> = ({script}) => {
    return (
        <>
            {parse(script)}
        </>
    )
};
export default ScriptParser
