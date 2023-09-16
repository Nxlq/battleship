import GameboardFactory from "./gameboard-factory";

const newComputer = () => {
  const gameboard = GameboardFactory();

  function AttackQueueFactory() {
    let queue = [];

    let foundShipCoords;
    let lastDirectionChecked;
    let hasFoundDirection = false;
    let shipEndsFound = 0;

    const addToQueue = (coords) => {
      queue.push(coords);
    };

    const dequeue = () => {
      const shifted = queue.shift();
      lastDirectionChecked = shifted.direction;
      console.log(shifted.coords);
      console.log(lastDirectionChecked);
      return shifted.coords;
    };

    const emptyQueue = () => {
      queue = [];
    };

    const logQueue = () => {
      console.log({ queue });
    };

    const incrementEndsFound = () => {
      shipEndsFound += 1;
    };

    const logEnds = () => {
      console.log(shipEndsFound);
    };

    const queueSearchCoords = (
      coords,
      enemyBoardsMissedAttacks,
      enemyBoardsHitAttacks
    ) => {
      const directions = {
        left: [0, -1],
        up: [-1, 0],
        right: [0, 1],
        down: [1, 0],
      };

      Object.entries(directions).forEach((direction) => {
        const [curDir, dirCoords] = direction;
        const curCoords = coords.split(",").map((str) => +str);

        const nextAttackInfo = {
          direction: curDir,
          coords: [curCoords[0] + dirCoords[0], curCoords[1] + dirCoords[1]],
        };

        // if the coord has already been attacked before then return
        if (
          enemyBoardsMissedAttacks.includes(nextAttackInfo.coords.toString()) ||
          enemyBoardsHitAttacks.includes(nextAttackInfo.coords.toString()) ||
          nextAttackInfo.coords[0] < 0 ||
          nextAttackInfo.coords[0] > 9 ||
          nextAttackInfo.coords[1] < 0 ||
          nextAttackInfo.coords[1] > 9
        ) {
          return;
        }

        addToQueue(nextAttackInfo);
      });

      const queuedDirections = [];
      queue.forEach((attack) => queuedDirections.push(attack.direction));

      if (
        !queuedDirections.includes("left") &&
        !queuedDirections.includes("up") &&
        shipEndsFound === 0
      ) {
        incrementEndsFound();
      }

      if (
        !queuedDirections.includes("right") &&
        !queuedDirections.includes("down") &&
        shipEndsFound === 0
      ) {
        incrementEndsFound();
      }
    };

    const queueHorizontalCoords = (
      coords,
      enemyBoardsMissedAttacks,
      enemyBoardsHitAttacks
    ) => {
      emptyQueue();

      const leftCoords = [coords[0], coords[1] - 1];
      const rightCoords = [coords[0], coords[1] + 1];
      // const isRightorLeftValid = true;

      const nextAttackInfo = {};

      if (
        leftCoords[1] < 0 ||
        rightCoords[1] > 9 ||
        enemyBoardsMissedAttacks.includes(leftCoords.toString()) ||
        enemyBoardsHitAttacks.includes(leftCoords.toString())
      ) {
        console.log("HERERERERERER");
        if (shipEndsFound === 0) incrementEndsFound();
        if (shipEndsFound === 2) return;
      }
      // if left square is valid then queue left square
      if (
        !enemyBoardsMissedAttacks.includes(leftCoords.toString()) &&
        !enemyBoardsHitAttacks.includes(leftCoords.toString()) &&
        leftCoords[1] >= 0 &&
        shipEndsFound === 0
      ) {
        console.log(`LEFT SQUARE IS OPEN SO LETS ATTACK IT`);
        nextAttackInfo.direction = "left";
        nextAttackInfo.coords = leftCoords;
      } else if (
        // if left square is invalid then queue right square instead if right square is valid
        !enemyBoardsMissedAttacks.includes(rightCoords.toString()) &&
        !enemyBoardsHitAttacks.includes(rightCoords.toString()) &&
        rightCoords[1] <= 9
      ) {
        console.log(`LEFT IS NOT OPEN BUT RIGHT SQUARE IS, SO LETS ATTACK IT`);
        nextAttackInfo.direction = "right";
        nextAttackInfo.coords = rightCoords;
      } else if (shipEndsFound === 1) {
        console.log(`APPARENTLY ONE END WAS FOUND ?`);
        console.log(
          `NEITHER LEFT OR RIGHT WAS OPEN SO LETS SEARCH TO THE RIGHT OF THE FIRST SHIP SQUARE HIT (IF VALID)`
        );
        nextAttackInfo.direction = "right";
        nextAttackInfo.coords = [foundShipCoords[0], foundShipCoords[1] + 1];
        if (
          nextAttackInfo.coords[1] > 9 ||
          enemyBoardsMissedAttacks.includes(nextAttackInfo.coords) ||
          enemyBoardsHitAttacks.includes(nextAttackInfo.coords)
        ) {
          console.log(
            `COORDS RIGHT FROM THE ORIGINAL WERE INVALID SO JUST RETURN AND DONT ADD TO THE QUEUE SO THE NEXT ATTACK CAN BE RANDOM AGAIN`
          );
          return;
        }
      }
      console.log({ shipEndsFound });

      addToQueue(nextAttackInfo);

      // foundShipCoords = nextAttackInfo.coords;
    };

    // const queueHorizontalCoords = (
    //   coords,
    //   enemyBoardsMissedAttacks,
    //   enemyBoardsHitAttacks
    // ) => {
    //   emptyQueue();
    //   const directions = {
    //     left: [0, -1],
    //     right: [0, 1],
    //   };

    //   // if the left ship end has been found then add the coords to pursue the right end
    //   if (shipEndsFound === 1) {
    //     const nextAttackInfo = {
    //       direction: "right",
    //       coords: [foundShipCoords[0], foundShipCoords[1] + 1],
    //     };

    //     addToQueue(nextAttackInfo);
    //     foundShipCoords = nextAttackInfo.coords;
    //     return;
    //   }

    //   Object.entries(directions).forEach((direction) => {
    //     const [curDir, dirCoords] = direction;
    //     // const curCoords = coords.split(",").map((str) => +str);

    //     const nextAttackInfo = {
    //       direction: curDir,
    //       coords: [coords[0] + dirCoords[0], coords[1] + dirCoords[1]],
    //     };

    //     // if the coord has already been attacked before then return
    //     if (
    //       enemyBoardsMissedAttacks.includes(nextAttackInfo.coords.toString()) ||
    //       enemyBoardsHitAttacks.includes(nextAttackInfo.coords.toString()) ||
    //       nextAttackInfo.coords[0] < 0 ||
    //       nextAttackInfo.coords[0] > 9 ||
    //       nextAttackInfo.coords[1] < 0 ||
    //       nextAttackInfo.coords[1] > 9
    //     ) {
    //       if (shipEndsFound === 0 && nextAttackInfo.coords[1] < coords[1]) {
    //         incrementEndsFound();
    //         nextAttackInfo.direction = "right";
    //         nextAttackInfo.coords = [
    //           foundShipCoords[0],
    //           foundShipCoords[1] + 1,
    //         ];
    //         addToQueue(nextAttackInfo);
    //         foundShipCoords = nextAttackInfo.coords;
    //       }

    //       return;
    //     }
    //     foundShipCoords = nextAttackInfo.coords;
    //     addToQueue(nextAttackInfo);
    //   });
    // };

    const queueVerticalCoords = (
      coords,
      enemyBoardsMissedAttacks,
      enemyBoardsHitAttacks
    ) => {
      emptyQueue();
      const directions = {
        up: [-1, 0],
        down: [1, 0],
      };

      // if the top ship end has been found then add the coords to pursue the bottom end
      if (shipEndsFound === 1) {
        const nextAttackInfo = {
          direction: "down",
          coords: [foundShipCoords[0] + 1, foundShipCoords[1]],
        };

        addToQueue(nextAttackInfo);
        return;
      }

      // if (shipEndsFound === 2) {
      //   console.log("END 2 FOUND");
      // }

      Object.entries(directions).forEach((direction) => {
        const [curDir, dirCoords] = direction;
        // const curCoords = coords.split(",").map((str) => +str);

        const nextAttackInfo = {
          direction: curDir,
          coords: [coords[0] + dirCoords[0], coords[1] + dirCoords[1]],
        };

        // if the coord has already been attacked before or is off the board then return
        if (
          enemyBoardsMissedAttacks.includes(nextAttackInfo.coords.toString()) ||
          enemyBoardsHitAttacks.includes(nextAttackInfo.coords.toString()) ||
          nextAttackInfo.coords[0] < 0 ||
          nextAttackInfo.coords[0] > 9 ||
          nextAttackInfo.coords[1] < 0 ||
          nextAttackInfo.coords[1] > 9
        ) {
          return;
        }

        addToQueue(nextAttackInfo);
      });
    };

    const populateQueue = (
      coords,
      enemyBoardsMissedAttacks,
      enemyBoardsHitAttacks,
      perceivedShipDir = null
    ) => {
      if (!perceivedShipDir) {
        queueSearchCoords(
          coords,
          enemyBoardsMissedAttacks,
          enemyBoardsHitAttacks
        );
        hasFoundDirection = false;
      }
      if (perceivedShipDir === "left" || perceivedShipDir === "right") {
        queueHorizontalCoords(
          coords,
          enemyBoardsMissedAttacks,
          enemyBoardsHitAttacks
        );
        hasFoundDirection = true;
      }
      if (perceivedShipDir === "up" || perceivedShipDir === "down") {
        queueVerticalCoords(
          coords,
          enemyBoardsMissedAttacks,
          enemyBoardsHitAttacks
        );
        hasFoundDirection = true;
      }
    };

    const setFoundShipCoords = (coords) => {
      if (typeof coords === "string") {
        foundShipCoords = coords.split(",").map((str) => +str);
        return;
      }

      foundShipCoords = coords;
    };

    const getLastDirectionChecked = () => lastDirectionChecked;

    const sethasFoundDirectionToTrue = () => {
      hasFoundDirection = true;
    };

    const sethasFoundDirectionToFalse = () => {
      hasFoundDirection = false;
    };

    const gethasFoundDirection = () => hasFoundDirection;

    const getQueueLength = () => queue.length;

    const log = () => {
      console.log(hasFoundDirection);
    };

    const resetEndsFound = () => {
      shipEndsFound = 0;
    };

    const getEndsFound = () => shipEndsFound;

    return {
      populateQueue,
      dequeue,
      logQueue,
      emptyQueue,
      getLastDirectionChecked,
      getQueueLength,
      sethasFoundDirectionToTrue,
      sethasFoundDirectionToFalse,
      gethasFoundDirection,
      log,
      logEnds,
      setFoundShipCoords,
      incrementEndsFound,
      resetEndsFound,
      getEndsFound,
    };
  }
  // attackQueue is used to make the ai search for consecutive ship hits when landing on one
  const attackQueue = AttackQueueFactory();

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateRandomDirection() {
    const number = generateRandomNumber(0, 1);
    return number === 0 ? "h" : "v";
  }

  function generateCoordsForShipPlacement() {
    const coords = [generateRandomNumber(0, 9), generateRandomNumber(0, 9)];
    return coords;
  }

  function generateValidAttackCoords(
    enemyBoardsMissedAttacks,
    enemyBoardsHitAttacks
  ) {
    let coords = generateCoordsForShipPlacement().toString();

    // if the coords arent valid then generate new ones
    while (
      enemyBoardsMissedAttacks.includes(coords) ||
      enemyBoardsHitAttacks.includes(coords)
    ) {
      coords = generateCoordsForShipPlacement().toString();
    }

    // returns coords as a string
    return coords;
  }

  function placeShipsRandomly() {
    const placements = {
      carrier: generateRandomDirection(),
      battleship: generateRandomDirection(),
      cruiser: generateRandomDirection(),
      submarine: generateRandomDirection(),
      destroyer: generateRandomDirection(),
    };

    // loop over placements obj and call setShip on each ship until all ships have been placed
    Object.entries(placements).forEach((entry) => {
      const [ship, direction] = entry;

      // attempt to set the ship on the board
      let hasShipBeenPlaced = gameboard.setShip(
        generateCoordsForShipPlacement(),
        ship,
        direction
      );
      // if the attempt was given invalid coords, keep attempting with new coords until it has been placed
      while (!hasShipBeenPlaced) {
        hasShipBeenPlaced = gameboard.setShip(
          generateCoordsForShipPlacement(),
          ship,
          direction
        );
      }
    });
  }

  function playComputerTurn(
    enemyBoardsRecieveAttack,
    enemyBoardsMissedAttacks,
    enemyBoardsHitAttacks
  ) {
    let isUsingQueueCoords = false;
    let coords;

    // set coords value depending on if there is an attack queue waiting or not
    if (attackQueue.getQueueLength() !== 0) {
      coords = attackQueue.dequeue();
      isUsingQueueCoords = true;
    } else {
      coords = generateValidAttackCoords(
        enemyBoardsMissedAttacks,
        enemyBoardsHitAttacks
      );
      attackQueue.resetEndsFound();
    }

    const atkResult = enemyBoardsRecieveAttack(coords);
    console.log({ atkResult });

    // if the atkResult comes from random generation and lands on a ship
    if (atkResult !== "water" && !isUsingQueueCoords) {
      console.log(
        coords,
        "TURN PLAYED FROM RANDOMLY GENERATED COORDS SHOULD POPULATE SEARCH COORDS"
      );

      attackQueue.populateQueue(
        coords,
        enemyBoardsMissedAttacks,
        enemyBoardsHitAttacks
      );

      attackQueue.setFoundShipCoords(coords);
    } else if (atkResult !== "water" && isUsingQueueCoords) {
      // if the perceived ship direciton is found using the search coords use this block
      console.log(
        coords,
        "FOUND SEARCH DIRECTION SHOULD QUEUE COORDS TO PURSUE HORIZONTAL OR VERTICAL "
      );
      attackQueue.populateQueue(
        coords,
        enemyBoardsMissedAttacks,
        enemyBoardsHitAttacks,
        attackQueue.getLastDirectionChecked()
      );
    } else if (
      atkResult === "water" &&
      isUsingQueueCoords &&
      attackQueue.gethasFoundDirection() === true
    ) {
      // IF WE FIND ONE END OF THE SHIP ALONG THE PERCEIVED DIRECTION THEN INCREMENT THE SHIP END COUNT AND ATTEMPT QUEUE POPULATION AGAIN
      console.log(
        "WHILE USING THE PERCIEVED DIRECTIONAL COORDS WE FOUND ONE END OF THE SHIP SO LETS QUEUE COORDS TO HUNT THE RIGHT SIDE IF NEEDED, AND IF NOT THEN SHIP ENDS FOUND SHOULD BE 2 AND GO BACK TO RANDOm MODE"
      );
      attackQueue.incrementEndsFound();

      attackQueue.populateQueue(
        coords,
        enemyBoardsMissedAttacks,
        enemyBoardsHitAttacks,
        attackQueue.getLastDirectionChecked()
      );
    }

    attackQueue.logQueue();
    return { atkResult, coords };
  }

  return { gameboard, placeShipsRandomly, playComputerTurn, attackQueue };
};

export default newComputer;

// if (
//   atkResult === "water" &&
//   isUsingQueueCoords &&
//   attackQueue.gethasFoundDirection() === true &&
//   attackQueue.getEndsFound() === 2
// ) {
//   attackQueue.emptyQueue();
// } else if (
//   // if the queue coords is pursuing the perceived direction but hits water on one side of the ship, repopulate the queue to pursue the opposite side
//   atkResult === "water" &&
//   isUsingQueueCoords &&
//   attackQueue.gethasFoundDirection() === true
// ) {
//   attackQueue.incrementEndsFound();
//   if (attackQueue.getEndsFound() === 2) {
//     console.log(`SHOULD CHANGE TO RANDOM HUNT MODE`);
//     attackQueue.resetEndsFound();
//     attackQueue.sethasFoundDirectionToFalse();
//     attackQueue.emptyQueue();

//     return { atkResult, coords };
//   }
//   attackQueue.populateQueue(
//     coords,
//     enemyBoardsMissedAttacks,
//     enemyBoardsHitAttacks,
//     attackQueue.getLastDirectionChecked()
//   );
//   console.log("TURN PLAYED: SEARCHING FOR THE OPPOSITE END OF THE SHIP ");
//   attackQueue.log();
// } else if (atkResult !== "water" && isUsingQueueCoords) {
//   console.log(
//     "TURN PLAYED: LAST ATTACK LANDING ON A SHIP AND IS USING THE QUEUE TO SEARCH FOR ONE END OF THE SHIP"
//   );
//   // if the queue coords find the perceived ship direction then repopulate the queue with either horizontal or vertical coords
//   attackQueue.sethasFoundDirectionToTrue();

//   attackQueue.populateQueue(
//     coords,
//     enemyBoardsMissedAttacks,
//     enemyBoardsHitAttacks,
//     attackQueue.getLastDirectionChecked()
//   );
//   // attackQueue.logQueue();
// }

// attackQueue.logEnds();
// attackQueue.logQueue();
