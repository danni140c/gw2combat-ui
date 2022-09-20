import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import Skill from './Skill.component';
import { initialSkillState, skillReducer, SkillType } from './Skill.config';
import { updateBaseClass, updateSkillKeyName } from './Skill.config';
import { throttle, debounce } from 'lodash';

type Props = {
  onUpdate?: (...args: any) => any;
};

const updateSkill =
  (updater: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updater(e.currentTarget.value);
  };

const SkillContainer = (props: Props) => {
  const [skill, skillDispatch] = useReducer(skillReducer, initialSkillState);

  const containerFunctions = {
    updateBaseClass: updateSkill((value: any) =>
      skillDispatch(updateBaseClass(value))
    ),
    updateSkillKeyName: updateSkill((value: any) =>
      skillDispatch(updateSkillKeyName(value))
    ),
  };

  const { onUpdate = () => {} } = props;
  const debouncedThrottledUpdate = useMemo(
    () =>
      debounce(
        throttle((skill) => onUpdate(skill), 1000),
        1000
      ),
    [onUpdate]
  );
  const handleUpdate = useCallback(
    (skill: SkillType) => debouncedThrottledUpdate(skill),
    [debouncedThrottledUpdate]
  );

  useEffect(() => {
    handleUpdate(skill);
  });

  return <Skill {...containerFunctions} skill={skill} />;
};

export default SkillContainer;
