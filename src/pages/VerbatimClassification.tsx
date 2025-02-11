import VerbatimDatagrid from "../components/Classification/VerbatimDatagrid";
import VerbatimDatagridActions from "../components/Classification/VerbatimDatagridActions";

export default function VerbatimClassification() {
    return (
        <div>
            <div style={{ margin: '16px', marginBottom:'32px' }}>
                <VerbatimDatagridActions />
            </div>
            <VerbatimDatagrid />
        </div>
    );
}