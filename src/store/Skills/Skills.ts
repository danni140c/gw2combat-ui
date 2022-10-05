import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BaseClass,
  WeaponType,
  WeaponPosition,
  Effect,
} from '../../util/types';
import { ensureFloat, ensureUnsignedInt } from '../../util/validation';

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
  baseClass: BaseClass;
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

export enum Direction {
  INVALID = 'Invalid',

  OUTGOING = 'OUTGOING',
  SELF = 'SELF',
  TEAM = 'TEAM',
}

export enum SkillTag {
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
  [key: string]: number | undefined;
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
  [key: string]: number | undefined;
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

export type SkillsStateType = SkillType[];

export const initialSkillState: SkillType = {
  skillKey: {
    baseClass: BaseClass.INVALID,
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

export const initialEffectApplicationState: EffectApplication = {
  uniqueEffectType: {
    name: '',
  },
  effectType: Effect.FURY,
  direction: Direction.SELF,
  baseDuration: 0,
  numStacks: 0,
  numTargets: 1,
};

export type SkillPayload<T> = {
  idx: number;
  value: T;
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: [initialSkillState],
  reducers: {
    resetSkills: (state) => {
      state = [initialSkillState];
    },
    addSkill: (state) => {
      state.push(initialSkillState);
    },
    removeSkill: (state) => {
      state.pop();
    },
    setBaseClass: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].skillKey.baseClass = value as BaseClass;
    },
    setSkillName: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].skillKey.name = value;
    },
    setIsChildSkill: (state, action: PayloadAction<SkillPayload<boolean>>) => {
      const { idx, value } = action.payload;
      state[idx].isChildSkill = value;
    },
    setWeaponType: (state, action: PayloadAction<SkillPayload<WeaponType>>) => {
      const { idx, value } = action.payload;
      state[idx].weaponType = value;
    },
    setWeaponPosition: (
      state,
      action: PayloadAction<SkillPayload<WeaponPosition>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].weaponPosition = value;
    },
    setDamageCoefficient: (
      state,
      action: PayloadAction<SkillPayload<string>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].damageCoefficient = ensureFloat(
        value,
        initialSkillState.damageCoefficient
      );
    },
    setCastDuration: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].castDuration[0] = ensureUnsignedInt(
        value,
        initialSkillState.castDuration[0]
      );
    },
    setCastDurationQuickness: (
      state,
      action: PayloadAction<SkillPayload<string>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].castDuration[1] = ensureUnsignedInt(
        value,
        initialSkillState.castDuration[1]
      );
    },
    setCooldown: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].cooldown[0] = ensureUnsignedInt(
        value,
        initialSkillState.cooldown[0]
      );
    },
    setCooldownAlacrity: (
      state,
      action: PayloadAction<SkillPayload<string>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].cooldown[1] = ensureUnsignedInt(
        value,
        initialSkillState.cooldown[1]
      );
    },
    addStrikeOnTick: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].strikeOnTickList[0].push(0);
      state[idx].strikeOnTickList[1].push(0);
    },
    removeStrikeOnTick: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].strikeOnTickList[0].pop();
      state[idx].strikeOnTickList[1].pop();
    },
    setStrikeOnTick: (
      state,
      action: PayloadAction<[idx: number, value: string, strikeIdx: number]>
    ) => {
      const [idx, value, strikeIdx] = action.payload;
      state[idx].strikeOnTickList[0][strikeIdx] = ensureUnsignedInt(value, 0);
    },
    setStrikeOnTickQuickness: (
      state,
      action: PayloadAction<[idx: number, value: string, strikeIdx: number]>
    ) => {
      const [idx, value, strikeIdx] = action.payload;
      state[idx].strikeOnTickList[1][strikeIdx] = ensureUnsignedInt(value, 0);
    },
    addPulseOnTick: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].pulseOnTickList[0].push(0);
      state[idx].pulseOnTickList[1].push(0);
    },
    removePulseOnTick: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].pulseOnTickList[0].pop();
      state[idx].pulseOnTickList[1].pop();
    },
    setPulseOnTick: (
      state,
      action: PayloadAction<[idx: number, value: string, pulseIdx: number]>
    ) => {
      const [idx, value, pulseIdx] = action.payload;
      state[idx].pulseOnTickList[0][pulseIdx] = ensureUnsignedInt(value, 0);
    },
    setPulseOnTickQuickness: (
      state,
      action: PayloadAction<[idx: number, value: string, pulseIdx: number]>
    ) => {
      const [idx, value, pulseIdx] = action.payload;
      state[idx].pulseOnTickList[1][pulseIdx] = ensureUnsignedInt(value, 0);
    },
    addStrikeEffectApplication: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].onStrikeEffectApplication.push(initialEffectApplicationState);
    },
    removeStrikeEffectApplication: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].onStrikeEffectApplication.pop();
    },
    setStrikeEffectUniqueEffectTypeName: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].uniqueEffectType.name =
        value;
    },
    setStrikeEffectType: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].effectType =
        value as Effect;
    },
    setStrikeEffectDirection: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].direction =
        value as Direction;
    },
    setStrikeEffectBaseDuration: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].baseDuration =
        ensureUnsignedInt(value, 0);
    },
    setStrikeEffectNumStacks: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].numStacks =
        ensureUnsignedInt(value, 0);
    },
    setStrikeEffectNumTargets: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onStrikeEffectApplication[effectIdx].numTargets =
        ensureUnsignedInt(value, 0);
    },
    addPulseEffectApplication: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].onPulseEffectApplication.push(initialEffectApplicationState);
    },
    removePulseEffectApplication: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].onPulseEffectApplication.pop();
    },
    setPulseEffectUniqueEffectTypeName: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].uniqueEffectType.name =
        value;
    },
    setPulseEffectType: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].effectType =
        value as Effect;
    },
    setPulseEffectDirection: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].direction =
        value as Direction;
    },
    setPulseEffectBaseDuration: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].baseDuration =
        ensureUnsignedInt(value, 0);
    },
    setPulseEffectNumStacks: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].numStacks =
        ensureUnsignedInt(value, 0);
    },
    setPulseEffectNumTargets: (
      state,
      action: PayloadAction<[idx: number, value: string, effectIdx: number]>
    ) => {
      const [idx, value, effectIdx] = action.payload;
      state[idx].onPulseEffectApplication[effectIdx].numTargets =
        ensureUnsignedInt(value, 0);
    },
    addChildSkillKey: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].childSkillKeys.push(initialSkillState.skillKey);
    },
    removeChildSkillKey: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].childSkillKeys.pop();
    },
    setChildBaseClass: (
      state,
      action: PayloadAction<[idx: number, value: string, childIdx: number]>
    ) => {
      const [idx, value, childIdx] = action.payload;
      state[idx].childSkillKeys[childIdx].baseClass = value as BaseClass;
    },
    setChildSkillName: (
      state,
      action: PayloadAction<[idx: number, value: string, childIdx: number]>
    ) => {
      const [idx, value, childIdx] = action.payload;
      state[idx].childSkillKeys[childIdx].name = value;
    },
    addTag: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].tags.push(SkillTag.INVALID);
    },
    removeTag: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      state[idx].tags.pop();
    },
    setTag: (
      state,
      action: PayloadAction<[idx: number, value: SkillTag, tagIdx: number]>
    ) => {
      const [idx, value, tagIdx] = action.payload;
      state[idx].tags[tagIdx] = value as SkillTag;
    },
    setAttributeModifier: (
      state,
      action: PayloadAction<{ idx: number; value: string; field: string }>
    ) => {
      const { idx, value, field } = action.payload;
      state[idx].attributeModifiers[field] = ensureFloat(
        value,
        initialSkillState.attributeModifiers[field] as number
      );
    },
    setDamageModifier: (
      state,
      action: PayloadAction<{ idx: number; value: string; field: string }>
    ) => {
      const { idx, value, field } = action.payload;
      if (
        state[idx].damageModifiers[field] !== undefined &&
        initialSkillState.damageModifiers[field] !== undefined
      ) {
        state[idx].damageModifiers[field] = ensureFloat(
          value,
          initialSkillState.damageModifiers[field] as number
        );
      }
    },
    setEquipBundleName: (
      state,
      action: PayloadAction<SkillPayload<string>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].equipBundle.name = value;
    },
    setAmmo: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].ammo = ensureUnsignedInt(value, initialSkillState.ammo);
    },
    setRechargeDuration: (
      state,
      action: PayloadAction<SkillPayload<string>>
    ) => {
      const { idx, value } = action.payload;
      state[idx].rechargeDuration = ensureUnsignedInt(
        value,
        initialSkillState.rechargeDuration
      );
    },
    setNumTargets: (state, action: PayloadAction<SkillPayload<string>>) => {
      const { idx, value } = action.payload;
      state[idx].numTargets = ensureUnsignedInt(
        value,
        initialSkillState.numTargets
      );
    },
  },
});

export const {
  addSkill,
  removeSkill,
  setBaseClass,
  setSkillName,
  setIsChildSkill,
  setWeaponType,
  setWeaponPosition,
  setDamageCoefficient,
  setCastDuration,
  setCastDurationQuickness,
  setCooldown,
  setCooldownAlacrity,
  addStrikeOnTick,
  removeStrikeOnTick,
  setStrikeOnTick,
  setStrikeOnTickQuickness,
  addPulseOnTick,
  removePulseOnTick,
  setPulseOnTick,
  setPulseOnTickQuickness,
  addStrikeEffectApplication,
  removeStrikeEffectApplication,
  setStrikeEffectUniqueEffectTypeName,
  setStrikeEffectType,
  setStrikeEffectDirection,
  setStrikeEffectBaseDuration,
  setStrikeEffectNumStacks,
  setStrikeEffectNumTargets,
  addPulseEffectApplication,
  removePulseEffectApplication,
  setPulseEffectUniqueEffectTypeName,
  setPulseEffectType,
  setPulseEffectDirection,
  setPulseEffectBaseDuration,
  setPulseEffectNumStacks,
  setPulseEffectNumTargets,
  addChildSkillKey,
  removeChildSkillKey,
  setChildBaseClass,
  setChildSkillName,
  addTag,
  removeTag,
  setTag,
  setAttributeModifier,
  setDamageModifier,
  setEquipBundleName,
  setAmmo,
  setRechargeDuration,
  setNumTargets,
} = skillsSlice.actions;
export default skillsSlice.reducer;
