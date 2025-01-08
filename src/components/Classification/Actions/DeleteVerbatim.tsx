import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteVerbatims } from '../../../api/verbatims';

export default function DeleteVerbatim() {
  const queryClient = useQueryClient();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  const mutation = useMutation(deleteVerbatims, {
    onSuccess: () => {
      queryClient.invalidateQueries('verbatims');
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((verbatim) => verbatim._id);
    mutation.mutate(ids);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{ fontSize: '1.05rem', padding: '12px 24px', textTransform: 'none' }}
        onClick={handleDelete}
      >
        Supprimer
      </Button>
    </div>
  );
}