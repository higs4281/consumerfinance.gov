import { jest } from '@jest/globals';
import {
  attach,
  checkBehaviorDom,
  find,
  remove,
} from '../../../../../cfgov/unprocessed/js/modules/util/behavior';

let containerDom;
let behaviorElmDom;
const selector = 'data-js-hook=behavior_flyout-menu';

const HTML_SNIPPET = `
<div class="skip-nav">
  <a href="#main" class="skip-nav_link">Skip to main content</a>
</div>
<a class="o-mega-menu_content-link o-mega-menu_content-1-link"
   data-js-hook="behavior_flyout-menu_trigger">
     Consumer Tools
</a>
<a class="o-mega-menu_content-link o-mega-menu_content-1-link"
   data-js-hook="behavior_flyout-menu_trigger">
      Educational Resources
</a>
<div data-js-hook="behavior_flyout-menu">
    <div data-js-hook="behavior_flyout-menu_content"></div>
</div>
`;

/**
 * @param {HTMLElement} target - The target element of the event.
 * @param {string} eventType - The event type description.
 * @param {string} eventOption - A keyCode, if the event is a keyup event.
 */
function triggerEvent(target, eventType, eventOption) {
  const event = document.createEvent('Event');
  if (eventType === 'keyup') {
    event.keyCode = eventOption || '';
  }
  event.initEvent(eventType, true, true);
  target.dispatchEvent(event);
}

describe('behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = HTML_SNIPPET;
    containerDom = document.querySelector('[' + selector + ']');
    behaviorElmDom = document.querySelector('[' + selector + '_content]');
  });

  describe('attach function', () => {
    it('should register an event callback when passed a Node', () => {
      const spy = jest.fn();
      const linkDom = document.querySelector('a[href^="#"]');
      attach(linkDom, 'click', spy);
      triggerEvent(linkDom, 'click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should register an event callback when passed a NodeList', () => {
      const spy = jest.fn();
      const behaviorDom = find('flyout-menu_trigger');
      attach(behaviorDom, 'mouseover', spy);
      triggerEvent(behaviorDom[0], 'mouseover');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should register an event callback when passed a behavior selector', () => {
      const spy = jest.fn();
      const behaviorDom = find('flyout-menu_trigger');
      attach('flyout-menu_trigger', 'mouseover', spy);
      triggerEvent(behaviorDom[0], 'mouseover');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should register an event callback when passed a dom selector', () => {
      const spy = jest.fn();
      const linkDom = document.querySelector('a[href^="#"]');
      attach('a[href^="#"]', 'click', spy);
      triggerEvent(linkDom, 'click');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkBehaviorDom function ', () => {
    it('should throw an error if element DOM not found', () => {
      const errMsg =
        'behavior_flyout-menu behavior not found on passed DOM node!';
      /**
       *
       */
      function errFunc() {
        checkBehaviorDom(null, 'behavior_flyout-menu');
      }
      expect(errFunc).toThrow(Error, errMsg);
    });

    it('should throw an error if behavior attribute not found', () => {
      const errMsg = 'mock-attr behavior not found on passed DOM node!';
      /**
       *
       */
      function errFunc() {
        checkBehaviorDom(containerDom, 'mock-attr');
      }
      expect(errFunc).toThrow(Error, errMsg);
    });

    it(
      'should return the correct HTMLElement ' +
        'when direct element is searched',
      () => {
        const dom = checkBehaviorDom(containerDom, 'behavior_flyout-menu');
        expect(dom).toStrictEqual(containerDom);
      }
    );

    it(
      'should return the correct HTMLElement ' +
        'when child element is searched',
      () => {
        const dom = checkBehaviorDom(
          behaviorElmDom,
          'behavior_flyout-menu_content'
        );
        expect(dom).toStrictEqual(behaviorElmDom);
      }
    );
  });

  describe('find function', () => {
    it('should find all elements with the specific behavior hook', () => {
      let behaviorDom = find('flyout-menu_trigger');
      expect(behaviorDom.length === 2).toBe(true);
      behaviorDom = find('flyout-menu_content');
      expect(behaviorDom.length === 1).toBe(true);
    });

    it('should throw an error when passed an invalid behavior selector', () => {
      const behaviorSelector = 'a[href^="#"]';
      const errorMsg =
        '[data-js-hook*=behavior_' + behaviorSelector + '] not found in DOM!';
      const findFunction = find.bind(this, behaviorSelector);
      expect(findFunction).toThrow(Error, errorMsg);
    });
  });

  describe('remove function', () => {
    it('should remove the event callback for the specific behavior hook', () => {
      const spy = jest.fn();
      const linkDom = document.querySelector('a[href^="#"]');
      attach(linkDom, 'click', spy);
      triggerEvent(linkDom, 'click');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockReset();
      remove(linkDom, 'click', spy);
      triggerEvent(linkDom, 'click');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
