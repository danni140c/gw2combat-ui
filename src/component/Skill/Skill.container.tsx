import React, { useReducer, useEffect } from 'react';
import { Class, WeaponType, WeaponPosition } from '../../util/types';
import Skill from './Skill.component';
import { SkillType, initialSkillState, skillReducer } from './Skill.config';

type Props = {
  onUpdate?: Function;
};

const updateSkill =
  (updater: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updater(e.currentTarget.value);
  };

const SkillContainer = (props: Props) => {
  const [skill, skillDispatch] = useReducer(skillReducer, initialSkillState);

  const containerFunctions = {};

  const containerProps = {};

  useEffect(() => {
    const { onUpdate = () => {} } = props;
    onUpdate(skill);
  });

  return <Skill {...containerFunctions} {...containerProps} />;
};

export default SkillContainer;
