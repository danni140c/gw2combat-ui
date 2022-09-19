import React from 'react';
import {
  SkillKeyStateType,
  WeaponTypeStateType,
  WeaponPositionStateType,
} from './Skill.config';

type Props = {
  skillKey: SkillKeyStateType;
  weaponType: WeaponTypeStateType;
  weaponPosition: WeaponPositionStateType;

  setSkillKeyBaseClass: Function;
  setSkillKeyName: Function;
  setWeaponType: Function;
  setWeaponPosition: Function;

  updateSkill: Function;
};

export const Skill = (props: Props) => {
  const {
    skillKey: { baseClass, name },
    weaponType,
    weaponPosition,
    setSkillKeyBaseClass,
    setSkillKeyName,
    setWeaponType,
    setWeaponPosition,
    updateSkill,
  } = props;
  return (
    <div>
      {baseClass}
      <input value={baseClass} onChange={updateSkill(setSkillKeyBaseClass)} />
      <br />
      {name}
      <input value={name} onChange={updateSkill(setSkillKeyName)} />
      <br />
      {weaponType}
      <input value={weaponType} onChange={updateSkill(setWeaponType)} />
      <br />
      {weaponPosition}
      <input value={weaponPosition} onChange={updateSkill(setWeaponPosition)} />
    </div>
  );
};

export default Skill;
