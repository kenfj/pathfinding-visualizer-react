// fix error ts(1208)
export { }

// fix Warning: [JSS] Cannot set property 'parentStyleSheet' of undefined
// https://stackoverflow.com/questions/66760985
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

window.CSSStyleSheet.prototype.insertRule = function (rule, _) {
  const styleElement = document.createElement("style");
  const textNode = document.createTextNode(rule);
  styleElement.appendChild(textNode);
  document.head.appendChild(styleElement);
  return 0;
};
