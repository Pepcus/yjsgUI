import _merge from 'deepmerge';

export const mergeObjects = (target, source, options = {}) => _merge(target, source, options);
