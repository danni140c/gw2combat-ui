import { Class, WeaponType } from '../../util/types';

type SkillKeyStateType = {
  baseClass: Class;
  name: string;
};

export const initialSkillKey = {
  baseClass: Class.Invalid,
  name: '',
};

type SkillKeyActionType = {
  baseClass?: Class;
  name?: string;
  type: SkillKeyAction;
};

enum SkillKeyAction {
  UpdateBaseClass = 'UPDATE_BASE_CLASS',
  UpdateName = 'UPDATE_NAME',
}

export const skillKeyReducer = (
  state: SkillKeyStateType,
  action: SkillKeyActionType
): SkillKeyStateType => {
  switch (action.type) {
    case SkillKeyAction.UpdateBaseClass:
      const { baseClass = Class.Invalid } = action;
      return { ...state, baseClass };
    case SkillKeyAction.UpdateName:
      const { name = '' } = action;
      return { ...state, name };
    default:
      return state;
  }
};

export const skillKeyUpdateBaseClass = (value: Class): SkillKeyActionType => ({
  type: SkillKeyAction.UpdateBaseClass,
  baseClass: value,
});

type WeaponTypeStateType = Number;

export const initialWeaponType = WeaponType.Invalid;

type WeaponTypeActionType = {
  weaponType: WeaponType;
};

export const weaponTypeReducer = (
  state: WeaponTypeStateType,
  action: WeaponTypeActionType
): WeaponTypeStateType => {
  const { weaponType } = action;
  return weaponType;
};

export const weaponTypeUpdate = (value: WeaponType): WeaponTypeActionType => ({
  weaponType: value,
});
