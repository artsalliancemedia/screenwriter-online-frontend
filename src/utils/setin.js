import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import cloneDeep from 'lodash/cloneDeep';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    if (isEmpty(srcValue)) {
      return [];
    }
  }
  return srcValue;
}

export default function stateSetIn(state, level, value, update = false) {
  const key = level.shift();
  // if the level is the last, end
  if (key) {
    if (isString(state[key]) && state[key].match(/^\{(.*?)\}$|^\[(.*?)\]$/)) {
      state[key] = JSON.parse(state[key].trim());
    }
    if (level.length > 0) {
      state[key] = stateSetIn(state[key], level, value, update);
    } else if (!isArray(state[key]) && isObject(state[key]) && update) {
      state[key] = cloneDeep(mergeWith(state[key], value, customizer));
    } else {
      state[key] = value;
    }
  }
  return state;
}
