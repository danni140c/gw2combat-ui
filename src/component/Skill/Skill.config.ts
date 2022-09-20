import { Class, WeaponType, WeaponPosition, Effect } from '../../util/types';
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

  attributeModifiers: AttributeModifiers;
  damageModifiers: DamageModifiers;

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

type AttributeModifiers = {
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

type DamageModifiers = {
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

export type SkillAction = RecursivePartial<SkillType>;

export const skillReducer = (
  state: SkillType,
  action: SkillAction
): SkillType => {
  return merge({}, state, action);
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

/* const skillAttributeModifiersReducer = ( */
/*   state: SkillType, */
/*   action: SkillAction */
/* ) => { */
/*   const { type } = action; */
/*   switch (type) { */
/*     case SkillActionType.UPDATE_ATTRIBUTE_MODIFIERS_POWER_ADDEND: */
/*       const { */
/*         attributeModifiers: { */
/*           powerAddend = initialSkillState.attributeModifiers.powerAddend, */
/*         } = {}, */
/*       } = action; */
/*       return { */
/*         ...state, */
/*         attributeModifiers: { ...state.attributeModifiers, powerAddend }, */
/*       }; */
/*     case SkillActionType.UPDATE_ATTRIBUTE_MODIFIERS_PRECISION_ADDEND: */
/*       const { */
/*         attributeModifiers: { */
/*           precisionAddend = initialSkillState.attributeModifiers */
/*             .precisionAddend, */
/*         } = {}, */
/*       } = action; */
/*       return { */
/*         ...state, */
/*         attributeModifiers: { ...state.attributeModifiers, precisionAddend }, */
/*       }; */
/*     default: */
/*       return state; */
/*   } */
/* }; */
/**/
/* const skillDamageModifiersReducer = (state: SkillType, action: SkillAction) => { */
/*   const { type } = action; */
/*   switch (type) { */
/*     case SkillActionType.UPDATE_DAMAGE_MODIFIERS_STRIKE_DAMAGE_MULTIPLIER: */
/*       const { */
/*         damageModifiers: { */
/*           strikeDamageMultiplier = initialSkillState.damageModifiers */
/*             .strikeDamageMultiplier, */
/*         } = {}, */
/*       } = action; */
/*       return { */
/*         ...state, */
/*         damageModifiers: { ...state.damageModifiers, strikeDamageMultiplier }, */
/*       }; */
/*     case SkillActionType.UPDATE_DAMAGE_MODIFIERS_STRIKE_DAMAGE_MULTIPLIER_ADD_GROUP_ADDEND: */
/*       const { */
/*         damageModifiers: { */
/*           strikeDamageMultiplierAddGroupAddend = initialSkillState */
/*             .damageModifiers.strikeDamageMultiplierAddGroupAddend, */
/*         } = {}, */
/*       } = action; */
/*       return { */
/*         ...state, */
/*         damageModifiers: { */
/*           ...state.damageModifiers, */
/*           strikeDamageMultiplierAddGroupAddend, */
/*         }, */
/*       }; */
/*     default: */
/*       return state; */
/*   } */
/* }; */
/**/
/* export const skillRootReducer = reduceReducers( */
/*   skillBaseReducer, */
/*   skillAttributeModifiersReducer, */
/*   skillDamageModifiersReducer */
/* ); */
