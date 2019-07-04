var ConnectionDatabase = require('./ConnectionDatabase')
var request = require("request")
var ConvertDay = require('../function/convertDay')

const tablePremierLeagueURL = 'https://site.web.api.espn.com/apis/v2/sports/soccer/eng.1/standings?region=us&lang=en&contentorigin=espn&season=2018&sort=rank%3Aasc',
      tableLaligaURL = 'https://site.web.api.espn.com/apis/v2/sports/soccer/esp.1/standings?region=us&lang=en&contentorigin=espn&sort=rank%3Aasc',
      tableSerieAURL = 'https://site.web.api.espn.com/apis/v2/sports/soccer/ita.1/standings?region=us&lang=en&contentorigin=espn&sort=rank%3Aasc'
      scheduleURL = 'http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?lang=en&region=gb&calendartype=whitelist&limit=100&dates=20190512&league=eng.1',
      replayURL = 'https://www.scorebat.com/video-api/v1/';

function AddDataTable(col){
  var tablePremierLeague = [], tableLaliga = [], tableSerieA = [];
  request({
    url: tablePremierLeagueURL,
    json: true
  }, function (error, response, data){
    if (!error && response.statusCode === 200){
      data.children[0].standings.entries.forEach(element => {
        var table = {
          teamName: element.team.shortDisplayName,
          league: 'Premier League',
          abbr: element.team.abbreviation,
          pos: element.stats[7].value,
          played: element.stats[3].value,
          goalsDefference: element.stats[8].value,
          points: element.stats[6].value
        }
        tablePremierLeague.push(table)
      })
      ConnectionDatabase.connect().then(client => {
        client.db('SuperSunday').collection(col).insertMany(tablePremierLeague, function(err, res) {
          if (err) throw err;
          client.close()
        })
      })
    }
  })
  request({
    url: tableLaligaURL,
    json: true
  }, function (error, response, data){
    if (!error && response.statusCode === 200){
      data.children[0].standings.entries.forEach(element => {
        var table = {
          teamName: element.team.shortDisplayName,
          league: 'La Liga',
          abbr: element.team.abbreviation,
          pos: element.stats[7].value,
          played: element.stats[3].value,
          goalsDefference: element.stats[8].value,
          points: element.stats[6].value
        }
        tableLaliga.push(table)
      })
      ConnectionDatabase.connect().then(client => {
        client.db('SuperSunday').collection(col).insertMany(tableLaliga, function(err, res) {
          if (err) throw err;
          client.close()
        })
      })
    }
  })
  request({
    url: tableSerieAURL,
    json: true
  }, function (error, response, data){
    if (!error && response.statusCode === 200){
      data.children[0].standings.entries.forEach(element => {
        var table = {
          teamName: element.team.shortDisplayName,
          league: 'Serie A',
          abbr: element.team.abbreviation,
          pos: element.stats[7].value,
          played: element.stats[3].value,
          goalsDefference: element.stats[8].value,
          points: element.stats[6].value
        }
        tableSerieA.push(table)
      })
      ConnectionDatabase.connect().then(client => {
        client.db('SuperSunday').collection(col).insertMany(tableSerieA, function(err, res) {
          if (err) throw err;
          client.close()
        }) 
      })
    }
  })
}

function GetDay(day) {
  return new Promise((resolve, reject) => {
    request({
      url: scheduleURL,
      json: true
    }, function (error, response, data) {
      if (!error && response.statusCode === 200) {
        data.leagues[0].calendar.forEach(element => {
          day.push(ConvertDay.PostFormat(element))
        });
        resolve()
      }
      else{
        reject()
      }
    })
  })
}

async function GetSchedule(day, col) {
  let Sche = []
  for(let i = 0; i < day.length; i++){
    await new Promise((resolv, rejec) => {
      request({
        url: 'http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?lang=en&region=gb&calendartype=whitelist&limit=100&dates=' + day[i] + '&league=eng.1',
        json: true
      }, function (error, response, data){
        if (!error && response.statusCode === 200){
          for(let j = 0; j < data.events.length; j++){
            let date = new Date(ConvertDay.ConvertTimeZone(data.events[j].date))
            var schedule ={
              teamHome: data.events[j].competitions[0].competitors[0].team.shortDisplayName,
              abbrTeamHome: data.events[j].competitions[0].competitors[0].team.abbreviation,
              date: (date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()),
              time: (date.getMinutes() === 0) ? ((date.getHours() + ':' + date.getMinutes()) + '0') : ((date.getHours() + ':' + date.getMinutes())),
              teamWay: data.events[j].competitions[0].competitors[1].team.shortDisplayName,
              abbrTeamWay: data.events[j].competitions[0].competitors[1].team.abbreviation,
              link: 'rtmp://localhost/live/tutc'
            }
            console.log(schedule)
            Sche.push(schedule)
            if(j + 1 == data.events.length){
            }
          }
          resolv()
        }
      })
    })
    if(i + 1 == day.length){
      ConnectionDatabase.connect().then(client => {
        client.db('SuperSunday').collection(col).insertMany(Sche, function(err, res) {
          console.log('done')
          if (err) throw(err)
        })
      })
    }
  }
}

function AddDataReplay(col) {
  request({
    url: scheduleURL,
    json: true
  }, function (error, response, data) {
    if (!error && response.statusCode === 200) {
      var replayCollection = [],
          replayLink = ['https://www.scorebat.com/embed/v/5cd8411312afd/',
          'https://www.scorebat.com/embed/v/5cd854d85cffc/',
          'https://www.scorebat.com/embed/v/5cd83e4c583f3/',
          'https://www.scorebat.com/embed/v/5cd8416873230/',
          'https://www.scorebat.com/embed/v/5cd8488186882/',
          'https://www.scorebat.com/embed/v/5cd84178ac893/',
          'https://www.scorebat.com/embed/v/5cd841cc5dbdc/',
          'https://www.scorebat.com/embed/v/5cd8413b1e4c1/',
          'https://www.scorebat.com/embed/v/5cd847510ca33/',
          'https://www.scorebat.com/embed/v/5cd8407f0941c/'
        ],
        i = 0;
      data.events.forEach(element => {
        replay = {
          teamHome: element.competitions[0].competitors[0].team.shortDisplayName,
          abbrTeamHome: element.competitions[0].competitors[0].team.abbreviation,
          score: {
            teamHome: element.competitions[0].competitors[0].score,
            teamWay: element.competitions[0].competitors[1].score
          },
          teamWay: element.competitions[0].competitors[1].team.shortDisplayName,
          abbrTeamWay: element.competitions[0].competitors[1].team.abbreviation,
          link: replayLink[i]
        }
        replayCollection.push(replay)
        i++
      });
      ConnectionDatabase.connect().then(client => {
        client.db('SuperSunday').collection(col).insertMany(replayCollection, function(err, res) {
          if (err) throw err;
          client.close()
        })
      })
    }
  })
}

async function AddDataSchedule(client, col) {
    var day = []
    await GetDay(day)
    GetSchedule(day, client, col)
}

function CreateCollection(collection){
  ConnectionDatabase.connect().then((client) => {
    client.db('SuperSunday').createCollection(collection, function(err, res) {
      if (err) throw(err);
      console.log("Collection " + collection + " created!");
      client.close()
    })
  })
}

module.exports = {
  run : () => {
      CreateCollection('User')
      CreateCollection('Team')
      CreateCollection('Table')
      CreateCollection('Schedule')
      CreateCollection('Replay')
      CreateCollection('Chat')
      console.log('Inserting data... Please watting!')
      //AddDataTable('Table')
      AddDataSchedule('Schedule')
      //AddDataReplay('Replay')
  }
}