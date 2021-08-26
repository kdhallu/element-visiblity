/************************************************************************************************
 *                                                                                              *
 *                              DECLARATIONS                                           *
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
 *                              IMPLEMENTATIONS                                                 *
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
