import { checkAuth, createPerson, getWorkshops, logout } from '../fetch-utils.js';

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
        workshops_id: workshopId,
    });
    console.log(workshopId, 'id select');

    personForm.reset();
});

window.addEventListener('load', async () => {
    const select = document.querySelector('select');
    const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const option = document.createElement('option');

        option.value = workshop.id;
        option.textContent = workshop.name;

        select.append(option);
    }
});

checkAuth();
