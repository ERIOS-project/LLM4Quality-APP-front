import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteVerbatimDetailsProps {
    id : string;
}

export default function DeleteVerbatimDetails({id} : DeleteVerbatimDetailsProps) {
    return (
        <div>
            <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            >
                Supprimer le verbatim
            </Button>
        </div>
    )
}