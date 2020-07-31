export default class PubSub {
    constructor() {
        this.events = {};
    }
};

function Subscribe(event, callback) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
        self.events[event] = [];
    }

    return self.events[event].push(callback);
};


function Publish(event, data ={}) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
        self.events[event] = [];
    };

    return self.events[event].map(callback => callback(data));
};