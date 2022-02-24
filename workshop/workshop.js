import { checkAuth, deletePerson, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//------------------------------------------------------------------

const workshopsEl = document.querySelector('.workshops-container');
// console.log('loading test 2');
export async function displayWorkshops() {
    workshopsEl.textContent = '';

    const workshops = await getWorkshops();
    // console.log(workshops, 'workshops test');
    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const personsEl = document.createElement('div');

        personsEl.classList.add('person');
        workshopEl.classList.add('workshop');

        nameEl.textContent = workshop.name;

        for (let person of workshop.peoples) {
            const personEl = document.createElement('div');

            personEl.classList.add('person');
            personEl.textContent = person.name;

            personEl.addEventListener('click', async () => {
                await deletePerson(person.id);

                //   const updateWorkshops = await getWorkshops();

                await displayWorkshops();
            });
            personsEl.append(personEl);
        }

        workshopEl.append(nameEl, personsEl);
        workshopsEl.append(workshopEl);
    }
}
//displayWorkshops();
window.addEventListener('load', async () => {
    // console.log('loading');
    await displayWorkshops();
});
