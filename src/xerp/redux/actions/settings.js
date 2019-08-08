import { CHANGE_SETTING, TOGGLE_SETTING } from '../constants'

/**
 * Change a setting value
 * payload.name: name of the setting prop to change
 * payload.value: new value to apply
 */
export const changeSetting = (name, value) => {
    return { type: CHANGE_SETTING, name, value };
}

/**
 * Toggle a setting value (only boolean)
 */
export const toggleSetting = (name) => {
    return { type: TOGGLE_SETTING, name };
}