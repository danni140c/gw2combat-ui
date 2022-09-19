import { useReducer, useEffect } from 'react';
import Skill from './Skill.component';
import {
  initialSkillKey,
  skillKeyReducer,
  initialWeaponType,
  weaponTypeReducer,
} from './Skill.config';

type Props = {
  onUpdate?: Function;
};

const SkillContainer = (props: Props) => {
  const [skillKey, dispatchSkillKey] = useReducer(
    skillKeyReducer,
    initialSkillKey
  );
  const [weaponType, dispatchWeaponType] = useReducer(
    weaponTypeReducer,
    initialWeaponType
  );
  const skill = {
    skillKey,
    weaponType,
  };

  useEffect(() => {
    const { onUpdate = () => {} } = props;
    onUpdate(skill);
  });
  return <Skill />;
};

export default SkillContainer;
