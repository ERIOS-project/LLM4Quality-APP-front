import Verbatim from "../../../models/Verbatim"
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

interface RelaunchVerbatimDetailsProps {
    verbatim: Verbatim;
}


export default function RelaunchVerbatimDetails({verbatim} : RelaunchVerbatimDetailsProps) {
    return (
        <div>
            <Button
            variant="contained"
            color="primary"
            startIcon={<ReplayIcon />}
            >
                Relancer la classification
            </Button>
        </div>
    )
}