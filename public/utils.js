const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return x*16 + "," + y*16
    },
    nextPosition(x, y, direction) {
        let newX = x;
        let newY = y;
        const size = 16;
        if (direction === "left") {
            newX -= size;
        } else if (direction === "right") {
            newX += size;
        } else if (direction === "up") {
            newY -= size;
        } else if (direction === "down") {
            newY += size;
        }
        return {newX, newY};
    }
}