const EventEmitter = require('events');
const fetch = require('node-fetch');

const Logger = require('./logger');
const logger = new Logger();

logger.on('messagelogged', (arg) => {
    console.log('Listener called', arg);
});

logger.log('message');

// fetch('https://github.com/')
//     .then(res => res.text())
//     .then(body => console.log(body));

// fetch('https://api.github.com/users/github')
//     .then(res => res.json())
//     .then(json => console.log(json));

fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json));