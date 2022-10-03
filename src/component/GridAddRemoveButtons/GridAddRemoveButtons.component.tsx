import { Box, Fab, Grid } from '@mui/material';
import { green, red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

type Props = {
  onAdd: () => void;
  onRemove: () => void;
};

export const GridAddRemoveButtons: React.FC<Props> = (props: Props) => {
  const { onAdd, onRemove } = props;

  return (
    <Grid item xs={12}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          sx={{
            color: 'common.white',
            bgcolor: green[500],
            '&:hover': {
              bgcolor: green[600],
            },
          }}
          onClick={onAdd}
        >
          <AddIcon />
        </Fab>
        <Fab
          sx={{
            color: 'common.white',
            bgcolor: red[500],
            '&:hover': { bgcolor: red[600] },
          }}
          onClick={onRemove}
        >
          <RemoveIcon />
        </Fab>
      </Box>
    </Grid>
  );
};

export default GridAddRemoveButtons;
