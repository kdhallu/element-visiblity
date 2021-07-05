/************************************************************************************************
 *                                                                                              *
 *                              element-visiblity.js                                                     *
 *                                                                                              *
 ************************************************************************************************/
window.elementVisibility = ($adElement) => {
  /**
   * Constants whose re-calculation is not required
   */
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const adElementHeight = $adElement.offsetHeight;
  const adElementWidth = $adElement.offsetWidth;
  const adPositionFromTop = $adElement.offsetTop;
  const adPositionFromLeft = $adElement.offsetLeft;


  /**
   * Calculate x-axis visibility
   */
  const calculateYAxisVisibility = () => {
    let percentage;
    const scrollTop = document.documentElement.scrollTop;
    const hiddenBefore = scrollTop - adPositionFromTop;
    const hiddenAfter = (adPositionFromTop + adElementHeight) - (scrollTop + windowHeight);

    if ((scrollTop > adPositionFromTop + adElementHeight) || (adPositionFromTop > scrollTop + windowHeight)) {
      percentage = 0;
    } else {
      percentage = 100;

      if (hiddenBefore > 0) {
        percentage -= (hiddenBefore * 100) / adElementHeight;
      }

      if (hiddenAfter > 0) {
        percentage -= (hiddenAfter * 100) / adElementHeight;
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
    const hiddenBefore = scrollLeft - adPositionFromLeft;
    const hiddenAfter = (adPositionFromLeft + adElementWidth) - (scrollLeft + windowWidth);

    if ((scrollLeft > adPositionFromLeft + adElementWidth) || (scrollLeft > adPositionFromLeft + adElementWidth)) {
      percentage = 0;
    } else {
      percentage = 100;

      if (hiddenBefore > 0) {
        percentage -= (hiddenBefore * 100) / adElementWidth;
      }

      if (hiddenAfter > 0) {
        percentage -= (hiddenAfter * 100) / adElementWidth;
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
