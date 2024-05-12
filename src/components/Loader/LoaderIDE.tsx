import Split from "react-split"
import LoaderIDELeft from "./LoaderIDELeft"
import LoaderIDERight from "./LoaderIDERight"

export default function LoaderIDE(){
    return (
        <Split className="split h-screen border border-t-slate-700">
            <LoaderIDELeft/>
            <LoaderIDERight/>
        </Split>
    )
}