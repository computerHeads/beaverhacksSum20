document.addEventListener('DOMContentLoaded', hideNav);

function hideNav() {
  document.getElementsByTagName('nav')[0].setAttribute('hidden', 'true');
}
