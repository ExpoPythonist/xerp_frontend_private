import { CHANGE_THEME } from "../constants";

/**
 * Change current theme path
 */
export const changeTheme = (path) => {
  return { type: CHANGE_THEME, path }
}
