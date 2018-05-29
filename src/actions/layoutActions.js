export const LAYOUT_SHOW_SPINNER = 'LAYOUT_SHOW_SPINNER';
export const LAYOUT_HIDE_SPINNER = 'LAYOUT_HIDE_SPINNER';
export const LAYOUT_LOGIN_MODAL_UPDATE = 'LAYOUT_LOGIN_MODAL_UPDATE';


export const showSpinner = () => ({ type: LAYOUT_SHOW_SPINNER });

export const hideSpinner = () => ({ type: LAYOUT_HIDE_SPINNER });

export const updateLoginModalIsOpen = isOpen => ({ type: LAYOUT_LOGIN_MODAL_UPDATE, isOpen });
