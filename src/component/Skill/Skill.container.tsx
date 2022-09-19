import { useReducer, useEffect, useState } from 'react';
import { Class, WeaponType, WeaponPosition } from '../../util/types';
import Skill from './Skill.component';
import {
  initialSkillKey,
  skillKeyReducer,
  skillKeyUpdateBaseClass,
  skillKeyUpdateName,
} from './Skill.config';

type Props = {
  onUpdate?: Function;
};

const SkillContainer = (props: Props) => {
  const [skillKey, dispatchSkillKey] = useReducer(
    skillKeyReducer,
    initialSkillKey
  );
  const [weaponType, setWeaponType] = useState<WeaponType>(WeaponType.Invalid);
  const [weaponPosition, setWeaponPosition] = useState<WeaponPosition>(
    WeaponPosition.Invalid
  );
  const skill = {
    skillKey,
    weaponType,
    weaponPosition,
  };

  const setSkillKeyBaseClass = (value: Class) =>
    dispatchSkillKey(skillKeyUpdateBaseClass(value));
  const setSkillKeyName = (value: string) =>
    dispatchSkillKey(skillKeyUpdateName(value));

  const updateSkill = (updater: Function) => (e: any) => {
    e.preventDefault();
    if (e?.target?.value) {
      updater(e.target.value);
    }
  };

  const containerFunctions = {
    setSkillKeyBaseClass,
    setSkillKeyName,
    setWeaponType,
    setWeaponPosition,
    updateSkill,
  };

  const containerProps = {
    skillKey,
    weaponType,
    weaponPosition,
  };

  useEffect(() => {
    const { onUpdate = () => {} } = props;
    onUpdate(skill);
  });
  return <Skill {...containerFunctions} {...containerProps} />;
};

export default SkillContainer;
