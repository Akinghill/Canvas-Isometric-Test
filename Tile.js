export class Tile extends Path2D {
  constructor(id, x, y, size, h, color, leftWall, rightWall, ctx) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.h = h;
    this.color = color;
    this.leftWall = leftWall;
    this.rightWall = rightWall;
    this.ctx = ctx;
  }

  draw = () => {
    const { id, x, y, size, h, color, leftWall, rightWall, ctx } = this;

    // Top wall
    this.moveTo(x, y - h);
    this.lineTo(x, y - h);
    this.lineTo(x - size, y - h - size * 0.5);
    this.lineTo(x - size + size, y - h - (size * 0.5 + size * 0.5));
    this.lineTo(x + size, y - h - size * 0.5);
    this.closePath();
    ctx.fillStyle = color;
    ctx.fill(this);
    ctx.stroke(this);

    // Left wall
    if (leftWall) {
      this.moveTo(x, y);
      this.lineTo(x - size, y - size * 0.5);
      this.lineTo(x - size, y - h - size * 0.5);
      this.lineTo(x, y - h * 1);
      this.closePath();
      ctx.fillStyle = color;
      ctx.fill(this);
      ctx.stroke(this);
    }

    // Right wall
    if (rightWall) {
      this.moveTo(x, y);
      this.lineTo(x + size, y - size * 0.5);
      this.lineTo(x + size, y - h - size * 0.5);
      this.lineTo(x, y - h * 1);
      this.closePath();
      ctx.fillStyle = color;
      ctx.fill(this);
      ctx.stroke(this);
    }
  };
}
