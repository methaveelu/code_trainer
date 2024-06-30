import Split from "react-split"
import LoaderIDELeft from "./LoaderIDELeft"
import LoaderIDERight from "./LoaderIDERight"

export default function Loading(){
    return (
        <Split className="split h-screen border border-t-slate-700">
            <LoaderIDELeft/>
            <LoaderIDERight/>
        </Split>
    )
}