import React from 'react';
import Skill from '../Skill';
import JsonOutput from '../JsonOutput';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { SkillType } from '../../store/Skills/Skills';

type Props = {
  tab: number;
  updateTab: any;
  onUpdate?: (skill: SkillType) => void;
  toggleColorMode: () => void;
  jsonInput: any;
  mode: 'dark' | 'light';
  skills: SkillType[];
  addSkill: () => void;
  removeSkill: () => void;
  onSkillUpdate?: (skill: SkillType, idx: number) => void;
  updateSearch?: any;
  skillSearchMatches?: number[];
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index}>
      <Box sx={{ paddingTop: 3 }}>{children}</Box>
    </div>
  );
};

const App: React.FC<Props> = (props: Props) => {
  const {
    tab,
    updateTab,
    toggleColorMode,
    jsonInput,
    mode,
    skills,
    addSkill,
    removeSkill,
    updateSearch,
    skillSearchMatches,
  } = props;

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
        elevation={3}
      >
        <Tabs value={tab} onChange={updateTab} centered>
          <Tab label='Skills' />
          <Tab label='Effects' />
          <Tab label='Output' />
        </Tabs>
        <IconButton
          sx={{ position: 'fixed', top: 4, right: 4 }}
          onClick={toggleColorMode}
          color='inherit'
          aria-label='toggle theme'
        >
          {renderBrightnessIcon(mode)}
        </IconButton>
      </Paper>
      {/* <Container sx={{ marginTop: '48px' }} maxWidth='xl'> */}
      {/* </Container> */}
      <Container sx={{ marginTop: '48px' }} maxWidth='xl'>
        <TabPanel value={tab} index={0}>
          <Box
            sx={{
              paddingTop: 3,
              paddingBottom: 5,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={'Seach'}
                  helperText={'Filter skills'}
                  onChange={updateSearch}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>{renderSkills(skills, skillSearchMatches)}</Box>
          <div onClick={addSkill}>Add</div>
          <div onClick={removeSkill}>Remove</div>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Effects
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <JsonOutput jsonInput={jsonInput} />
        </TabPanel>
      </Container>
    </Box>
  );
};

const renderSkills = (
  skills: SkillType[],
  skillSearchMatches: number[] | undefined
) => {
  return skills.map((skill, i: number) => (
    <Box
      key={i}
      sx={{
        display:
          skillSearchMatches && skillSearchMatches.includes(i)
            ? 'inherit'
            : 'none',
      }}
    >
      <Skill skill={skill} idx={i} />
    </Box>
  ));
};

const renderBrightnessIcon = (mode: 'light' | 'dark') => {
  if (mode === 'light') {
    return <Brightness4Icon />;
  } else {
    return <Brightness7Icon />;
  }
};

export default App;
