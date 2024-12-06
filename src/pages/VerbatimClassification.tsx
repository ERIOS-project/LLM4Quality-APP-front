import VerbatimDatagrid from "../components/Classification/VerbatimDatagrid";
import VerbatimDatagridActions from "../components/Classification/VerbatimDatagridActions";

export default function VerbatimClassification(){
    return(
        <div>
            <VerbatimDatagridActions/>
            <VerbatimDatagrid/>
        </div>
    )
}