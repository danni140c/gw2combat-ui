import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import Skill from './Skill.component';
import { initialSkillState, skillReducer, SkillType } from './Skill.config';
import {
  updateBaseClass,
  updateSkillKeyName,
  updateIsChildSkill,
  updateWeaponType,
  updateWeaponPosition,
  updateDamageCoefficient,
  updateCastDurationNoQuick,
  updateAttributeModifier,
  updateDamageModifier,
} from './Skill.config';
import { throttle, debounce } from 'lodash';
import { SelectChangeEvent } from '@mui/material';

type Props = {
  onUpdate?: (...args: any) => any;
};

const updateGenerator =
  (dispatch: Function) =>
  (action: Function) =>
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | SelectChangeEvent<string>
  ) =>
    dispatch(action(e.target.value, e.target.name));

const selectUpdateGenerator =
  (dispatch: Function) =>
  (action: Function) =>
  (_: React.SyntheticEvent<Element, Event>, value: any) =>
    dispatch(action(value));

export const SkillContainer: React.FC<Props> = (props: Props) => {
  const [skill, skillDispatch] = useReducer(skillReducer, initialSkillState);

  const updater = updateGenerator(skillDispatch);
  const selectUpdater = selectUpdateGenerator(skillDispatch);

  const containerFunctions = {
    updateBaseClass: selectUpdater(updateBaseClass),
    updateSkillKeyName: updater(updateSkillKeyName),
    updateIsChildSkill: updater(updateIsChildSkill),
    updateWeaponType: selectUpdater(updateWeaponType),
    updateWeaponPosition: selectUpdater(updateWeaponPosition),
    updateDamageCoefficient: updater(updateDamageCoefficient),
    updateCastDurationNoQuick: updater(updateCastDurationNoQuick),
    updateAttributeModifier: updater(updateAttributeModifier),
    updateDamageModifier: updater(updateDamageModifier),
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

export default React.memo(SkillContainer);
