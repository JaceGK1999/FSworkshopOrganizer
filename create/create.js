import { checkAuth, createPerson, logout } from '../fetch-utils.js';
import { displayWorkshops } from '../workshop/workshop.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//------------------------------------------------------------------
const personForm = document.querySelector('.person-form');

personForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(personForm);

    const workshopId = formData.get('workshop-id');
    const name = formData.get('peoples-name');

    await createPerson({
        name: name,
        workshop_id: workshopId,
    });

    personForm.reset();
});

window.addEventListener('load', async () => {
    displayWorkshops();
});
