import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteVerbatimDetailsProps {
    id: string;
}

export default function DeleteVerbatimDetails({ id }: DeleteVerbatimDetailsProps) {
    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ fontSize: '1.25rem', padding: '12px 24px' }}
            >
                Supprimer
            </Button>
        </div>
    );
}