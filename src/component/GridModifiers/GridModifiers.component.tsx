import { Grid, TextField } from '@mui/material';
import { upperFirst } from 'lodash';
import React from 'react';
import GridAccordion from '../GridAccordion';

type Props = {
  title: string;
  modifiers: object;
  updateModifier: React.ChangeEventHandler<HTMLInputElement>;
  currentModifiers: { [key: string]: number | undefined };
  defaultModifiers: any;
};

export const GridModifiers: React.FC<Props> = (props: Props) => {
  const {
    title,
    modifiers,
    updateModifier,
    currentModifiers,
    defaultModifiers,
  } = props;

  return (
    <Grid item xs={12}>
      <GridAccordion defaultExpanded={false} title={title}>
        {Object.keys(modifiers).map((modifier) => (
          <Grid key={modifier} item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label={upperFirst(
                modifier
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .replace(/pct/g, 'percent')
              )}
              /* defaultValue={initialValue} */
              inputProps={{ name: modifier }}
              helperText={`Float - Current value: ${currentModifiers[modifier]}`}
              onChange={updateModifier}
              defaultValue={defaultModifiers[modifier] ?? ''}
            />
          </Grid>
        ))}
      </GridAccordion>
    </Grid>
  );
};

export default GridModifiers;
