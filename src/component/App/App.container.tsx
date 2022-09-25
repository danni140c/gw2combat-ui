import React, { useCallback, useState } from 'react';
import { stringify } from '../../util/json';
import { SkillType } from '../Skill/Skill.config';
import App from './App.component';
import { ColorModeContext } from '../Theme/Theme.container';
import { useTheme } from '@mui/material';

type Props = {};

export const AppContainer: React.FC<Props> = (props: Props) => {
  const [tab, setTab] = useState(0);
  const [json, setJson] = useState('');
  const { toggleColorMode } = React.useContext(ColorModeContext);

  const { palette: { mode = 'light' } = {} } = useTheme();

  const onUpdate = useCallback((skill: SkillType) => {
    console.log(skill);
    console.log(stringify(skill));
    setJson(JSON.stringify(skill, null, 2));
  }, []);

  const updateTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const containerFunctions = {
    updateTab,
    onUpdate,
    toggleColorMode,
    mode,
  };

  const containerProps = {
    tab,
    json,
  };

  return <App {...containerFunctions} {...containerProps} />;
};

export default AppContainer;
