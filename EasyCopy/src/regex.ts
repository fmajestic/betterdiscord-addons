function fromFixed(pattern: string): RegExp {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  // TODO: add a setting to enable/disable treating fixed patterns as global
  return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
}

export function parseRegex(pattern: string): RegExp {
  const match = /\/(.*)\/(d?g?i?m?s?u?y?)/.exec(pattern);
  return match ? new RegExp(match[1], match[2]) : fromFixed(pattern);
}
