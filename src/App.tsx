import React from 'react';
import { stringify } from './util/json';
import Skill from './component/Skill';

const App = () => {
  const onUpdate = (skill: any) => {
    console.log(skill);
    console.log(stringify(skill));
  };
  return (
    <div className='App'>
      <Skill onUpdate={onUpdate} />
    </div>
  );
};

export default App;
