import React from 'react';
import { BaseClass, WeaponType, WeaponPosition } from '../../util/types';
import {
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  Fab,
  Box,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { upperFirst } from 'lodash';
import { initialSkillState, SkillTag, SkillType } from '../../store/Skills';

type TextUpdater = React.ChangeEventHandler<HTMLInputElement>;
type SelectUpdater<T> = (
  e: React.SyntheticEvent<Element, Event>,
  value: T
) => void;
type ToggleUpdater = (
  e: React.SyntheticEvent<Element, Event>,
  value: boolean
) => void;

type Props = {
  skill: SkillType;
  updateBaseClass: SelectUpdater<BaseClass>;
  updateSkillKeyName: TextUpdater;
  updateIsChildSkill: ToggleUpdater;
  updateWeaponType: SelectUpdater<WeaponType>;
  updateWeaponPosition: SelectUpdater<WeaponPosition>;
  updateDamageCoefficient: TextUpdater;
  updateCastDuration: TextUpdater;
  updateCastDurationQuickness: TextUpdater;
  updateCooldown: TextUpdater;
  updateCooldownAlacrity: TextUpdater;
  addStrikeOnTick: () => void;
  removeStrikeOnTick: () => void;
  updateStrikeOnTicks: TextUpdater[];
  updateStrikeOnTicksQuickness: TextUpdater[];
  addPulseOnTick: () => void;
  removePulseOnTick: () => void;
  updatePulseOnTicks: TextUpdater[];
  updatePulseOnTicksQuickness: TextUpdater[];
  addChildSkillKey: () => void;
  removeChildSkillKey: () => void;
  updateChildBaseClass: SelectUpdater<BaseClass>[];
  updateChildSkillName: TextUpdater[];
  addTag: () => void;
  removeTag: () => void;
  updateTags: SelectUpdater<SkillTag>[];
  updateAttributeModifier: TextUpdater;
  updateDamageModifier: TextUpdater;
  updateEquipBundleName: TextUpdater;
  updateAmmo: TextUpdater;
  updateRechargeDuration: TextUpdater;
  updateNumTargets: TextUpdater;
};

export const Skill: React.FC<Props> = (props: Props) => {
  const {
    skill: {
      isChildSkill,
      damageCoefficient,
      castDuration: [castDuration, castDurationQuickness],
      cooldown: [cooldown, cooldownAlacrity],
      strikeOnTickList,
      pulseOnTickList,
      childSkillKeys,
      tags,
      attributeModifiers,
      damageModifiers,
      ammo,
      rechargeDuration,
      numTargets,
    },
    updateBaseClass,
    updateSkillKeyName,
    updateIsChildSkill,
    updateWeaponType,
    updateWeaponPosition,
    updateDamageCoefficient,
    updateCastDuration,
    updateCastDurationQuickness,
    updateCooldown,
    updateCooldownAlacrity,
    addStrikeOnTick,
    removeStrikeOnTick,
    updateStrikeOnTicks,
    updateStrikeOnTicksQuickness,
    addPulseOnTick,
    removePulseOnTick,
    updatePulseOnTicks,
    updatePulseOnTicksQuickness,
    addChildSkillKey,
    removeChildSkillKey,
    updateChildBaseClass,
    updateChildSkillName,
    addTag,
    removeTag,
    updateTags,
    updateAttributeModifier,
    updateDamageModifier,
    updateEquipBundleName,
    updateAmmo,
    updateRechargeDuration,
    updateNumTargets,
  } = props;

  return (
    <Grid container spacing={4}>
      {renderToggleField(updateIsChildSkill, 'Is child skill', isChildSkill)}
      {renderSelectField(
        BaseClass,
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
        `Integer - Current value: ${castDuration}`,
        updateCastDuration,
        'Cast duration without quickness (ms)'
      )}
      {renderTextField(
        `Integer - Current value: ${castDurationQuickness}`,
        updateCastDurationQuickness,
        'Cast duration with quickness (ms)'
      )}
      {renderTextField(
        `Integer - Current value: ${cooldown}`,
        updateCooldown,
        'Cooldown without alacrity (ms)'
      )}
      {renderTextField(
        `Integer - Current value: ${cooldownAlacrity}`,
        updateCooldownAlacrity,
        'Cooldown with alacrity (ms)'
      )}
      <Grid item xs={12}>
        {renderAccordion(
          false,
          'Strike on ticks',
          <>
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
                  onClick={addStrikeOnTick}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  sx={{
                    color: 'common.white',
                    bgcolor: red[500],
                    '&:hover': { bgcolor: red[600] },
                  }}
                  onClick={removeStrikeOnTick}
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Grid>
            {strikeOnTickList[0].map((tick, idx) =>
              renderTextField(
                `Integer - Current value: ${tick}`,
                updateStrikeOnTicks[idx],
                `Index ${idx} without quickness`
              )
            )}
            {strikeOnTickList[1].map((tick, idx) =>
              renderTextField(
                `Integer - Current value: ${tick}`,
                updateStrikeOnTicksQuickness[idx],
                `Index ${idx} with quickness`
              )
            )}
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {renderAccordion(
          false,
          'Pulse on ticks',
          <>
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
                  onClick={addPulseOnTick}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  sx={{
                    color: 'common.white',
                    bgcolor: red[500],
                    '&:hover': { bgcolor: red[600] },
                  }}
                  onClick={removePulseOnTick}
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Grid>
            {pulseOnTickList[0].map((tick, idx) =>
              renderTextField(
                `Integer - Current value: ${tick}`,
                updatePulseOnTicks[idx],
                `Index ${idx} without quickness`
              )
            )}
            {pulseOnTickList[1].map((tick, idx) =>
              renderTextField(
                `Integer - Current value: ${tick}`,
                updatePulseOnTicksQuickness[idx],
                `Index ${idx} with quickness`
              )
            )}
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {renderAccordion(
          false,
          'Child skills',
          <>
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
                  onClick={addChildSkillKey}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  sx={{
                    color: 'common.white',
                    bgcolor: red[500],
                    '&:hover': { bgcolor: red[600] },
                  }}
                  onClick={removeChildSkillKey}
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Grid>
            {childSkillKeys.map((_, idx) => (
              <>
                {renderSelectField(
                  BaseClass,
                  updateChildBaseClass[idx],
                  `Index ${idx} base class`,
                  BaseClass.INVALID
                )}
                {renderTextField(
                  'String',
                  updateChildSkillName[idx],
                  `Index ${idx} skill name`
                )}
              </>
            ))}
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {renderAccordion(
          false,
          'Tags',
          <>
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
                  onClick={addTag}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  sx={{
                    color: 'common.white',
                    bgcolor: red[500],
                    '&:hover': { bgcolor: red[600] },
                  }}
                  onClick={removeTag}
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Grid>
            {tags.map((_, idx) =>
              renderSelectField(
                SkillTag,
                updateTags[idx],
                'Tag',
                SkillTag.INVALID
              )
            )}
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {renderModifiers(
          'Attribute modifiers',
          initialSkillState.attributeModifiers,
          updateAttributeModifier,
          attributeModifiers
        )}
      </Grid>
      <Grid item xs={12}>
        {renderModifiers(
          'Damage modifiers',
          initialSkillState.damageModifiers,
          updateDamageModifier,
          damageModifiers
        )}
      </Grid>
      {renderTextField('String', updateEquipBundleName, 'Equip bundle name')}
      {renderTextField(`Integer - Current value: ${ammo}`, updateAmmo, 'Ammo')}
      {renderTextField(
        `Integer - Current value: ${rechargeDuration}`,
        updateRechargeDuration,
        'Recharge duration (ms)'
      )}
      {renderTextField(
        `Integer - Current value: ${numTargets}`,
        updateNumTargets,
        'Numer of targets'
      )}
    </Grid>
  );
};

const renderSelectField = (
  options: object,
  update: SelectUpdater<any>,
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
  update: TextUpdater,
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

const renderToggleField = (
  update: ToggleUpdater,
  label: string,
  defaultValue: boolean
) => (
  <Grid item xs={12}>
    <FormGroup>
      <FormControlLabel
        onChange={update}
        control={<Switch defaultChecked={defaultValue} />}
        label={label}
      />
    </FormGroup>
  </Grid>
);

const renderModifiers = (
  title: string,
  modifiers: object,
  updateModifier: TextUpdater,
  currentModifiers: { [key: string]: number | undefined }
) =>
  renderAccordion(
    false,
    title,
    Object.keys(modifiers).map((modifier) => (
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
    ))
  );

const renderAccordion = (
  expanded: boolean,
  title: string,
  children: React.ReactNode
) => (
  <Accordion defaultExpanded={expanded}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={4}>
        {children}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default Skill;
