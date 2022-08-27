const metroStops = require('./src/json/metro-haltepunkte-cleaned.json');
const metroLines = require('./src/json/metro-lines.json');

const jsonRes = require('./src/json/fetch-response.json');

//console.log(metroLines[0]);
//console.log(metroStops[0]);

jsonRes.data.monitors.map(monitor => console.log(monitor.lines));