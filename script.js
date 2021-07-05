/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = true,
  viewabilityTime = 0,
  visiblity = 0;
adElement = document.getElementById("ad");

/**
 * Logs the viewability values in the console
 *
 * @override
 */
window.log = function () {
  console.log("Ad is viewable: ", adIsViewable, "\nViewability time of the ad in sec:", viewabilityTime, 'visiblity', visiblity);
};

/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/

/**
 * debounce event callback to improve the performance
 */
const debounce = (callback) => {
  let timerId;
  const debounceTimout = 1;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(callback, debounceTimout);
  };
}

(() => {
  /**
   * Update the viewability variables
   */
  const logAddVisibility = () => {
    visiblity = elementVisibility(adElement).getAdVisibility();
    if (document['hidden']) {
      adIsViewable = false
    } else {
      adIsViewable = !(visiblity === 0)
    }
    // adIsViewable = document['hidden'] ? false : !(visiblity === 0);
  }

  /**
   * update Viewability Time
   */
  window.setInterval(() => {
    if (adIsViewable) {
      viewabilityTime = viewabilityTime + 500
    }
  }, 500);

  /**
   * Event Listeners
   */
  document.addEventListener('scroll', debounce(logAddVisibility));
  document.addEventListener('DOMContentLoaded', logAddVisibility);
  document.addEventListener('visibilitychange', logAddVisibility);
})();

/**
 * Todos:
 * 1. Have Average of x and y axis as well.
 * 2. Have a pausable timer to avoid setInterval running unnecessarily.
 * 3. In meetrics.js file constants are assigned during initialization And this needs to be recalculated
 *    on device orientation change.
 * 4. code does not work properly if the add element height is higher that window height.
 */

/**
 * Things considered:
 * 1. Debounced the events as the onscroll method callback is executed many times when user scrolls.
 * 2. Instead of having all codebase in on file i have separated the visibility calculation code in separate file.
 */

/**
 * Nice to have:
 * We can ship this as an npm package to the customers and they can seamlessly integrate it in their application.
 */
