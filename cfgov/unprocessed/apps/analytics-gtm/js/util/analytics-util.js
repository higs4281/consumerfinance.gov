/**
 * Query a selector and add listeners to returned elements.
 *
 * @param {string} selector - A dom selector.
 * @param {string} event - An event string, probably a "MouseEvent."
 * @param {Function} callback - The event handler.
 */
function addEventListenerToSelector(selector, event, callback) {
  const elems = document.querySelectorAll(selector);
  for (let i = 0, len = elems.length; i < len; i++) {
    addEventListenerToElem(elems[i], event, callback);
  }
}

/**
 * Check if an element exists on the page, and if it does, add listeners.
 *
 * @param {[type]} elem - [description] TODO
 * @param {[type]} event - [description] TODO
 * @param {Function} callback - [description] TODO
 */
function addEventListenerToElem(elem, event, callback) {
  if (elem) {
    elem.addEventListener(event, callback);
  } else {
    analyticsLog(`${elem} doesn't exist!`);
  }
}

/**
 * Log a message to the console if the `debug-gtm` URL parameter is set.
 *
 * @param {string} msg - Message to load to the console.
 */
function analyticsLog(...msg) {
  // Get query params.
  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (queryParams['debug-gtm'] === 'true') {
    console.log(`ANALYTICS DEBUG MODE: ${msg}`);
  }
}

/**
 * Create a delay given a callback function and millisecond delay.
 *
 * @class
 */
function Delay() {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

/**
 * TODO: Merge with Analytics.js.
 * Track an analytics event and log the event.
 *
 * @param {string} event - Type of event.
 * @param {string} action - Name of event.
 * @param {string} label - DOM element label.
 */
function track(event, action, label) {
  window.dataLayer.push({
    event: event,
    action: action,
    label: label,
  });
  analyticsLog(event, action, label);
}

module.exports = {
  addEventListenerToSelector,
  addEventListenerToElem,
  analyticsLog,
  Delay,
  track,
};
