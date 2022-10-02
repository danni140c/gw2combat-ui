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
  setAttributeModifier,
  setDamageModifier,
  SkillType,
  SkillPayload,
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
  setAttributeModifier: (payload: {
    idx: number;
    value: string;
    field: string;
  }) => setAttributeModifier(payload),
  setDamageModifier: (payload: { idx: number; value: string; field: string }) =>
    setDamageModifier(payload),
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

const updateToggleGenerator =
  (idx: number) =>
  (dispatcher: Dispatch<SkillPayload<boolean>>) =>
  (_: React.SyntheticEvent<Element, Event>, value: boolean) =>
    dispatcher({ idx, value });

export const SkillContainer: React.FC<Props> = (props: Props) => {
  const {
    idx,
    skill,
    skill: { strikeOnTickList },
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
    setAttributeModifier,
    setDamageModifier,
  } = props;

  const updateText = updateTextGenerator(idx);
  const updateSelect = updateSelectGenerator(idx);
  const updateToggle = updateToggleGenerator(idx);
  const updateTextIndex = updateTextIndexGenerator(idx);

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
  };

  const containerProps = {
    skill,
  };

  return <Skill {...containerFunctions} {...containerProps} />;
};

export default connector(SkillContainer);
