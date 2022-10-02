import React, { useState } from 'react';
import { Fzf } from 'fzf';
import App from './App.component';
import { ColorModeContext } from '../Theme/Theme.container';
import { useTheme } from '@mui/material';
import { addSkill, removeSkill } from '../../store/Skills';
import { RootState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';

type Props = PropsFromRedux & {};

const mapStateToProps = (state: RootState) => ({
  skills: state.skills,
});

const mapDispatchToProps = {
  addSkill: () => addSkill(),
  removeSkill: () => removeSkill(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const AppContainer: React.FC<Props> = (props: Props) => {
  const [tab, setTab] = useState(0);
  const [skillSearch, setSkillSearch] = useState('');
  const { toggleColorMode } = React.useContext(ColorModeContext);

  const { palette: { mode = 'light' } = {} } = useTheme();

  const { skills, addSkill, removeSkill } = props;

  const updateTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSkillSearch(e.currentTarget.value);

  const indexedSkills = skills.map((skill, idx) => ({ ...skill, idx }));

  const fzf = new Fzf(indexedSkills, {
    selector: (skill) =>
      `${skill.skillKey.name} ${skill.skillKey.baseClass} ${skill.weaponType} ${skill.weaponPosition}`,
  });

  const skillSearchMatches = fzf
    .find(skillSearch)
    .map((match) => match.item.idx);

  const containerFunctions = {
    updateTab,
    toggleColorMode,
    mode,
    addSkill,
    removeSkill,
    updateSearch,
  };

  const containerProps = {
    skills,
    tab,
    jsonInput: skills,
    skillSearchMatches,
  };

  return <App {...containerFunctions} {...containerProps} />;
};

export default connector(AppContainer);
