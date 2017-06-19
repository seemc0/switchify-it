var switchifyIt = {
  config: {
    transitionSpeed: 500
  },
  swapButtons: [],
  swapContent: [],
  currentActiveElement: 0,
  oneButtonOnly: false,
  contentParent: $('body'), //Temporarily

  init: function(){
    var si = this;
    this.initElementArrays(si);
    this.sortArrays(si.swapButtons, si.swapContent);
    this.initVisibility(this.currentActiveElement);
    this.watchButtonClicks(si);
    this.setContentParent(si);
    this.addContentAreaClass(si);
  },
  addContentAreaClass: function(si) {
    $(si.contentParent).addClass("si-contentArea");
  },
  setContentParent: function(si) {
    si.contentParent = $(si.swapContent[0]).parent();
  },
  getCurrentContentHeight: function(si) {
    var currentContentHeight = $(si.contentParent.height())[0];
    return currentContentHeight;
  },
  getNextContentHeight: function(si, nextElement, currentContentHeight){
      var originalElement = $(si.swapContent).eq(si.currentActiveElement);
      $(si.contentParent).height("");
      //Temporarily remove the current element from the swap area
      $(originalElement).addClass("si-hide").removeClass("si-show").css("display", "none");
      //Temporarily add the next element to the swap area
      $(nextElement).addClass("si-show").removeClass("si-hide").css("display", "block");
      var newHeight = $(si.contentParent).height();
      //Hide the next element again
      $(nextElement).addClass("si-hide").removeClass("si-show").css("display", "");
      //Show the original Element again as if nothing happened
      $(originalElement).addClass("si-show").removeClass("si-hide").css("display", "");
      return newHeight;
  },
  initElementArrays: function(si){
    $(".swap-button").each(function(){
      si.swapButtons.push(this);
    });
    $(".swap-content").each(function(){
      si.swapContent.push(this);
    });
    if (si.swapButtons.length < 1) {
      si.oneButtonOnly = true;
    }
  },

  sortArrays: (...args)=> {
    args.forEach(function(elements, index, array) {
      elements.sort(function(a, b){
        return ($(a).attr("data-order") - $(b).attr("data-order"));
      });
    });
  },

  initVisibility: function(indexToShow){
    var si = this;
    $(si.swapContent).eq(indexToShow).addClass("si-show");
    $(si.swapContent).not(":eq("+indexToShow+")").addClass("si-hide");
    $(si.swapButtons).eq(indexToShow).addClass("si-show");
    $(si.swapButtons).not(":eq("+indexToShow+")").addClass("si-hide");
  },
  getNextElementIndex: function(si){
    var nextElement = si.currentActiveElement + 1;
    if (nextElement >= si.swapContent.length) nextElement = 0;
    return nextElement;
  },
  watchButtonClicks: function(si){
    $(si.swapButtons).click(function(){
     var nextElement = si.getNextElementIndex(si);
      si.transitionVisibility(si, nextElement, si.currentActiveElement);
    });
  },

  transitionToNewHeight: function(si, currentHeight, newHeight, callback) {
    $(si.contentParent).animate({height: (newHeight + "px")}, si.config.transitionSpeed, callback);
  },

  hideElement: function(si, element) {
    $(element).fadeOut(si.config.transitionSpeed, function(){
        $(element).removeClass("si-show").addClass("si-hide").css("display", "");
    });
  },

  showElement: function(si, element) {
    $(element).fadeIn(si.config.transitionSpeed);
    $(element).addClass("si-show").removeClass("si-hide");
  },

  fixContentHeight: function(si, currentElementHeight) {
    $(si.contentParent).height(currentElementHeight + "px");
  },

  unfixContentHeight: function(si) {
    $(si.contentParent).height("");
  },

  disableAllButtons: function(si){
    $(si.swapButtons).prop("disabled", true);
  },

  enableAllButtons: function(si){
    $(si.swapButtons).prop("disabled", false);
  },

  transitionVisibility: function(si, indexToShow, elementToHideIndex){
    var currentElement = $(si.swapContent).eq(elementToHideIndex);
    var currentButton = $(si.swapButtons).eq(elementToHideIndex);
    var nextElement = $(si.swapContent).eq(indexToShow);
    var nextButton = $(si.swapButtons).eq(indexToShow);
    var currentElementHeight = si.getCurrentContentHeight(si);
    var nextElementHeight = si.getNextContentHeight(si, nextElement, currentElementHeight);
    si.disableAllButtons(si);
    si.hideElement(si, currentElement);
    if (!si.oneButtonOnly) {
      si.hideElement(si, currentButton);
    }
    si.fixContentHeight(si, currentElementHeight);
    si.transitionToNewHeight(si, currentElementHeight, nextElementHeight, function(){
      si.showElement(si, nextElement);
      if (!si.oneButtonOnly) {
        si.showElement(si, nextButton);
      }
      si.unfixContentHeight(si);
      si.enableAllButtons(si);
    });
    si.currentActiveElement = indexToShow;
  }
};

$(function(){
  switchifyIt.init();
});
