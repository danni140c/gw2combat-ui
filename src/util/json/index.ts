const replacer = function (key: any, value: any) {
  if (value && typeof value === 'object') {
    const replacement: Object = {};
    for (const k in value) {
      if (Object.hasOwnProperty.call(value, k)) {
        if (k !== '') {
          replacement[
            k.replaceAll(/([A-Z])/g, '_$1').toLowerCase() as keyof Object
          ] = value[k];
        }
      }
    }
    return replacement;
  }
  return value;
};

export const stringify = (data: any) => JSON.stringify(data, replacer);
