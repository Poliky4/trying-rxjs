import { interval, BehaviorSubject } from "rxjs";
import { map, mapTo, tap, share } from "rxjs/operators";

import { ACTIONS, poll, addActionListener } from "./input";

const random = chance => Math.random() <= chance;
const fiftyfifty = () => random(0.5);

const data = {
  player: {
    x: 50,
    y: 50,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    vmax: 4,
    acceleration: 3,
    deceleration: 2,
    jumpSpeed: 40,
    jumpTime: 100,
    fallSpeed: 40/3,
    width: 5,
    height: 5,
  },
  ground: {
    x: 0,
    y: (100 - 20),
    width: 100,
    height: 20,
  },
  map: {
    width: 100,
    height: 100,
  },
};

const { player } = data;
addActionListener(
  ACTIONS.JUMP,
  () => {
    player.vz = player.jumpSpeed;
    setTimeout(() => {
      player.vz = 0;
    }, player.jumpTime);
  }
);

const clamp = ({min, max, num}) => Math.max(min, Math.min(num, max))
const movePlayer = () => {
  const { player } = data;
  player.x += player.vx;
  player.y += player.vy;
  player.z += player.vz;
};
const applyGravity = () => {
  const { player, ground } = data;
  const { y, fallSpeed } = player;
  const { y: gy } = ground;
  if(y < gy)
    if(y + fallSpeed > gy)
	player.y = gy;
    else
      player.y += fallSpeed;
}
/*
const applyGravity = () => {
  const { player } = data;
  const { z, fallSpeed } = player;
  if(z > 0)
    if(z - fallSpeed < 0)
	player.z = 0;
    else
      player.z -= fallSpeed;
}
*/
const applyFriction = () => {
  const { player } = data;
  const { vx, vy, deceleration } = player;
  // TODO: make this readable
  if (vx > 0) { // going right
    if(vx - deceleration < 0) player.vx = 0;
    else player.vx -= deceleration;
  } else if (vx < 0) { // going left
    if(vx + deceleration > 0) player.vx = 0;
    else player.vx += deceleration;
  }
  if (vy > 0) { // going up
    if(vy - deceleration < 0) player.vy = 0;
    else player.vy -= deceleration;
  } else if (vy < 0) { // going down
    if(vy + deceleration > 0) player.vy = 0;
    else player.vy += deceleration;
  }
};
const setPlayerSpeed = () => {
  const { player } = data;
  if(poll(ACTIONS.FORWARD)) {
    player.vy -= player.acceleration;
  } else if(poll(ACTIONS.BACK)) {
    player.vy += player.acceleration;
  }
  if(poll(ACTIONS.LEFT)) {
    player.vx -= player.acceleration;
  } else if(poll(ACTIONS.RIGHT)) {
    player.vx += player.acceleration;
  }
};
const keepPlayerMaxSpeed = () => {
  const { player } = data;
  const { vx, vy, vmax } = player;
  player.vx = clamp({
    min: vmax * - 1,
    num: vx,
    max: vmax,
  });
  player.vy = clamp({
    min: vmax * - 1,
    num: vy,
    max: vmax,
  });
};
const keepPlayerInMap = () => {
  const { player, map } = data;
  const { x, y } = player;
  const halfPlayer = player.width / 4;

  player.x = clamp({
    min: 0 + halfPlayer,
    num: x,
    max: map.width - halfPlayer,
  });
  player.y = clamp({
    min: 0 + halfPlayer,
    num: y,
    max: map.height - halfPlayer,
  });
}

const gameFrequency = 1000/60;
const gameloopStream = interval(gameFrequency).pipe(
  tap(applyFriction),
  tap(applyGravity),
  tap(setPlayerSpeed),
  tap(keepPlayerMaxSpeed),
  tap(movePlayer),
  tap(keepPlayerInMap),
  share(),
);
gameloopStream.subscribe();

const gameState = new BehaviorSubject();
gameloopStream.pipe(
  mapTo(data),
).subscribe(gameState)
export function getGameState() {
  return gameState.getValue();  
}

export function gameloop(cb) {
  gameloopStream.subscribe(() => cb(data));
}

