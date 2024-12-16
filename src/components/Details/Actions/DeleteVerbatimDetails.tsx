import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteVerbatimDetailsProps {
    id : string;
}

export default function DeleteVerbatimDetails({id} : DeleteVerbatimDetailsProps) {
    return (
        <div>
            <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            >
                Supprimer
            </Button>
        </div>
    )
}