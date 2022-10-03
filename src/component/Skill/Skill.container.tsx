import React, { Dispatch, useState } from 'react';
import Skill from './Skill.component';
import {
  setBaseClass,
  setSkillName,
  setIsChildSkill,
  setWeaponType,
  setWeaponPosition,
  setDamageCoefficient,
  setCastDuration,
  setCastDurationQuickness,
  setCooldown,
  setCooldownAlacrity,
  addStrikeOnTick,
  removeStrikeOnTick,
  setStrikeOnTick,
  setStrikeOnTickQuickness,
  addPulseOnTick,
  removePulseOnTick,
  setPulseOnTick,
  setPulseOnTickQuickness,
  addStrikeEffectApplication,
  removeStrikeEffectApplication,
  setStrikeEffectUniqueEffectTypeName,
  setStrikeEffectType,
  setStrikeEffectDirection,
  setStrikeEffectBaseDuration,
  setStrikeEffectNumStacks,
  setStrikeEffectNumTargets,
  addPulseEffectApplication,
  removePulseEffectApplication,
  setPulseEffectUniqueEffectTypeName,
  setPulseEffectType,
  setPulseEffectDirection,
  setPulseEffectBaseDuration,
  setPulseEffectNumStacks,
  setPulseEffectNumTargets,
  addChildSkillKey,
  removeChildSkillKey,
  setChildBaseClass,
  setChildSkillName,
  addTag,
  removeTag,
  setTag,
  setAttributeModifier,
  setDamageModifier,
  setEquipBundleName,
  setAmmo,
  setRechargeDuration,
  setNumTargets,
  SkillType,
  SkillPayload,
  SkillTag,
  Direction,
} from '../../store/Skills';
import { AppDispatch, RootState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BaseClass,
  Effect,
  WeaponPosition,
  WeaponType,
} from '../../util/types';

type Props = PropsFromRedux & {
  skill: SkillType;
  idx: number;
};

const mapStateToProps = (_: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  ...bindActionCreators(
    {
      setBaseClass,
      setSkillName,
      setIsChildSkill,
      setWeaponType,
      setWeaponPosition,
      setDamageCoefficient,
      setCastDuration,
      setCastDurationQuickness,
      setCooldown,
      setCooldownAlacrity,
      addStrikeOnTick,
      removeStrikeOnTick,
      setStrikeOnTick,
      setStrikeOnTickQuickness,
      addPulseOnTick,
      removePulseOnTick,
      setPulseOnTick,
      setPulseOnTickQuickness,
      addStrikeEffectApplication,
      removeStrikeEffectApplication,
      setStrikeEffectUniqueEffectTypeName,
      setStrikeEffectType,
      setStrikeEffectDirection,
      setStrikeEffectBaseDuration,
      setStrikeEffectNumStacks,
      setStrikeEffectNumTargets,
      addPulseEffectApplication,
      removePulseEffectApplication,
      setPulseEffectUniqueEffectTypeName,
      setPulseEffectType,
      setPulseEffectDirection,
      setPulseEffectBaseDuration,
      setPulseEffectNumStacks,
      setPulseEffectNumTargets,
      addChildSkillKey,
      removeChildSkillKey,
      setChildBaseClass,
      setChildSkillName,
      addTag,
      removeTag,
      setTag,
      setAttributeModifier,
      setDamageModifier,
      setEquipBundleName,
      setAmmo,
      setRechargeDuration,
      setNumTargets,
    },
    dispatch
  ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const updateTextGenerator =
  (idx: number) =>
  (dispatcher: Dispatch<SkillPayload<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatcher({ idx, value: e.currentTarget.value });

const updateTextIndexGenerator =
  (idx: number) =>
  (dispatcher: Dispatch<[number, string, number]>, extraIdx: number) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatcher([idx, e.currentTarget.value, extraIdx]);

const updateSelectGenerator =
  (idx: number) =>
  <T,>(dispatcher: Dispatch<SkillPayload<T>>) =>
  (_: React.SyntheticEvent<Element, Event>, value: T) =>
    dispatcher({ idx, value });

const updateSelectIndexGenerator =
  (idx: number) =>
  <T,>(dispatcher: Dispatch<[number, T, number]>, extraIdx: number) =>
  (_: React.SyntheticEvent<Element, Event>, value: T) =>
    dispatcher([idx, value, extraIdx]);

const updateToggleGenerator =
  (idx: number) =>
  (dispatcher: Dispatch<SkillPayload<boolean>>) =>
  (_: React.SyntheticEvent<Element, Event>, value: boolean) =>
    dispatcher({ idx, value });

export const SkillContainer: React.FC<Props> = (props: Props) => {
  const {
    idx,
    skill,
    skill: {
      strikeOnTickList,
      pulseOnTickList,
      onStrikeEffectApplication,
      onPulseEffectApplication,
      childSkillKeys,
      tags,
    },
    setBaseClass,
    setSkillName,
    setIsChildSkill,
    setWeaponType,
    setWeaponPosition,
    setDamageCoefficient,
    setCastDuration,
    setCastDurationQuickness,
    setCooldown,
    setCooldownAlacrity,
    addStrikeOnTick,
    removeStrikeOnTick,
    setStrikeOnTick,
    setStrikeOnTickQuickness,
    addPulseOnTick,
    removePulseOnTick,
    setPulseOnTick,
    setPulseOnTickQuickness,
    addStrikeEffectApplication,
    removeStrikeEffectApplication,
    setStrikeEffectUniqueEffectTypeName,
    setStrikeEffectType,
    setStrikeEffectDirection,
    setStrikeEffectBaseDuration,
    setStrikeEffectNumStacks,
    setStrikeEffectNumTargets,
    addPulseEffectApplication,
    removePulseEffectApplication,
    setPulseEffectUniqueEffectTypeName,
    setPulseEffectType,
    setPulseEffectDirection,
    setPulseEffectBaseDuration,
    setPulseEffectNumStacks,
    setPulseEffectNumTargets,
    addChildSkillKey,
    removeChildSkillKey,
    setChildBaseClass,
    setChildSkillName,
    addTag,
    removeTag,
    setTag,
    setAttributeModifier,
    setDamageModifier,
    setEquipBundleName,
    setAmmo,
    setRechargeDuration,
    setNumTargets,
  } = props;

  const [defaultSkill] = useState(skill);

  const updateText = updateTextGenerator(idx);
  const updateSelect = updateSelectGenerator(idx);
  const updateToggle = updateToggleGenerator(idx);
  const updateTextIndex = updateTextIndexGenerator(idx);
  const updateSelectIndex = updateSelectIndexGenerator(idx);

  const containerFunctions = {
    updateBaseClass: updateSelect<BaseClass>(setBaseClass),
    updateSkillKeyName: updateText(setSkillName),
    updateIsChildSkill: updateToggle(setIsChildSkill),
    updateWeaponType: updateSelect<WeaponType>(setWeaponType),
    updateWeaponPosition: updateSelect<WeaponPosition>(setWeaponPosition),
    updateDamageCoefficient: updateText(setDamageCoefficient),
    updateCastDuration: updateText(setCastDuration),
    updateCastDurationQuickness: updateText(setCastDurationQuickness),
    updateCooldown: updateText(setCooldown),
    updateCooldownAlacrity: updateText(setCooldownAlacrity),
    addStrikeOnTick: () => addStrikeOnTick(idx),
    removeStrikeOnTick: () => removeStrikeOnTick(idx),
    updateStrikeOnTicks: strikeOnTickList[0].map((_, strikeIdx) =>
      updateTextIndex(setStrikeOnTick, strikeIdx)
    ),
    updateStrikeOnTicksQuickness: strikeOnTickList[1].map((_, strikeIdx) =>
      updateTextIndex(setStrikeOnTickQuickness, strikeIdx)
    ),
    addPulseOnTick: () => addPulseOnTick(idx),
    removePulseOnTick: () => removePulseOnTick(idx),
    updatePulseOnTicks: pulseOnTickList[0].map((_, pulseIdx) =>
      updateTextIndex(setPulseOnTick, pulseIdx)
    ),
    updatePulseOnTicksQuickness: pulseOnTickList[1].map((_, pulseIdx) =>
      updateTextIndex(setPulseOnTickQuickness, pulseIdx)
    ),
    addStrikeEffectApplication: () => addStrikeEffectApplication(idx),
    removeStrikeEffectApplication: () => removeStrikeEffectApplication(idx),
    updateStrikeEffectUniqueEffectTypeName: onStrikeEffectApplication.map(
      (_, effectIdx) =>
        updateTextIndex(setStrikeEffectUniqueEffectTypeName, effectIdx)
    ),
    updateStrikeEffectType: onStrikeEffectApplication.map((_, effectIdx) =>
      updateSelectIndex<Effect>(setStrikeEffectType, effectIdx)
    ),
    updateStrikeEffectDirection: onStrikeEffectApplication.map((_, effectIdx) =>
      updateSelectIndex<Direction>(setStrikeEffectDirection, effectIdx)
    ),
    updateStrikeEffectBaseDuration: onStrikeEffectApplication.map(
      (_, effectIdx) => updateTextIndex(setStrikeEffectBaseDuration, effectIdx)
    ),
    updateStrikeEffectNumStacks: onStrikeEffectApplication.map((_, effectIdx) =>
      updateTextIndex(setStrikeEffectNumStacks, effectIdx)
    ),
    updateStrikeEffectNumTargets: onStrikeEffectApplication.map(
      (_, effectIdx) => updateTextIndex(setStrikeEffectNumTargets, effectIdx)
    ),
    addPulseEffectApplication: () => addPulseEffectApplication(idx),
    removePulseEffectApplication: () => removePulseEffectApplication(idx),
    updatePulseEffectUniqueEffectTypeName: onPulseEffectApplication.map(
      (_, effectIdx) =>
        updateTextIndex(setPulseEffectUniqueEffectTypeName, effectIdx)
    ),
    updatePulseEffectType: onPulseEffectApplication.map((_, effectIdx) =>
      updateSelectIndex<Effect>(setPulseEffectType, effectIdx)
    ),
    updatePulseEffectDirection: onPulseEffectApplication.map((_, effectIdx) =>
      updateSelectIndex<Direction>(setPulseEffectDirection, effectIdx)
    ),
    updatePulseEffectBaseDuration: onPulseEffectApplication.map(
      (_, effectIdx) => updateTextIndex(setPulseEffectBaseDuration, effectIdx)
    ),
    updatePulseEffectNumStacks: onPulseEffectApplication.map((_, effectIdx) =>
      updateTextIndex(setPulseEffectNumStacks, effectIdx)
    ),
    updatePulseEffectNumTargets: onPulseEffectApplication.map((_, effectIdx) =>
      updateTextIndex(setPulseEffectNumTargets, effectIdx)
    ),
    addChildSkillKey: () => addChildSkillKey(idx),
    removeChildSkillKey: () => removeChildSkillKey(idx),
    updateChildBaseClass: childSkillKeys.map((_, childIdx) =>
      updateSelectIndex(setChildBaseClass, childIdx)
    ),
    updateChildSkillName: childSkillKeys.map((_, childIdx) =>
      updateTextIndex(setChildSkillName, childIdx)
    ),
    addTag: () => addTag(idx),
    removeTag: () => removeTag(idx),
    updateTags: tags.map((_, tagIdx) =>
      updateSelectIndex<SkillTag>(setTag, tagIdx)
    ),
    updateAttributeModifier: (e: React.ChangeEvent<HTMLInputElement>) =>
      setAttributeModifier({
        idx,
        value: e.currentTarget.value,
        field: e.currentTarget.name,
      }),
    updateDamageModifier: (e: React.ChangeEvent<HTMLInputElement>) =>
      setDamageModifier({
        idx,
        value: e.currentTarget.value,
        field: e.currentTarget.name,
      }),
    updateEquipBundleName: updateText(setEquipBundleName),
    updateAmmo: updateText(setAmmo),
    updateRechargeDuration: updateText(setRechargeDuration),
    updateNumTargets: updateText(setNumTargets),
  };

  const containerProps = {
    skill,
    defaultSkill,
  };

  return <Skill {...containerFunctions} {...containerProps} />;
};

export default connector(SkillContainer);
