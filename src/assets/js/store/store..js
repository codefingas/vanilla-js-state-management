import PubSub from "../lib/pubsub";

export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {};
    self.mututations = {};
    self.state = {};
    self.status = "resting";
    self.events = new PubSub();
    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mututations = params.mututations;
    }

    self.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        state[key] = value;
        console.log(`state change ${key} : ${value}`);
        self.events.publish("stateChange", self.state);

        if (self.status !== mutation) {
          console.log(`you should use a mutuation to set ${key}`);
        }

        self.status = "resting";

        return true;
      },
    });
  }
}

function dispatch(actionKey, payLoad) {
  let self = this;

  if (typeof self.actions[actionKey] !== "function") {
    console.groupCollapsed(`Action ${actionKey} does not exist`);
    return false;
  }

  console.groupCollapsed(`ACTION ${actionKey}`);

  self.status = "action";

  self.actions[actionKey](self, payLoad);

  console.groupEnd();

  return true;
};

function commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutation[mututationKey] !== 'function') {
        console.groupCollapsed(`Mutation ${mutationKey} does not exist`);
        return false;
    }

    self.status = 'mutation';
    let newState = self.mutation[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
    return true;
}