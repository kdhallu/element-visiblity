/************************************************************************************************
 *                                                                                              *
 *                              element-visiblity.js                                                     *
 *                                                                                              *
 ************************************************************************************************/
window.elementVisibility = ($element) => {
  /**
   * Constants
   */
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const elementHeight = $element.offsetHeight;
  const elementWidth = $element.offsetWidth;
  const elementPositionFromTop = $element.offsetTop;
  const elementPositionFromLeft = $element.offsetLeft;

  /**
   * Calculate x-axis visibility
   */
  const calculateYAxisVisibility = () => {
    let percentage;
    const scrollTop = document.documentElement.scrollTop;
    const hiddenBefore = scrollTop - elementPositionFromTop;
    const hiddenAfter = (elementPositionFromTop + elementHeight) - (scrollTop + windowHeight);

    if ((scrollTop > elementPositionFromTop + elementHeight) || (elementPositionFromTop > scrollTop + windowHeight)) {
      percentage = 0;
    } else {
      percentage = 100;

      if (hiddenBefore > 0) {
        percentage -= (hiddenBefore * 100) / elementHeight;
      }

      if (hiddenAfter > 0) {
        percentage -= (hiddenAfter * 100) / elementHeight;
      }
    }
    return percentage;
  }

  /**
   * Calculate y-axis visibility
   */
  const calculateXAxisVisibility = () => {
    let percentage;
    const scrollLeft = document.documentElement.scrollLeft;
    const hiddenBefore = scrollLeft - elementPositionFromLeft;
    const hiddenAfter = (elementPositionFromLeft + elementWidth) - (scrollLeft + windowWidth);

    if ((scrollLeft > elementPositionFromLeft + elementWidth) || (elementPositionFromLeft > scrollLeft + windowWidth)) {
      percentage = 0;
    } else {
      percentage = 100;

      if (hiddenBefore > 0) {
        percentage -= (hiddenBefore * 100) / elementWidth;
      }

      if (hiddenAfter > 0) {
        percentage -= (hiddenAfter * 100) / elementWidth;
      }
    }

    return percentage;
  }

  /**
   * method to consolidate x and y axis visibility
   */
  const getAdVisibility = () => {
    const xAxis = calculateXAxisVisibility();
    const yAxis = calculateYAxisVisibility();
    return (xAxis === 0 || yAxis === 0) ? 0 : {xAxis: `${xAxis}%`, yAxis: `${yAxis}%`};
  }

  /**
   * Allow access only to the getVisiblity method
   */
  return {
    getAdVisibility,
  }
}
