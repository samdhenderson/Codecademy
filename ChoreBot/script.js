const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let numClosedDoors = 3;
let currentlyPlaying = true;
let openDoor1;
let openDoor2;
let openDoor3;
let doorAssignments;

const changeDoor = (doorNum, path) => {
  doorNum.src = path;
  playDoor(doorNum);
};

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * 3);

  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    if (Math.floor(Math.random()*2)===0) {
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    } else {
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
    }
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
      if (Math.floor(Math.random()*2)===0) {
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
      } else {
        openDoor1 = spaceDoorPath;
        openDoor3 = beachDoorPath;
      }
  } else {
    openDoor3 = botDoorPath;
    if (Math.floor(Math.random()*2)===0) {
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
    } else {
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
    }
  }
  return [openDoor1, openDoor2, openDoor3];
};

const playDoor = (door) => {
  numClosedDoors--;

  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver()
  }
};

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play Again?';
  } else {
    startButton.innerHTML = 'Game over! Play Again?';
  }
  currentlyPlaying = false;
};

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  doorAssignments = randomChoreDoorGenerator()
  currentlyPlaying = true;
}

doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
    changeDoor(doorImage1, doorAssignments[0]);
  }
};

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
    changeDoor(doorImage2, doorAssignments[1]);
  }
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
    changeDoor(doorImage3, doorAssignments[2]);
  } 
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

startRound();