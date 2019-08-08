import { TOGGLE_SETTING, CHANGE_SETTING } from '../constants'

const initialSettings = {
  /* Layout fixed. Scroll content only */
  isFixed: true,
  /* Sidebar collapsed */
  isCollapsed: false,
  /* Boxed layout */
  isBoxed: false,
  /* Floating sidebar */
  isFloat: false,
  /* Sidebar show menu on hover only */
  asideHover: false,
  /* Show sidebar scrollbar (dont' hide it) */
  asideScrollbar: false,
  /* Sidebar collapsed with big icons and text */
  isCollapsedText: true,
  /* Toggle for the offsidebar */
  offsidebarOpen: false,
  /* Toggle for the sidebar offcanvas (mobile) */
  asideToggled: false,
  /* Toggle for the sidebar user block */
  showUserBlock: false,
  /* Enables layout horizontal */
  horizontal: false,
  /* Full size layout */
  useFullLayout: false,
  /* Hide footer */
  hiddenFooter: false,
}

export default (state = initialSettings, action) => {
  switch (action.type) {
    case TOGGLE_SETTING:
      return {
        ...state,
        [action.name]: !state[action.name],
      }
    case CHANGE_SETTING:
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      return state
  }
}

