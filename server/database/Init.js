var ConnectionDatabase = require('./ConnectionDatabase')
var request = require("request")
var ConvertDay = require('../function/convertDay')

const tableURL = 'https://site.web.api.espn.com/apis/v2/sports/soccer/eng.1/standings?region=us&lang=en&contentorigin=espn&sort=rank%3Aasc',
      scheduleURL = 'http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?lang=en&region=gb&calendartype=whitelist&limit=100&dates=20190512&league=eng.1',
      replayURL = 'https://www.scorebat.com/video-api/v1/';

function CreateCollection(client, collection){
  return new Promise ((resolve, reject) => {
      client.db('SuperSunday').createCollection(collection, function(err, res) {
      if (err) reject(err);
      console.log("Collection " + collection + " created!");
      resolve(res)
    })
  })
}

function AddDataTable(client, col){
  return new Promise((resolve, reject) => {
    var tableCollection = []
    request({
      url: tableURL,
      json: true
    }, function (error, response, data){
      if (!error && response.statusCode === 200){
        data.children[0].standings.entries.forEach(element => {
          var table = {
            teamName: element.team.shortDisplayName,
            abbr: element.team.abbreviation,
            pos: element.stats[7].value,
            played: element.stats[3].value,
            goalsDefference: element.stats[8].value,
            points: element.stats[6].value
          }
          tableCollection.push(table)
        })
        client.db('SuperSunday').collection(col).insertMany(tableCollection, function(err, res) {
          if (err) throw err;
        })
        resolve(data)
      }
      else{
        reject(error)
      }
    })
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
        rej()
      }
    })
  })
}

function GetSchedule(day, client, col) {
  return new Promise(async(resolve, reject) => {
    for(let i = 0; i < day.length; i++){
      await new Promise((resolv, rejec) => {
        request({
          url: 'http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?lang=en&region=gb&calendartype=whitelist&limit=100&dates=' + day[i] + '&league=eng.1',
          json: true
        },async function (error, response, data){
          if (!error && response.statusCode === 200){
            await new Promise(async(resol, reje) => {
              for(let j = 0; j < data.events.length; j++){
                let d = ConvertDay.ConvertTimeZone(data.events[j].date)
                let date = new Date(d)
                var schedule ={
                  teamHome: data.events[j].competitions[0].competitors[0].team.shortDisplayName,
                  abbrTeamHome: data.events[j].competitions[0].competitors[0].team.abbreviation,
                  date: (date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear()),
                  time: (date.getMinutes() === 0) ? ((date.getHours() + ':' + date.getMinutes()) + '0') : ((date.getHours() + ':' + date.getMinutes())),
                  teamWay: data.events[j].competitions[0].competitors[1].team.shortDisplayName,
                  abbrTeamWay: data.events[j].competitions[0].competitors[1].team.abbreviation,
                  link: ''
                }
                await new Promise((reso, rej) => {
                  client.db('SuperSunday').collection(col).insertOne(schedule, function(err, res) {
                    if (err){
                      throw(err)
                      rej(err)
                    }
                    reso()
                  })
                })
                if(j + 1 == data.events.length){
                  resol()
                }
              }
            })
            resolv()
          }
        })
      })
      if(i + 1 == day.length){
        resolve()
      }
    }
  })
}

function AddDataReplay(client, col) {
  return new Promise((resolve, reject) => {
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
        client.db('SuperSunday').collection(col).insertMany(replayCollection, function(err, res) {
          if (err) throw err;
          resolve()
        })
      }
      else{
        reject()
      }
    })
  })
}

function AddDataSchedule(client, col) {
  return new Promise(async(res, rej) => {
    var day = []
    await GetDay(day)
    await GetSchedule(day, client, col)
    res()
  })
}

module.exports = {
  run : async () => {
    await ConnectionDatabase.create().then( async(client) => {
      await CreateCollection(client, 'User')
      await CreateCollection(client, 'Team')
      await CreateCollection(client, 'Table')
      await CreateCollection(client, 'Schedule')
      await CreateCollection(client, 'Replay')
      console.log('Inserting data... Please watting!')
      //await AddDataTable(client, 'Table')
      //await AddDataSchedule(client, 'Schedule')
      //await AddDataReplay(client, 'Replay')
      client.close();
      console.log('Data inserted!')
    }).catch((e) => {
      console.log(e)
    })
  }
}