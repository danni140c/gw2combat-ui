import React from 'react';

import { SkillType } from './Skill.config';

type Props = {
  skill: SkillType;
  updateBaseClass: React.ChangeEventHandler<HTMLInputElement>;
  updateSkillKeyName: React.ChangeEventHandler<HTMLInputElement>;
};

export const Skill = (props: Props) => {
  const {
    skill: {
      skillKey: { baseClass, name },
    },
    updateBaseClass,
    updateSkillKeyName,
  } = props;

  return (
    <div>
      Test
      <input value={baseClass} onChange={updateBaseClass} />
      <br />
      Test
      <input value={name} onChange={updateSkillKeyName} />
    </div>
  );
};

export default Skill;
