import React from 'react';
import Skill from '../Skill';
import JsonOutput from '../JsonOutput';
import { Box, Container, IconButton, Paper, Tab, Tabs } from '@mui/material';
import { SkillType } from '../Skill/Skill.config';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type Props = {
  tab: number;
  updateTab: any;
  onUpdate: (skill: SkillType) => void;
  toggleColorMode: () => void;
  json: string;
  mode: 'dark' | 'light';
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
  const { tab, updateTab, onUpdate, toggleColorMode, json, mode } = props;

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
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
      <Container sx={{ marginTop: '48px' }} maxWidth='xl'>
        <TabPanel value={tab} index={0}>
          <Skill onUpdate={onUpdate} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <JsonOutput json={json} />
        </TabPanel>
      </Container>
    </Box>
  );
};

const renderBrightnessIcon = (mode: 'light' | 'dark') => {
  if (mode === 'light') {
    return <Brightness4Icon />;
  } else {
    return <Brightness7Icon />;
  }
};

export default App;
