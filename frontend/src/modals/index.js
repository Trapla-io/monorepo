const modals = {};

const context = import.meta.globEager('./*.vue');

Object.entries(context).forEach(([file, definition]) => {
  const name = file.split('/').pop().replace(/\.\w+$/, '');
  modals[name] = definition.default;
});
export default modals;