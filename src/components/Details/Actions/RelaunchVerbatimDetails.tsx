import Verbatim from "../../../models/Verbatim";
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

interface RelaunchVerbatimDetailsProps {
    verbatim: Verbatim;
}

export default function RelaunchVerbatimDetails({ verbatim }: RelaunchVerbatimDetailsProps) {
    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                sx={{ fontSize: '1.25rem', padding: '12px 24px' }}
            >
                Relancer
            </Button>
        </div>
    );
}