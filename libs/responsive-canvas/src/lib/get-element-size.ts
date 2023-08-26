const parseNumber = (prop: string) => parseFloat(prop) || 0;

export const getElementSize = (el: Element): [number, number] => {
  if (el === document.body) {
    return [window.innerWidth, window.innerHeight];
  }

  const temporary = !el.parentNode && document.body;

  if (temporary) {
    document.body.appendChild(el);
  }

  const rect = el.getBoundingClientRect();
  const styles = getComputedStyle(el);

  const height =
    (rect.height | 0) +
    parseNumber(styles.getPropertyValue("margin-top")) +
    parseNumber(styles.getPropertyValue("margin-bottom"));
  const width =
    (rect.width | 0) +
    parseNumber(styles.getPropertyValue("margin-left")) +
    parseNumber(styles.getPropertyValue("margin-right"));

  if (temporary) {
    document.body.removeChild(el);
  }

  return [width, height];
};

export default getElementSize;
