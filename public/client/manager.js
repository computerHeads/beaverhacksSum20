document.addEventListener('DOMContentLoaded', hideNav);

function hideNav() {
  document.getElementsByTagName('nav')[0].setAttribute('hidden', 'true');
}
function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}
function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
function businessPage() {
  document.getElementById('managerPage').style.display = 'none';
  document.getElementById('businessPage').style.display = 'block';
}
function managerPage() {
  document.getElementById('managerPage').style.display = 'block';
  document.getElementById('businessPage').style.display = 'none';
}
