import Split from "react-split"
import LoaderIDELeft from "../Loader/LoaderIDELeft"
import LoaderIDERight from "../Loader/LoaderIDERight"

export default function Loading(){
    return (
        <Split className="split h-screen border border-t-slate-700">
            <LoaderIDELeft/>
            <LoaderIDERight/>
        </Split>
    )
}