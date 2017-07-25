const keys = require('./app/keys');



// keys.getLocationArray().then(res => console.log(keys.keysArr))
keys.getLocationData().then(res => console.log(Object.keys(res)))
