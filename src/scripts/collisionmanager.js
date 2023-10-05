export class CollisionManager {
  static checkCollision(object1, object2) {
    return (
      this.isLeftOf(object1, object2) &&
      this.isRightOf(object1, object2) &&
      this.isAbove(object1, object2) &&
      this.isBelow(object1, object2)
    );
  }

  isLeftOf(object1, object2) {
    // Horizontal Axis Check
    // Check if the left side of rect1 is to the left of
    // the right side of rect2.
    return object1.x < object2.x + object2.width;
  }

  isRightOf(object1, object2) {
    // Horizontal Axis Check
    // Check if the right side of rect1 is to the right of
    // the left side of rect2.
    return object1.x + object1.width > object2.x;
  }

  isAbove(object1, object2) {
    // Vertical Axis Check
    // Check if the top side of rect1 is above the bottom
    // side of rect2.
    return object1.y < object2.y + object2.height;
  }

  isBelow(object1, object2) {
    // Vertical Axis Check
    // Check if the bottom side of rect1 is below the top
    // side of rect2.
    return object1.y + object1.height > object2.y;
  }
}
