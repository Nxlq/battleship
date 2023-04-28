const Ship = (length) => {
  const isSunk = false;
  let hitCount = 0;

  function hit() {
    hitCount += 1;
    return hitCount;
  }

  function getHitCount() {
    console.log(hitCount);
    return hitCount;
  }

  function checkIfSunk() {
    const remainingShipHp = length - hitCount;
    return remainingShipHp <= 0;
  }
  return {
    length,
    isSunk,
    hit,
    getHitCount,
    checkIfSunk,
  };
};

export default Ship;
