import React from 'react';
import { initialSkillState, SkillType } from './Skill.config';
import { Class, WeaponType, WeaponPosition } from '../../util/types';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { upperFirst } from 'lodash';

type Props = {
  skill: SkillType;
  updateBaseClass: (
    e: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  updateSkillKeyName: React.ChangeEventHandler<HTMLInputElement>;
  updateWeaponType: (
    e: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  updateWeaponPosition: (
    e: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  updateDamageCoefficient: React.ChangeEventHandler<HTMLInputElement>;
  updateCastDurationNoQuick: React.ChangeEventHandler<HTMLInputElement>;
  updateAttributeModifier: React.ChangeEventHandler<HTMLInputElement>;
  updateDamageModifier: React.ChangeEventHandler<HTMLInputElement>;
};

export const Skill: React.FC<Props> = (props: Props) => {
  const {
    skill: {
      damageCoefficient,
      castDuration: [castDurationNoQuick, castDurationQuick],
      attributeModifiers,
      damageModifiers,
    },
    updateBaseClass,
    updateSkillKeyName,
    updateWeaponType,
    updateWeaponPosition,
    updateDamageCoefficient,
    updateCastDurationNoQuick,
    updateAttributeModifier,
    updateDamageModifier,
  } = props;

  return (
    <Grid container spacing={4}>
      {renderSelectField(
        Class,
        updateBaseClass,
        'Base class',
        initialSkillState.skillKey.baseClass
      )}
      {renderTextField('String', updateSkillKeyName, 'Skill name')}
      {renderSelectField(
        WeaponType,
        updateWeaponType,
        'Weapon type',
        initialSkillState.weaponType
      )}
      {renderSelectField(
        WeaponPosition,
        updateWeaponPosition,
        'Weapon position',
        initialSkillState.weaponPosition
      )}
      {renderTextField(
        `Float - Current value: ${damageCoefficient}`,
        updateDamageCoefficient,
        'Damage coefficient'
      )}
      {renderTextField(
        `Integer - Current value: ${castDurationNoQuick}`,
        updateCastDurationNoQuick,
        'Cast duration without quickness (ms)'
      )}
      <Grid item xs={12}>
        {renderModifiers(
          'Attribute modifiers',
          initialSkillState.attributeModifiers,
          updateAttributeModifier,
          attributeModifiers
        )}
        {renderModifiers(
          'Damage modifiers',
          initialSkillState.damageModifiers,
          updateDamageModifier,
          damageModifiers
        )}
      </Grid>
    </Grid>
  );
};

const renderSelectField = (
  options: object,
  update: (e: React.SyntheticEvent<Element, Event>, value: any) => void,
  label: string,
  defaultValue: string
) => (
  <Grid item xs={12} sm={6} md={4}>
    <Autocomplete
      options={Object.values(options)}
      disableClearable
      autoHighlight
      autoComplete
      autoSelect
      defaultValue={defaultValue}
      fullWidth
      onChange={update}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  </Grid>
);

const renderTextField = (
  helperText: string,
  update: React.ChangeEventHandler<HTMLInputElement>,
  label: string
) => (
  <Grid item xs={12} sm={6} md={4}>
    <TextField
      fullWidth
      label={label}
      helperText={helperText}
      onChange={update}
    />
  </Grid>
);

const renderModifiers = (
  title: string,
  modifiers: object,
  updateModifier: React.ChangeEventHandler<HTMLInputElement>,
  currentModifiers: { [key: string]: number }
) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={4}>
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
            />
          </Grid>
        ))}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default Skill;
