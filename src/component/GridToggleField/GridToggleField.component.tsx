import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import React from 'react';

type Props = {
  onChange: (e: React.SyntheticEvent<Element, Event>, value: boolean) => void;
  label: string;
  defaultValue: boolean;
};

export const GridToggleField: React.FC<Props> = (props: Props) => {
  const { onChange, label, defaultValue } = props;

  return (
    <Grid item xs={12}>
      <FormGroup>
        <FormControlLabel
          onChange={onChange}
          control={<Switch defaultChecked={defaultValue} />}
          label={label}
        />
      </FormGroup>
    </Grid>
  );
};

export default GridToggleField;
