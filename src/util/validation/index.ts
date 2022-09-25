export const ensureInt = (value: string, fallback: number): number => {
  if (value === '') {
    return fallback;
  }
  const num = Math.round(parseFloat(value));
  if (isNaN(num)) {
    return fallback;
  }

  return num;
};

export const ensureFloat = (value: string, fallback: number): number => {
  if (value === '') {
    return fallback;
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return fallback;
  }

  return num;
};

export const ensureUnsigned = (value: number, fallback: number): number => {
  const num = Math.abs(value);

  if (isNaN(num)) {
    return fallback;
  }

  return num;
};

export const ensureUnsignedInt = (value: string, fallback: number): number => {
  return ensureUnsigned(ensureInt(value, fallback), fallback);
};
