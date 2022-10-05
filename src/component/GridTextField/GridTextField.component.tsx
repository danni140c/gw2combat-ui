import { Grid, TextField } from '@mui/material';
import React from 'react';

type Props = {
  helperText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  defaultValue?: string | number | undefined;
  name?: string;
};

export const GridTextField: React.FC<Props> = (props: Props) => {
  const {
    helperText,
    onChange,
    label,
    defaultValue: defaultValueProp,
    name,
  } = props;

  const defaultValue = defaultValueProp !== undefined ? defaultValueProp : '';

  return (
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        fullWidth
        label={label}
        helperText={helperText}
        onChange={onChange}
        defaultValue={defaultValue}
        inputProps={{ name: label }}
      />
    </Grid>
  );
};

export default GridTextField;
