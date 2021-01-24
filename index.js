const renderSpiral = maxLength => {
  const getInitialPoint = () => {
    return {
      x: 0,
      y: 0,
    };
  };

  const getModifier = direction => {
    switch (direction) {
      case 0: {
        return {
          x: 0,
          y: 1,
        };
      }
      case 1: {
        return {
          x: 1,
          y: 0,
        };
      }
      case 2: {
        return {
          x: 0,
          y: -1,
        };
      }
      case 3: {
        return {
          x: -1,
          y: 0,
        };
      }
      default: {
        throw new Error('Choose right direction!');
      }
    }
  };

  const getNextPoint = (point, modifier) => {
    return {
      x: point.x + modifier.x,
      y: point.y + modifier.y,
    };
  };

  const getPreviousPoint = (point, modifier) => {
    return {
      x: point.x - modifier.x,
      y: point.y - modifier.y,
    };
  };

  const getNewDirection = direction => {
    return direction === 3 ? 0 : direction + 1;
  };

  const getSpiral = maxLength => {
    const spiral = [];

    for(let i = 0; i < maxLength; i++) {
      spiral.push(Array(maxLength).fill(' '));
    }

    let direction = 0;
    let lineLength = maxLength;
    let point = getInitialPoint();
    let modifier = getModifier(direction);

    while (lineLength >= 1) {
      let currentLineLength = 0;

      while (currentLineLength < lineLength) {
        const { x, y } = point;

        spiral[x][y] = '*';
        point = getNextPoint(point, modifier);
        currentLineLength++;
      }

      const previousPoint = getPreviousPoint(point, modifier);

      direction = getNewDirection(direction);
      modifier = getModifier(direction);
      point = getNextPoint(previousPoint, modifier);

      lineLength--;
    }

    return spiral;
  };

  const printSpiral = spiral => {
    spiral.forEach(row => console.log(row.join(' ')));
  };

  const spiral = getSpiral(maxLength);

  printSpiral(spiral);
};

renderSpiral(15);
