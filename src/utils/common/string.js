import templateRegex from 'es6-template-regex';

/**
 * String Replacement via a provided Dictionary of keys and values.
 *
 * String Replacement Match is : ${KEY}
 * Having a '${' (dollar sign and open curly brace) before
 * and '}' (closed curly brace) after the KEY.
 * Just like an ES6 template literal expression.
 *
 * Pass in a dictionary of key and values like so:
 *   replacementDictionary = {
 *     AMAZING: 'an amazing dude',
 *     PHONE: 1234567890,
 *     GOAL_TARGET: 35000,
 *   };
 *
 * Pass in a string to be replaced like so:
 *   theString = 'That guy is ${AMAZING},
 *                and his goal target is ${GOAL_TARGET}
 *                with phone number being ${PHONE}';
 *
 * Execute the function:
 *   const newString = stringReplace(theString, replacementDictionary);
 *   // final value
 *      'That guy is an amazing dude,
 *       and his goal target is 35000
 *       with phone number being 1234567890'
 *
 * @param  {String} theString             The string that needs replacement
 * @param  {Object} replacementDictionary A dictionary containing replacement keys and values
 * @return {String}                       Final replaced string
 */
export const stringReplace = (theString, replacementDictionary) => theString.replace(templateRegex(), (noop, key) =>
  replacementDictionary[key] || '',
);
