const mock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {})
  };
};

const mediaMock = (query: string) => {
  const minWidthMatch = query.match('min-width: ([0-9]*)px');
  const minWidth: number = minWidthMatch ? +minWidthMatch[1] : 0;
  const maxWidthMatch = query.match('max-width: ([0-9]*)px');
  const maxWidth: number = maxWidthMatch ? +maxWidthMatch[1] : Infinity;
  return {
    matches: window['width'] > minWidth && window['width'] < maxWidth
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'matchMedia', { value: mediaMock });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
