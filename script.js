function getLine(prop, codelines) {
  const line = Array.prototype
    .filter.call(codelines, line => Boolean(line.querySelectorAll('.hljs-rule')))
    .map(el => {
      const attribute = el.querySelector('.hljs-attribute');
      return attribute ? [attribute.textContent.trim(), el] : [];
    }).find(([attribute]) => attribute === prop) || [];

  return line[1];
}

function setLine(value, line) {
  const valueEl = line.querySelector('.hljs-value');
  valueEl.classList.add('hljs-number');
  valueEl.textContent = ` ${value}`;
}

function setTargetStyling(value, prop, target) {
  if(target) {
    target.style[prop] = value;
  }
}


var slideshow = remark.create({
  ratio: '16:9',
  highlightLanguage: 'javascript',
  highlightStyle: 'monokai',
  navigation: {
    scroll: false
  }
});

var dateStr = new Date().toLocaleString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' });
document.querySelector('.today-date').textContent = dateStr;

delegate(document.body, '.example-property-edit select', 'change', ({delegateTarget}) => {
  const { value, dataset:{prop} } = delegateTarget;

  const content = delegateTarget.closest('.remark-slide-content');
  const { targetSelector } = delegateTarget.closest('.example-property-edit').dataset;
  const codelines = content.querySelectorAll('.remark-code-line');
  const line = getLine(prop, codelines);

  if(line) {
    setLine(value, line);
    setTargetStyling(value, prop, content.querySelector(targetSelector));
  }
}, false)
