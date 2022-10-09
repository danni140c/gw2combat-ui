import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../util/test';
import Skill from '../component/Skill';
import { AppStore, setupStore } from '../store';
import { initialSkillState } from '../store/Skills';

export const skillUpdates =
  describe('Skill state updates from Skill component', () => {
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
      fireEvent.change(skillNameInput, { target: { value: inputValue } });
      expect(skillNameInput).toHaveValue(inputValue);
      expect(store.getState().skills[1].skillKey.name).toEqual(inputValue);
    });

    it('Updates skill damage coefficient', async () => {
      renderWithProviders(<Skill idx={1} />, { store });
      const skillNameInput = screen.getByRole('textbox', {
        name: 'Damage coefficient',
      });
      const inputValue = '5';
      const inputValueInvalid = 'abc';
      expect(skillNameInput).toBeInTheDocument();
      fireEvent.change(skillNameInput, { target: { value: inputValue } });
      expect(skillNameInput).toHaveValue(inputValue);
      expect(store.getState().skills[1].damageCoefficient).toEqual(
        parseFloat(inputValue)
      );

      fireEvent.change(skillNameInput, {
        target: { value: inputValueInvalid },
      });
      expect(skillNameInput).toHaveValue(inputValueInvalid);
      expect(store.getState().skills[1].damageCoefficient).toEqual(
        initialSkillState.damageCoefficient
      );
    });
  });
