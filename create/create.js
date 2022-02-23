import { checkAuth, logout } from '../fetch-utils.js';
import { displayWorkshops } from '../workshop/workshop.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//------------------------------------------------------------------
const personForm 
// window.addEventListener('load', async () => {
//     displayWorkshopshops();
// });
