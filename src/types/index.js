﻿/**
 * @typedef Problem
 * @prop {string} id
 * @prop {string} title
 * @prop {"Easy"|"Medium"|"Hard"} difficulty
 * @prop {string[]} tags
 * @prop {string} sourceUrl
 * @prop {string} youtubeUrl
 * @prop {string} codeforcesUrl
 * @prop {string} articleUrl
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
 *
 * @typedef Subtopic
 * @prop {string} id
 * @prop {string} title
 * @prop {"Easy"|"Medium"|"Hard"} difficulty
 * @prop {string[]} tags
 * @prop {Problem[]} problems
 *
 * @typedef Topic
 * @prop {string} id
 * @prop {string} name
 * @prop {string} description
 * @prop {string} icon
 * @prop {string} color
 * @prop {Subtopic[]} subtopics
 */

export {};
