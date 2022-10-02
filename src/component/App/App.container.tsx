import React, { useCallback, useState } from 'react';
import { stringify } from '../../util/json';
import { Fzf } from 'fzf';
/* import { initialSkillState, SkillType } from '../Skill/Skill.config'; */
import App from './App.component';
import { ColorModeContext } from '../Theme/Theme.container';
import { useTheme } from '@mui/material';
import { addSkill, removeSkill, SkillType } from '../../store/Skills';
/* import { useAppDispatch } from '../../store'; */
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
  /* const [skills, setSkills] = useState([{ idx: 0, skill: initialSkillState }]); */
  const [skillSearch, setSkillSearch] = useState('');
  const { toggleColorMode } = React.useContext(ColorModeContext);

  const { palette: { mode = 'light' } = {} } = useTheme();

  /* const addSkill = () => */
  /*   setSkills((prevSkills) => [ */
  /*     ...prevSkills, */
  /*     { idx: prevSkills.length, skill: initialSkillState }, */
  /*   ]); */
  /**/
  /* const removeSkill = () => */
  /*   setSkills((prevSkills) => [...prevSkills.slice(0, prevSkills.length - 1)]); */

  const { skills, addSkill, removeSkill } = props;

  /* const onUpdate = useCallback((skill: SkillType) => { */
  /*   console.log(skill); */
  /*   console.log(stringify(skill)); */
  /* }, []); */

  /* const onSkillUpdate = useCallback((skill: SkillType, idx: number) => { */
  /*   console.log(skill); */
  /*   console.log(idx); */
  /*   setSkills((prevSkills) => [ */
  /*     ...prevSkills.slice(0, idx), */
  /*     { idx, skill }, */
  /*     ...prevSkills.slice(idx + 1), */
  /*   ]); */
  /* }, []); */

  const updateTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSkillSearch(e.currentTarget.value);

  /* const fzf = new Fzf(skills, { */
  /*   selector: ({ skill }) => */
  /*     `${skill.skillKey.name} ${skill.skillKey.baseClass} ${skill.weaponType} ${skill.weaponPosition}`, */
  /* }); */

  /* const skillSearchMatches = fzf */
  /*   .find(skillSearch) */
  /*   .map((match) => match.item.idx); */

  /* const json = JSON.stringify( */
  /*   { skillConfigurations: skills.map(({ skill }) => skill) }, */
  /*   null, */
  /*   2 */
  /* ); */

  const containerFunctions = {
    updateTab,
    toggleColorMode,
    mode,
    addSkill,
    removeSkill,
    /* onSkillUpdate, */
    updateSearch,
  };

  const containerProps = {
    skills,
    tab,
    jsonInput: skills,
    /* skillSearchMatches, */
  };

  return <App {...containerFunctions} {...containerProps} />;
};

export default connector(AppContainer);
