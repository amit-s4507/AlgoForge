/**
 * @typedef Problem
 * @prop {string} id
 * @prop {string} title
 * @prop {"Easy"|"Medium"|"Hard"} difficulty
 * @prop {string[]} tags
 * @prop {string} sourceUrl
 * @prop {string} note
 *
 * @typedef Section
 * @prop {string} id
 * @prop {string} title
 * @prop {Problem[]} items
 *
 * @typedef Sheet
 * @prop {string} id
 * @prop {string} name
 * @prop {Section[]} sections
 */

export {};
