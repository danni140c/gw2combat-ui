import React, { Dispatch } from 'react';
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
} from '../../store/Skills';
import { RootState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { BaseClass, WeaponPosition, WeaponType } from '../../util/types';

type Props = PropsFromRedux & {
  skill: SkillType;
  idx: number;
};

const mapStateToProps = (_: RootState) => ({});

const mapDispatchToProps = {
  setBaseClass: (payload: SkillPayload<string>) => setBaseClass(payload),
  setSkillName: (payload: SkillPayload<string>) => setSkillName(payload),
  setIsChildSkill: (payload: SkillPayload<boolean>) => setIsChildSkill(payload),
  setWeaponType: (payload: SkillPayload<WeaponType>) => setWeaponType(payload),
  setWeaponPosition: (payload: SkillPayload<WeaponPosition>) =>
    setWeaponPosition(payload),
  setDamageCoefficient: (payload: SkillPayload<string>) =>
    setDamageCoefficient(payload),
  setCastDuration: (payload: SkillPayload<string>) => setCastDuration(payload),
  setCastDurationQuickness: (payload: SkillPayload<string>) =>
    setCastDurationQuickness(payload),
  setCooldown: (payload: SkillPayload<string>) => setCooldown(payload),
  setCooldownAlacrity: (payload: SkillPayload<string>) =>
    setCooldownAlacrity(payload),
  addStrikeOnTick: (payload: number) => addStrikeOnTick(payload),
  removeStrikeOnTick: (payload: number) => removeStrikeOnTick(payload),
  setStrikeOnTick: (payload: [idx: number, value: string, strikeIdx: number]) =>
    setStrikeOnTick(payload),
  setStrikeOnTickQuickness: (
    payload: [idx: number, value: string, strikeIdx: number]
  ) => setStrikeOnTickQuickness(payload),
  addPulseOnTick: (payload: number) => addPulseOnTick(payload),
  removePulseOnTick: (payload: number) => removePulseOnTick(payload),
  setPulseOnTick: (payload: [idx: number, value: string, pulseIdx: number]) =>
    setPulseOnTick(payload),
  setPulseOnTickQuickness: (
    payload: [idx: number, value: string, pulseIdx: number]
  ) => setPulseOnTickQuickness(payload),
  addChildSkillKey: (payload: number) => addChildSkillKey(payload),
  removeChildSkillKey: (payload: number) => removeChildSkillKey(payload),
  setChildBaseClass: (
    payload: [idx: number, value: BaseClass, childIdx: number]
  ) => setChildBaseClass(payload),
  setChildSkillName: (
    payload: [idx: number, value: string, childIdx: number]
  ) => setChildSkillName(payload),
  addTag: (payload: number) => addTag(payload),
  removeTag: (payload: number) => removeTag(payload),
  setTag: (payload: [idx: number, value: SkillTag, tagIdx: number]) =>
    setTag(payload),
  setAttributeModifier: (payload: {
    idx: number;
    value: string;
    field: string;
  }) => setAttributeModifier(payload),
  setDamageModifier: (payload: { idx: number; value: string; field: string }) =>
    setDamageModifier(payload),
  setEquipBundleName: (payload: SkillPayload<string>) =>
    setEquipBundleName(payload),
  setAmmo: (payload: SkillPayload<string>) => setAmmo(payload),
  setRechargeDuration: (payload: SkillPayload<string>) =>
    setRechargeDuration(payload),
  setNumTargets: (payload: SkillPayload<string>) => setNumTargets(payload),
};

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
    skill: { strikeOnTickList, pulseOnTickList, childSkillKeys, tags },
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
  };

  return <Skill {...containerFunctions} {...containerProps} />;
};

export default connector(SkillContainer);
