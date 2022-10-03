import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

type Props = {
  defaultExpanded: boolean;
  title: string;
  children: React.ReactNode;
};

export const GridAccordion: React.FC<Props> = (props: Props) => {
  const { defaultExpanded, title, children } = props;

  return (
    <Grid item xs={12}>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            {children}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default GridAccordion;
