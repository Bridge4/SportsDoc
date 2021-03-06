const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3001;

const { Pool } = require('pg');

app.use(bodyParser.json());

const pool = new Pool({
    host: '3.17.77.33',
    user: 'ubuntu',
    password: 'password',
    database: 'sportdoc',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Tables: teams, players

//! Basketball
app.get('/basketball/getteam/:team', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'basketball' as sportname FROM nba_teams WHERE abbreviation = '${req.params.team}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/basketball/getplayer/:player', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT nba_players.*, 'basketball' as sportname, nba_teams.name FROM nba_players JOIN nba_teams ON nba_players.team_abbreviation = nba_teams.abbreviation WHERE player_id = '${req.params.player}' ORDER BY nba_players.index ASC`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/basketball/getteams', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT name, abbreviation, 'basketball' as sportname FROM nba_teams`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/basketball/getplayers', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT player_name, player_id, 'basketball' as sportname FROM nba_players WHERE index='Career'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

//! Football
app.get('/football/getteam/:team', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'football' as sportname FROM nfl_teams WHERE abbreviation = '${req.params.team}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/football/getplayer/:player', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'football' as sportname FROM nfl_players WHERE player_id = '${req.params.player}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/football/getteams', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT name, abbreviation, 'football' as sportname FROM nfl_teams`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/football/getplayers', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT player_name, player_id, 'football' as sportname FROM nfl_players WHERE index='Career'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

//! Hockey
app.get('/hockey/getteam/:team', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'hockey' as sportname FROM nhl_teams WHERE abbreviation = '${req.params.team}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/hockey/getplayer/:player', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'hockey' as sportname FROM nhl_players WHERE player_id = '${req.params.player}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/hockey/getteams', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT name, abbreviation, 'hockey' as sportname FROM nhl_teams`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/hockey/getplayers', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT player_name, player_id, 'hockey' as sportname FROM nhl_players WHERE index='Career'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

//! Baseball
app.get('/baseball/getteam/:team', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT *, 'baseball' as sportname FROM mlb_teams WHERE abbreviation = '${req.params.team}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/baseball/getplayer/:player', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT mlb_players.*, 'baseball' as sportname, mlb_chadwick.key_person AS chadwick_id FROM mlb_players INNER JOIN mlb_chadwick ON mlb_players.player_id = '${req.params.player}' AND key_bbref = mlb_players.player_id`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/baseball/getteams', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT name, abbreviation, 'baseball' as sportname FROM mlb_teams`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/baseball/getplayers', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT player_name, player_id, 'baseball' as sportname FROM mlb_players WHERE index='Career'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/baseball/getchadid/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT DISTINCT index, FROM mlb_chadwick WHERE key_retro='${req.params.id}'`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});


app.get('/basketball/getgames/:fromyear/:toyear', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT home_score, away_score, home_abbr, away_abbr, date
                      FROM nba_games 
                      WHERE  TO_TIMESTAMP('${req.params.fromyear}-09-01', 'YYYY-MM-DD') < date 
                      AND date < TO_TIMESTAMP('${req.params.toyear + 1}-08-01', 'YYYY-MM-DD')
                      ORDER BY date ASC`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/baseball/getgames/:fromyear/:toyear', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT home_score, away_score, home_abbr, away_abbr, date
                      FROM mlb_games 
                      WHERE  TO_TIMESTAMP('${req.params.fromyear}-09-01', 'YYYY-MM-DD') < date 
                      AND date < TO_TIMESTAMP('${req.params.toyear + 1}-08-01', 'YYYY-MM-DD')
                      ORDER BY date ASC`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/football/getgames/:fromyear/:toyear', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT home_score, away_score, home_abbr, away_abbr, date
                      FROM nfl_games 
                      WHERE  TO_TIMESTAMP('${req.params.fromyear}-09-01', 'YYYY-MM-DD') < date 
                      AND date < TO_TIMESTAMP('${req.params.toyear + 1}-08-01', 'YYYY-MM-DD')
                      ORDER BY date ASC`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.get('/hockey/getgames/:fromyear/:toyear', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(`SELECT home_score, away_score, home_abbr, away_abbr, date
                      FROM nhl_games 
                      WHERE  TO_TIMESTAMP('${req.params.fromyear}-09-01', 'YYYY-MM-DD') < date 
                      AND date < TO_TIMESTAMP('${req.params.toyear + 1}-08-01', 'YYYY-MM-DD')
                      ORDER BY date ASC`, (err, reso) => {
            done();
            if (err) {
                console.log(err.stack);
            } else {
                res.send(reso.rows);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
