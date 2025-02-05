import { checkDom } from '@cfpb/cfpb-atomic-component/src/utilities/atomic-helpers.js';

const CONTAINER = 'cbg-checklist-error';

/**
 * @param {HTMLElement} element - The error DOM element.
 * @returns {object} An object with a 'render' method.
 */
function errorView(element) {
  const _dom = checkDom(element, CONTAINER);

  return {
    render(reveal) {
      if (reveal) {
        _dom.classList.remove('u-hidden');
      } else {
        _dom.classList.add('u-hidden');
      }
    },
  };
}

errorView.CONTAINER = CONTAINER;

export default errorView;
