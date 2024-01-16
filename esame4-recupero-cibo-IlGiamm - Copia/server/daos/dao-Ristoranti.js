'use strict';
/* Data Access Object (DAO) module for accessing questions and answers */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = require('../db');
const { use } = require('passport');


// This function retrieves the whole list of seats from the database.
exports.listAllRestaurant = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Ristoranti';
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
  
        const ristoranti = rows.map((row) => {
  
          const ristoranti = Object.assign({ID: row.ID}, { Ristorante: row.Ristorante }, { Indirizzo: row.Indirizzo },{Tel: row.Tel},{Categoria: row.Categoria});
          return ristoranti;
        });
  
        resolve(ristoranti);
      });
    });
  };