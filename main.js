class Galaxy {
    constructor() {
        this.canvas; 
        this.ctx;
        this.canvas_height = window.innerHeight;
        this.canvas_width =  window.innerWidth;
        this.num_col = 1000;
        this.num_row = 1000;

        this.num_star = 5000;
        this.star_array = [];
        this.star_length = 10;
        this.star_speed = 30;

        this.mouse = {
            down: false,
            x: 0,
            y: 0
        }

        this.init();
    }

    init () {
        this.canvas = document.getElementById("c");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1;

        for (var i = 0; i < this.num_star; i++) {
            var star = new Star(Math.random() * this.canvas_width, Math.random() * this.canvas_height);
            this.star_array.push(star);
        }

        document.addEventListener("mousedown", this.mousedown_handler.bind(this));
        document.addEventListener("mouseup", this.mouseup_handler.bind(this));
        document.addEventListener("mousemove", this.mousemove_handler.bind(this));

        this.draw();
    }

    draw () {
        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        var random = function () { return Math.random() * 2 - 1 };

        for (let i = 0; i < this.star_array.length; i++) {
            this.ctx.beginPath();
            var star = this.star_array[i];
            this.ctx.strokeStyle = star.color;

            if (star.x > this.canvas_width || star.x < 0 || star.y > this.canvas_height || star.y < 0) {
               star.x = Math.random() * this.canvas_width;
               star.y = Math.random() * this.canvas_height;
            } else {
                if (!this.mouse.down) {
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(star.x + random(), star.y + random());
                } else {
                    var xdelta = star.x - this.mouse.x;
                    var ydelta = star.y - this.mouse.y;

                    this.ctx.moveTo(star.x, star.y);
                    star.x = star.x + xdelta / this.star_speed;
                    star.y = star.y + ydelta / this.star_speed;
                    this.ctx.lineTo(star.x + xdelta / this.star_length, star.y + ydelta / this.star_length);
                }
            }
            this.ctx.stroke();
        }   

        requestAnimationFrame(this.draw.bind(this));
    }

    mousedown_handler() {
        this.mouse.down = true;
    }

    mouseup_handler() {
        this.mouse.down = false;
    }

    mousemove_handler(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}

class Star {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color =  this.getRndColor();
    }

     // thanks to https://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas
    getRndColor() {
        var r = 255*Math.random()|0,
            g = 255*Math.random()|0,
            b = 255*Math.random()|0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

window.onload = function() {
    var galaxy = new Galaxy();
}