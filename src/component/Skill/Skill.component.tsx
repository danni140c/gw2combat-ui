import React from 'react';
import {
  BaseClass,
  WeaponType,
  WeaponPosition,
  Effect,
} from '../../util/types';
import { Grid } from '@mui/material';
import {
  initialSkillState,
  SkillTag,
  SkillType,
  Direction,
} from '../../store/Skills';
import GridTextField from '../GridTextField';
import GridSelectField from '../GridSelectField';
import GridToggleField from '../GridToggleField';
import GridAddRemoveButtons from '../GridAddRemoveButtons';
import GridAccordion from '../GridAccordion';
import GridModifiers from '../GridModifiers';

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
  defaultSkill: SkillType;
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
  addStrikeEffectApplication: () => void;
  removeStrikeEffectApplication: () => void;
  updateStrikeEffectUniqueEffectTypeName: TextUpdater[];
  updateStrikeEffectType: SelectUpdater<Effect>[];
  updateStrikeEffectDirection: SelectUpdater<Direction>[];
  updateStrikeEffectBaseDuration: TextUpdater[];
  updateStrikeEffectNumStacks: TextUpdater[];
  updateStrikeEffectNumTargets: TextUpdater[];
  addPulseEffectApplication: () => void;
  removePulseEffectApplication: () => void;
  updatePulseEffectUniqueEffectTypeName: TextUpdater[];
  updatePulseEffectType: SelectUpdater<Effect>[];
  updatePulseEffectDirection: SelectUpdater<Direction>[];
  updatePulseEffectBaseDuration: TextUpdater[];
  updatePulseEffectNumStacks: TextUpdater[];
  updatePulseEffectNumTargets: TextUpdater[];
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
      damageCoefficient,
      castDuration: [castDuration, castDurationQuickness],
      cooldown: [cooldown, cooldownAlacrity],
      strikeOnTickList,
      pulseOnTickList,
      onStrikeEffectApplication,
      onPulseEffectApplication,
      childSkillKeys,
      tags,
      attributeModifiers,
      damageModifiers,
      ammo,
      rechargeDuration,
      numTargets,
    },
    defaultSkill,
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
    addStrikeEffectApplication,
    removeStrikeEffectApplication,
    updateStrikeEffectUniqueEffectTypeName,
    updateStrikeEffectType,
    updateStrikeEffectDirection,
    updateStrikeEffectBaseDuration,
    updateStrikeEffectNumStacks,
    updateStrikeEffectNumTargets,
    addPulseEffectApplication,
    removePulseEffectApplication,
    updatePulseEffectUniqueEffectTypeName,
    updatePulseEffectType,
    updatePulseEffectDirection,
    updatePulseEffectBaseDuration,
    updatePulseEffectNumStacks,
    updatePulseEffectNumTargets,
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
      <GridToggleField
        onChange={updateIsChildSkill}
        label='Is child skill'
        defaultValue={defaultSkill.isChildSkill}
      />
      <GridSelectField
        options={BaseClass}
        onChange={updateBaseClass}
        label='Base class'
        defaultValue={defaultSkill.skillKey.baseClass}
      />
      <GridTextField
        helperText='String'
        onChange={updateSkillKeyName}
        label='Skill name'
        defaultValue={defaultSkill.skillKey.name}
      />
      <GridSelectField
        options={WeaponType}
        onChange={updateWeaponType}
        label='Weapon type'
        defaultValue={defaultSkill.weaponType}
      />
      <GridSelectField
        options={WeaponPosition}
        onChange={updateWeaponPosition}
        label='Weapon position'
        defaultValue={defaultSkill.weaponPosition}
      />
      <GridTextField
        helperText={`Float - Current value: ${damageCoefficient}`}
        onChange={updateDamageCoefficient}
        label='Damage coefficient'
        defaultValue={defaultSkill.damageCoefficient}
      />
      <GridTextField
        helperText={`Integer - Current value: ${castDuration}`}
        onChange={updateCastDuration}
        label='Cast duration without quickness (ms)'
        defaultValue={defaultSkill.castDuration[0]}
      />
      <GridTextField
        helperText={`Integer - Current value: ${castDurationQuickness}`}
        onChange={updateCastDurationQuickness}
        label='Cast duration with quickness (ms)'
        defaultValue={defaultSkill.castDuration[1]}
      />
      <GridTextField
        helperText={`Integer - Current value: ${cooldown}`}
        onChange={updateCooldown}
        label='Cooldown without alacrity (ms)'
        defaultValue={defaultSkill.cooldown[0]}
      />
      <GridTextField
        helperText={`Integer - Current value: ${cooldownAlacrity}`}
        onChange={updateCooldownAlacrity}
        label='Cooldown with alacrity (ms)'
        defaultValue={defaultSkill.cooldown[1]}
      />
      <GridAccordion defaultExpanded={false} title='Strike on ticks'>
        <GridAddRemoveButtons
          onAdd={addStrikeOnTick}
          onRemove={removeStrikeOnTick}
        />
        {strikeOnTickList[0].map((tick, idx) => (
          <GridTextField
            key={`0-${idx}`}
            helperText={`Integer - Current value: ${tick}`}
            onChange={updateStrikeOnTicks[idx]}
            label={`Index ${idx} without quickness`}
            defaultValue={(defaultSkill.strikeOnTickList[0] || [])[idx]}
          />
        ))}
        {strikeOnTickList[1].map((tick, idx) => (
          <GridTextField
            key={`1-${idx}`}
            helperText={`Integer - Current value: ${tick}`}
            onChange={updateStrikeOnTicksQuickness[idx]}
            label={`Index ${idx} with quickness`}
            defaultValue={(defaultSkill.strikeOnTickList[1] || [])[idx]}
          />
        ))}
      </GridAccordion>
      <GridAccordion defaultExpanded={false} title='Pulse on ticks'>
        <GridAddRemoveButtons
          onAdd={addPulseOnTick}
          onRemove={removePulseOnTick}
        />
        {pulseOnTickList[0].map((tick, idx) => (
          <GridTextField
            key={`0-${idx}`}
            helperText={`Integer - Current value: ${tick}`}
            onChange={updatePulseOnTicks[idx]}
            label={`Index ${idx} without quickness`}
            defaultValue={(defaultSkill.pulseOnTickList[0] || [])[idx]}
          />
        ))}
        {pulseOnTickList[1].map((tick, idx) => (
          <GridTextField
            key={`1-${idx}`}
            helperText={`Integer - Current value: ${tick}`}
            onChange={updatePulseOnTicksQuickness[idx]}
            label={`Index ${idx} with quickness`}
            defaultValue={(defaultSkill.pulseOnTickList[1] || [])[idx]}
          />
        ))}
      </GridAccordion>
      <GridAccordion
        defaultExpanded={false}
        title='On strike effect applications'
      >
        <GridAddRemoveButtons
          onAdd={addStrikeEffectApplication}
          onRemove={removeStrikeEffectApplication}
        />
        {onStrikeEffectApplication.map((effect, idx) => (
          <React.Fragment key={idx}>
            <GridTextField
              helperText='String'
              onChange={updateStrikeEffectUniqueEffectTypeName[idx]}
              label={`Index ${idx} effect name`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.uniqueEffectType
                  ?.name
              }
            />
            <GridSelectField
              options={Effect}
              onChange={updateStrikeEffectType[idx]}
              label={`Index ${idx} effect type`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.effectType ||
                Effect.FURY
              }
            />
            <GridSelectField
              options={Direction}
              onChange={updateStrikeEffectDirection[idx]}
              label={`Index ${idx} effect direction`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.direction ||
                Direction.SELF
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.baseDuration}`}
              onChange={updateStrikeEffectBaseDuration[idx]}
              label={`Index ${idx} effect base duration`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.baseDuration || 0
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.numStacks}`}
              onChange={updateStrikeEffectNumStacks[idx]}
              label={`Index ${idx} effect number of stacks`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.numStacks || 0
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.numTargets}`}
              onChange={updateStrikeEffectNumTargets[idx]}
              label={`Index ${idx} effect number of targets`}
              defaultValue={
                defaultSkill.onStrikeEffectApplication[idx]?.numTargets || 1
              }
            />
          </React.Fragment>
        ))}
      </GridAccordion>
      <GridAccordion
        defaultExpanded={false}
        title='On pulse effect applications'
      >
        <GridAddRemoveButtons
          onAdd={addPulseEffectApplication}
          onRemove={removePulseEffectApplication}
        />
        {onPulseEffectApplication.map((effect, idx) => (
          <React.Fragment key={idx}>
            <GridTextField
              helperText='String'
              onChange={updatePulseEffectUniqueEffectTypeName[idx]}
              label={`Index ${idx} effect name`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.uniqueEffectType
                  ?.name
              }
            />
            <GridSelectField
              options={Effect}
              onChange={updatePulseEffectType[idx]}
              label={`Index ${idx} effect type`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.effectType ||
                Effect.FURY
              }
            />
            <GridSelectField
              options={Direction}
              onChange={updatePulseEffectDirection[idx]}
              label={`Index ${idx} effect direction`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.direction ||
                Direction.SELF
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.baseDuration}`}
              onChange={updatePulseEffectBaseDuration[idx]}
              label={`Index ${idx} effect base duration`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.baseDuration || 0
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.numStacks}`}
              onChange={updatePulseEffectNumStacks[idx]}
              label={`Index ${idx} effect number of stacks`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.numStacks || 0
              }
            />
            <GridTextField
              helperText={`Integer - Current value: ${effect.numTargets}`}
              onChange={updatePulseEffectNumTargets[idx]}
              label={`Index ${idx} effect number of targets`}
              defaultValue={
                defaultSkill.onPulseEffectApplication[idx]?.numTargets || 1
              }
            />
          </React.Fragment>
        ))}
      </GridAccordion>
      <GridAccordion defaultExpanded={false} title='Child skills'>
        <GridAddRemoveButtons
          onAdd={addChildSkillKey}
          onRemove={removeChildSkillKey}
        />
        {childSkillKeys.map((_, idx) => (
          <React.Fragment key={idx}>
            <GridSelectField
              options={BaseClass}
              onChange={updateChildBaseClass[idx]}
              label={`Index ${idx} base class`}
              defaultValue={
                defaultSkill.childSkillKeys[idx]?.baseClass ||
                initialSkillState.skillKey.baseClass
              }
            />
            <GridTextField
              helperText='String'
              onChange={updateChildSkillName[idx]}
              label={`Index ${idx} skill name`}
              defaultValue={defaultSkill.childSkillKeys[idx]?.name}
            />
          </React.Fragment>
        ))}
      </GridAccordion>
      <GridAccordion defaultExpanded={false} title='Tags'>
        <GridAddRemoveButtons onAdd={addTag} onRemove={removeTag} />
        {tags.map((_, idx) => (
          <GridSelectField
            key={idx}
            options={SkillTag}
            onChange={updateTags[idx]}
            label='Tag'
            defaultValue={defaultSkill.tags[idx] || SkillTag.INVALID}
          />
        ))}
      </GridAccordion>
      <GridModifiers
        title='Attribute modifiers'
        modifiers={initialSkillState.attributeModifiers}
        updateModifier={updateAttributeModifier}
        currentModifiers={attributeModifiers}
        defaultModifiers={defaultSkill.attributeModifiers}
      />
      <GridModifiers
        title='Damage modifiers'
        modifiers={initialSkillState.damageModifiers}
        updateModifier={updateDamageModifier}
        currentModifiers={damageModifiers}
        defaultModifiers={defaultSkill.damageModifiers}
      />
      <GridTextField
        helperText='String'
        onChange={updateEquipBundleName}
        label='Equip bundle name'
        defaultValue={defaultSkill.equipBundle.name}
      />
      <GridTextField
        helperText={`Integer - Current value: ${ammo}`}
        onChange={updateAmmo}
        label='Ammo'
        defaultValue={defaultSkill.ammo}
      />
      <GridTextField
        helperText={`Integer - Current value: ${rechargeDuration}`}
        onChange={updateRechargeDuration}
        label='Recharge duration (ms)'
        defaultValue={defaultSkill.rechargeDuration}
      />
      <GridTextField
        helperText={`Integer - Current value: ${numTargets}`}
        onChange={updateNumTargets}
        label='Number of targets'
        defaultValue={defaultSkill.numTargets}
      />
    </Grid>
  );
};

export default Skill;
