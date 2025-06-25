export async function fetchUserDetails() {
    const userData = await fetch('https://swapi.py4e.com/api/people/');
    const data = await userData.json();

    const enriched = await Promise.all(
        data.results.map(async (person) => {
        const films = await Promise.all(person.films.map(film => fetch(film).then(res => res.json())));
        const vehicles = await Promise.all(person.vehicles.map(vehicle => fetch(vehicle).then(res => res.json())));

        return {
            name: person.name,
            films: films.map(f => f.title).join(', ') || 'N/A',
            vehicles: vehicles.map(v => v.name).join(', ') || 'N/A',
        };
        })
    );

    return enriched;
    
}