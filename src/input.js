import {
  fromEvent,
  BehaviorSubject,
  merge,
} from "rxjs";
import { 
  share,
  tap,
  mapTo,
  filter,
  distinctUntilChanged, 
} from "rxjs/operators";

const ACTIONS = {
  ESCAPE: "ESCAPE",
  CLICK: "CLICK",
  JUMP: "JUMP",
  FORWARD: "FORWARD",
  LEFT: "LEFT",
  BACK: "BACK",
  RIGHT: "RIGHT",
};
const STATES = {
  UP: "keyup",
  DOWN: "keydown",
  PRESS: "keypress",
};

function createStreamFromEvent(event, element = document) {
  return fromEvent(
      element,
      event,
    )
    .pipe(
      share(),
    );
}

const keyStreams = {
  [STATES.PRESS]: createStreamFromEvent("keypress"),
  [STATES.DOWN]: createStreamFromEvent("keydown").pipe(
    distinctUntilChanged(),
    // tap(() => console.log("KEYUP", Date.now()))
  ),
  [STATES.UP]: createStreamFromEvent("keyup"),
};
function createKeyListener(state, key) {
  if(!keyStreams[state]) throw Error("Key state not found", { state });
  return keyStreams[state].pipe(
    filter(e => e.key === key),
  );
}

function createPollStream(key) {
  const pollState = new BehaviorSubject();

  merge(
    createKeyListener(STATES.UP, key).pipe(
      mapTo(false),
    ),
    createKeyListener(STATES.DOWN, key).pipe(
      mapTo(true),
    ),
  ).pipe(
    distinctUntilChanged(),
  ).subscribe(pollState);

  return pollState;
}
const pollStates = {
  [ACTIONS.FORWARD]: createPollStream("w"),
  [ACTIONS.BACK]: createPollStream("s"),
  [ACTIONS.LEFT]: createPollStream("a"),
  [ACTIONS.RIGHT]: createPollStream("d"),
};
function poll(action) {
  if(!pollStates[action]) throw Error("No such poll action", action);
  // return a queue?
  // to prevent missed actions
  return pollStates[action].getValue();
}

// TODO: action creation function
const actions = {
  [ACTIONS.CLICK]: createStreamFromEvent("click"),

  [ACTIONS.ESCAPE]: createKeyListener(STATES.PRESS, "Escape"),

  [ACTIONS.JUMP]: createKeyListener(STATES.DOWN, " "),

  [ACTIONS.FORWARD]: createKeyListener(STATES.DOWN, "w"),
  [ACTIONS.LEFT]: createKeyListener(STATES.DOWN, "a"),
  [ACTIONS.BACK]: createKeyListener(STATES.DOWN, "s"),
  [ACTIONS.RIGHT]: createKeyListener(STATES.DOWN, "d"),
};

function addActionListener(action, cb) {
  if(!actions[action]) throw Error("Action not found.");
  const subscriptionStream = actions[action].subscribe(cb);
  return function unsubscribe() {
    subscriptionStream.unsubscribe();
  }; 
}

export {
  ACTIONS,
  STATES,
  poll,
  addActionListener,
};


