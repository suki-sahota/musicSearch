/*
 * Author: Suki Sahota
 * Description: Application for Musical Searching
 */
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const keys = require(`./keys`);

const connection = mysql.createConnection({
  host: keys.connectionInfo.host,
  port: keys.connectionInfo.port,
  user: keys.connectionInfo.user,
  password: keys.connectionInfo.password,
  database: keys.connectionInfo.database
});

connection.connect(function(err) {
  //if(err) throw err;
  runSearch();
});

function runSearch() {
  inquirer.prompt({
    message: `Hello, what would you like to do today? `,
    type: `list`,
    name: `decision`,
    choices: [
      `Search for a specific artist`,
      `Find artists who are listed more than once`,
      `Find data within a range`,
      `Search for a specific song`,
      `Exit`
    ]
  }).then(function(answer) {
    switch (answer.decision) {
      case `Search for a specific artist`:
        artistSearch();
        break;

      case `Find artists who are listed more than once`:
        multiSearch();
        break;
      
      case `Find data within a range`:
        rangeSearch();
        break;

      case `Search for a specific song`:
        songSearch();
        break;

      case `Exit`:
        connection.end();
        break;
    }
  });
}

// Function to search for a specific artist
function artistSearch() {
  inquirer.prompt({
    message: `Please type in the name of an artist that you would like to search for in our database`,
    type: `input`,
    name: `artist`
  }).then(function(answer) {
    connection.query(`SELECT * FROM songs WHERE ?`,
    {
      artist_name: answer.artist
    },
    function(err, res) {
      //if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        console.log(`Position: ${ res[i].id } || Song: ${ res[i].song_title } || Year: ${ res[i].release_year }`);
      }
      // Start process over
      runSearch();
    });
  });
}

// Function to search for artist who appears on list more than once
function multiSearch() {
  // `SELECT COUNT(*), artist_name FROM songs GROUP BY artist_name HAVING count(*) > 1`
  connection.query(`SELECT artist_name FROM songs GROUP BY artist_name HAVING count(*) > 1`,
  function(err, res) {
    //if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist_name);
    }
    // Start process over
    runSearch();
  });
}

// Function to find song data within a specified range
function rangeSearch() {
  inquirer.prompt([
    {
      message: `Please enter a lower bound. `,
      type: `input`,
      name: `lower`,
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(`You did not enter a valid number!`);
        return false;
      }
    },
    {
      message: `Please enter an upper bound. `,
      type: `input`,
      name: `upper`,
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(`You did not enter a valid number!`);
        return false;
      }
    }
  ]).then(function(answer) {
    connection.query(`SELECT * FROM songs WHERE id BETWEEN ? AND ?`,
    [
      answer.lower,
      answer.upper
    ],
    function(err, res) {
      //if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        console.log(`Position: ${ res[i].id }
                    || Song: ${ res[i].song_title }
                    || Artist: ${ res[i].artist_name }
                    || Year: ${ res[i].release_year }`);
      }
      // Start process over
      runSearch();
    });
  })
}

// Function to search for a specific song
function songSearch() {
  inquirer.prompt({
    message: `Type any song you wish... I might have it in my database `,
    type: `input`,
    name: `title`
  }).then(function(answer) {
    connection.query(`SELECT * FROM songs WHERE ?`,
    {
      song_title: answer.title
    },
    function(err, res) {
      //if (err) throw err;
      console.log(`Position: ${ res[0].id }
                  || Song: ${ res[0].song_title }
                  || Artist: ${ res[0].artist_name }
                  || Year: ${ res[0].release_year }`);

      // Start process over
      runSearch();
    });
  });
}