import { Class, WeaponType, WeaponPosition } from '../../util/types';

/* skill_key */
export type SkillKeyStateType = {
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
  state: SkillKeyStateType = initialSkillKey,
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

export const skillKeyUpdateName = (value: string): SkillKeyActionType => ({
  type: SkillKeyAction.UpdateName,
  name: value,
});

/* weapon_type */
export type WeaponTypeStateType = WeaponType;

export const initialWeaponType = WeaponType.Invalid;

type WeaponTypeActionType = {
  weaponType: WeaponType;
};

export const weaponTypeReducer = (
  state: WeaponTypeStateType = initialWeaponType,
  action: WeaponTypeActionType
): WeaponTypeStateType => {
  const { weaponType } = action;
  return weaponType;
};

export const weaponTypeUpdate = (value: WeaponType): WeaponTypeActionType => ({
  weaponType: value,
});

/* weapon_position */
export type WeaponPositionStateType = WeaponPosition;

export const initialWeaponPosition = WeaponPosition.Invalid;

type WeaponPositionActionType = {
  weaponPosition: WeaponPosition;
};

export const weaponPositionReducer = (
  state: WeaponPositionStateType = initialWeaponPosition,
  action: WeaponPositionActionType
) => {
  const { weaponPosition } = action;
  return weaponPosition;
};

export const weaponPositionUpdate = (
  value: WeaponPosition
): WeaponPositionActionType => ({
  weaponPosition: value,
});

/* damage_coefficient */
export type DamageCoefficientStateType = Number;

export const initialDamageCoefficient = 0.0;

type DamageCoefficientActionType = {
  damageCoefficient: Number;
};

export const damageCoefficientReducer = (
  state: DamageCoefficientStateType = initialDamageCoefficient,
  action: DamageCoefficientActionType
) => {
  const { damageCoefficient } = action;
  return damageCoefficient;
};

export const damageCoefficientUpdate = (value: Number) => ({
  damageCoefficient: value,
});

/* cast_duration */
export type CastDurationStateType = Number[];

export const initialCastDuration = [0, 0];

type CastDurationActionType = {
  castDuration: Number[];
};

export const castDurationReducer = (
  state: CastDurationStateType = initialCastDuration,
  action: CastDurationActionType
) => {
  const { castDuration } = action;
  return castDuration;
};

export const castDurationUpdate = (value: Number[]) => ({
  castDuration: value,
});
