const db = require('./db/connection');
const axios = require('axios');

const createClient = () => {
    axios.get('https://randomuser.me/api/')
        .then((response) => {
            const { name } = response.data.results[0];
            const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Cliente creado!');
                /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const createPet = () => {
    const pets = [
        {
            name: 'Max',
            type: 'Dog',
            breed: 'Labrador',
            owner_id: Math.ceil(Math.random() * 7)
        },
        {
            name: 'Gatote',
            type: 'Cat',
            breed: 'Siberiano',
            owner_id: Math.ceil(Math.random() * 7)
        },
        {
            name:'Totujr',
            type:'Reptil',
            breed: 'Tortuga de rio',
            owner_id: Math.ceil(Math.random() * 7)
        }
    ];
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    const sql = `INSERT INTO pets (name, type, breed, owner_id) VALUES ('${randomPet.name}', '${randomPet.type}', '${randomPet.breed}', ${randomPet.owner_id})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Mascota creada!');
    });
}


setInterval(createClient, 5000);
setInterval(createPet, 5000);