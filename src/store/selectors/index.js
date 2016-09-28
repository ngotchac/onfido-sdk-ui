import { createSelector } from 'reselect'
import { mapValues, mapKeys, every } from 'lodash'

const captures = state => state.captures

const createSelectorWhichMapsToCaptures = (mapFunc) =>
  createSelector(captures, capturesValue => mapValues(capturesValue, mapFunc))

export const isThereAValidCapture = createSelectorWhichMapsToCaptures(capturesOfAType =>
  capturesOfAType.some(i => i.valid))

export const isThereAValidAndConfirmedCapture = createSelectorWhichMapsToCaptures(capturesOfAType =>
  capturesOfAType.some(i => i.valid && i.confirmed))

export const validCaptures = createSelectorWhichMapsToCaptures(capturesOfAType =>
  capturesOfAType.filter(i => i.valid))

export const unprocessedCaptures = createSelectorWhichMapsToCaptures(capturesOfAType =>
    capturesOfAType.filter(i => !i.processed))

export const hasUnprocessedCaptures= createSelectorWhichMapsToCaptures( capturesOfAType =>
    capturesOfAType.some(i => !i.processed))

export const areAllCapturesInvalid = createSelectorWhichMapsToCaptures(capturesOfAType =>
    capturesOfAType.length > 0 && capturesOfAType.every(i => i.processed && !i.valid))

export const allCaptured = createSelector(
  isThereAValidAndConfirmedCapture,
  obj => every(obj, i => i)
)

export const captureSelector = createSelector(
  validCaptures,
  validCapturesValue => mapKeys(
    mapValues(validCapturesValue, ([firstCapture]) => firstCapture),
    (v, key) => key + 'Capture')
)