import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../util/test';
import Skill from '../component/Skill';
import { AppStore, setupStore } from '../store';
import { initialSkillState } from '../store/Skills';

export const skillUpdates =
  describe('Skill state updates from skill component', () => {
    let store: AppStore;
    beforeEach(() => {
      store = setupStore({ skills: [initialSkillState, initialSkillState] });
    });

    it('Updates skill name', async () => {
      renderWithProviders(<Skill idx={1} />, { store });
      const skillNameInput = screen.getByRole('textbox', {
        name: 'Skill name',
      });
      const inputValue = 'My New Skill';
      expect(skillNameInput).toBeInTheDocument();
      fireEvent.click(skillNameInput);
      fireEvent.change(skillNameInput, { target: { value: inputValue } });
      expect(skillNameInput).toHaveValue(inputValue);
      expect(store.getState().skills[1].skillKey.name).toEqual(inputValue);
    });
  });
