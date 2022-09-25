import { Class, WeaponType, WeaponPosition, Effect } from '../../util/types';
import {
  ensureInt,
  ensureFloat,
  ensureUnsignedInt,
} from '../../util/validation';
import { merge } from 'lodash';

export type SkillType = {
  skillKey: SkillKey;
  isChildSkill: boolean;

  weaponType: WeaponType;
  weaponPosition: WeaponPosition;
  damageCoefficient: number;

  castDuration: [number, number];
  cooldown: [number, number];

  strikeOnTickList: [number[], number[]];
  pulseOnTickList: [number[], number[]];

  onStrikeEffectApplication: EffectApplication[];
  onPulseEffectApplication: EffectApplication[];

  childSkillKeys: SkillKey[];
  tags: SkillTag[];

  attributeModifiers: AttributeModifier;
  damageModifiers: DamageModifier;

  equipBundle: {
    name: string;
  };

  ammo: number;
  rechargeDuration: number;
  numTargets: number;
};

type SkillKey = {
  baseClass: Class;
  name: string;
};

type EffectApplication = {
  uniqueEffectType: {
    name: string;
  };
  effectType: Effect;
  direction: Direction;
  baseDuration: number;
  numStacks: number;
  numTargets: number;
};

enum Direction {
  INVALID = 'Invalid',

  OUTGOING = 'OUTGOING',
  SELF = 'SELF',
  TEAM = 'TEAM',
}

enum SkillTag {
  INVALID = 'Invalid',

  CANNOT_CRITICAL_STRIKE = 'CANNOT_CRITICAL_STRIKE',
  CONSECRATION_ATTACK = 'CONSECRATION_ATTACK',
  CONSECRATION_CAST = 'CONSECRATION_CAST',
  TRAP = 'TRAP',
  MANTRA = 'MANTRA',
  SYMBOL = 'SYMBOL',
  SPIRIT_WEAPON = 'SPIRIT_WEAPON',
  GUARDIAN_VIRTUE = 'GUARDIAN_VIRTUE',
  TOME = 'TOME',
}

export type AttributeModifier = {
  powerAddend: number;
  precisionAddend: number;
  toughnessAddend: number;
  vitalityAddend: number;
  concentrationAddend: number;
  conditionDamageAddend: number;
  expertiseAddend: number;
  ferocityAddend: number;
  healingPowerAddend: number;
  armorAddend: number;
  maxHealthAddend: number;

  boonDurationPctAddend: number;
  criticalChancePctAddend: number;
  criticalDamagePctAddend: number;
  conditionDurationPctAddend: number;
  burningDurationPctAddend: number;
  bleedingDurationPctAddend: number;
  confusionDurationPctAddend: number;
  poisonDurationPctAddend: number;
  tormentDurationPctAddend: number;
};

export type DamageModifier = {
  strikeDamageMultiplier: number;
  strikeDamageMultiplierAddGroupAddend: number;
  conditionDamageMultiplier: number;
  conditionDamageMultiplierAddGroupAddend: number;
  burningDamageMultiplier: number;
  bleedingDamageMultiplier: number;
  confusionDamageMultiplier: number;
  poisonDamageMultiplier: number;
  tormentDamageMultiplier: number;

  conditionDurationPctAddend: number;
  burningDurationPctAddend: number;
  bleedingDurationPctAddend: number;
  confusionDurationPctAddend: number;
  poisonDurationPctAddend: number;
  tormentDurationPctAddend: number;
};

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export const initialSkillState: SkillType = {
  skillKey: {
    baseClass: Class.INVALID,
    name: '',
  },
  isChildSkill: false,
  weaponType: WeaponType.INVALID,
  weaponPosition: WeaponPosition.UNIVERSAL,
  damageCoefficient: 0.0,
  castDuration: [0, 0],
  cooldown: [0, 0],
  strikeOnTickList: [[], []],
  pulseOnTickList: [[], []],
  onStrikeEffectApplication: [],
  onPulseEffectApplication: [],
  childSkillKeys: [],
  tags: [],
  attributeModifiers: {
    powerAddend: 0.0,
    precisionAddend: 0.0,
    toughnessAddend: 0.0,
    vitalityAddend: 0.0,
    concentrationAddend: 0.0,
    conditionDamageAddend: 0.0,
    expertiseAddend: 0.0,
    ferocityAddend: 0.0,
    healingPowerAddend: 0.0,
    armorAddend: 0.0,
    maxHealthAddend: 0.0,
    boonDurationPctAddend: 0.0,
    criticalChancePctAddend: 0.0,
    criticalDamagePctAddend: 0.0,
    conditionDurationPctAddend: 0.0,
    burningDurationPctAddend: 0.0,
    bleedingDurationPctAddend: 0.0,
    confusionDurationPctAddend: 0.0,
    poisonDurationPctAddend: 0.0,
    tormentDurationPctAddend: 0.0,
  },
  damageModifiers: {
    strikeDamageMultiplier: 1,
    strikeDamageMultiplierAddGroupAddend: 0.0,
    conditionDamageMultiplier: 1,
    conditionDamageMultiplierAddGroupAddend: 0.0,
    burningDamageMultiplier: 1,
    bleedingDamageMultiplier: 1,
    confusionDamageMultiplier: 1,
    poisonDamageMultiplier: 1,
    tormentDamageMultiplier: 1,
    conditionDurationPctAddend: 0.0,
    burningDurationPctAddend: 0.0,
    bleedingDurationPctAddend: 0.0,
    confusionDurationPctAddend: 0.0,
    poisonDurationPctAddend: 0.0,
    tormentDurationPctAddend: 0.0,
  },
  equipBundle: {
    name: '',
  },
  ammo: 1,
  rechargeDuration: 0,
  numTargets: 1,
};

export type SkillAction = RecursivePartial<SkillType> & {
  type?: SkillReducerType;
};

enum SkillReducerType {
  UPDATE_CAST_DURATION_NO_QUICKNESS = 'UPDATE_CAST_DURATION_NO_QUICKNESS',
  UPDATE_CAST_DURATION_QUICKNESS = 'UPDATE_CAST_DURATION_QUICKNESS',
}

export const skillReducer = (
  state: SkillType,
  action: SkillAction
): SkillType => {
  switch (action.type) {
    /* case SkillReducerType.UPDATE_CAST_DURATION_NO_ALAC: */
    /*   const { castDuration = [] } = action; */
    /*   return { */
    /*     ...state, */
    /*     castDuration: [castDuration[0], state.castDuration[1]], */
    /*   }; */
    default:
      return merge({}, state, action);
  }
};

export const updateBaseClass = (value: Class): SkillAction => ({
  skillKey: {
    baseClass: value,
  },
});

export const updateSkillKeyName = (value: string): SkillAction => ({
  skillKey: {
    name: value,
  },
});

export const updateIsChildSkill = (value: boolean): SkillAction => ({
  isChildSkill: value,
});

export const updateWeaponType = (value: WeaponType): SkillAction => ({
  weaponType: value,
});

export const updateWeaponPosition = (value: WeaponPosition): SkillAction => ({
  weaponPosition: value,
});

export const updateDamageCoefficient = (value: string): SkillAction => ({
  damageCoefficient: ensureFloat(value, initialSkillState.damageCoefficient),
});

export const updateCastDurationNoQuick = (value: string): SkillAction => ({
  castDuration: [
    ensureUnsignedInt(value, initialSkillState.castDuration[0]),
    0,
  ],
});

export const updateCastDurationQuick = (value: string): SkillAction => ({
  castDuration: [
    0,
    ensureUnsignedInt(value, initialSkillState.castDuration[1]),
  ],
});

export const updateAttributeModifier = (
  value: string,
  name: string
): SkillAction => ({
  attributeModifiers: {
    [name]: ensureFloat(value, 0.0),
  },
});

export const updateDamageModifier = (
  value: string,
  name: string
): SkillAction => ({
  damageModifiers: {
    [name]: ensureFloat(value, 0.0),
  },
});
