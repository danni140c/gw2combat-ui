import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';

type Props = {
  options: object;
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any) => void;
  label: string;
  defaultValue: string;
};

export const GridSelectField: React.FC<Props> = (props: Props) => {
  const { options, onChange, label, defaultValue } = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Autocomplete
        options={Object.values(options)}
        disableClearable
        autoHighlight
        autoComplete
        autoSelect
        defaultValue={defaultValue}
        fullWidth
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default GridSelectField;
