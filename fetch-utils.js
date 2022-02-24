const SUPABASE_URL = 'https://uhmsxsfarryniihsuyry.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXN4c2ZhcnJ5bmlpaHN1eXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ4NTg5OTUsImV4cCI6MTk2MDQzNDk5NX0.DX8Yp3q-uUt4Q185uQlz61drW20MespMboRangENHIg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshop');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

//---------------------------------------------------------------------------------------------------------------------

export async function getWorkshops() {
    const response = await client.from('workshops').select(`*, peoples (*)`);
    //.match({ 'peoples.user_id': client.auth.session().user.id });
    console.log(response, 'response getWorkshops');
    return checkError(response);
}

// let { data: workshops, error } = await supabase
//   .from('workshops')
//   .select('*')

export async function deletePerson(id) {
    const response = await client.from('peoples').delete().match({ id: id }).single();

    return checkError(response);
}

export async function createPerson(person) {
    const response = await client.from('peoples').insert({
        ...person,
        //  user_id: client.auth.session().user.id,
    });

    return checkError(response);
}
