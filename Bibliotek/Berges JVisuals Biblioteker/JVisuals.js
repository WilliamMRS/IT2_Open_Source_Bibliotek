//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
// Copyright __________ © 2017
// v_0.2 - Eksamensversjon 280517
//
//  Library JVisuals
//
// See documentation for further information.
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

function JVisuals() {
  this.canvas = "",
  this.ctx = "",
  this.width = 0,
  this.height = 0,
  this.origo = [0,0],
  this.scale = 1,
  this.grid = true,

  this.init =
  function(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width;
    this.height = canvas.height;

    if (this.grid) this.gridF();
  },

  this.translate =
  function(input) {
    if (this.width < this.height) {
      return (1/this.scale)*input*this.width;
    }
    else {
      return (1/this.scale)*input*this.height;
    }
  },

  this.x =
  function(x) {
    if (this.width > this.height) {
      return (this.translate(x) + this.height*this.origo[0]);
    }
    else {
      return (this.translate(x) + this.width*this.origo[0]);
    }
  },

  this.y =
  function(y) {
    if (this.width > this.height) {
      return (this.height - this.translate(y) - this.height*this.origo[1]);
    }
    else {
      return (this.height - this.translate(y) - this.height*this.origo[1]);
    }
  },

  this.reset =
  function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.grid) this.gridF();
  },

  this.gridF =
  function() {
    var vX = 0;
    var vY = 0;
    if (this.width > this.height) {
      vX = (this.width/this.height)*(10*this.scale)
      vY = this.scale*10;
    }
    else {
      vX = this.scale*10;
      vY = (this.width/this.height)*(10*this.scale)
    }
    for (var i = 0; i < vX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width/vX*i, 0);
      this.ctx.lineTo(this.width/vX*i, this.height);
      this.ctx.strokeStyle = "#ccc"
      this.ctx.stroke();

      this.ctx.font = "10px Arial";
      this.ctx.strokeStyle = "#000"
      this.ctx.strokeText(""+ ((i - vY*this.origo[0])*1/10) + "",this.width/vX*i,this.y(0));
    }
    for (var i = 0; i < vY; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height/vY*i);
      this.ctx.lineTo(this.width, this.height/vY*i);
      this.ctx.strokeStyle = "#ccc"
      this.ctx.stroke();

      this.ctx.font = "10px Arial";
      this.ctx.strokeStyle = "#000"
      this.ctx.strokeText(""+ ((i - vY*this.origo[0])*-1/10) + "",this.x(0),this.height/vY*i);
    }
  },

  this.line =
  function(x,y,w,h,color) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x(x), this.y(y));
    this.ctx.lineTo(this.x(x+w), this.y(y+h));
    this.ctx.strokeStyle = color
    this.ctx.stroke();
  }

  this.rectangle =
  function(x,y,w,h,color,fill) {
    this.ctx.beginPath();
    this.ctx.rect(this.x(x),this.y(y),this.translate(w),this.translate(h));
    if (fill) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  },

  this.circle =
  function(x,y,r,t,p) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x(x),this.y(y))
    this.ctx.arc(this.x(x),this.y(y),this.translate(r),0,(p/100)*2*Math.PI)
    this.ctx.fill();
    this.ctx.stroke();
  }
}


function _rectangle() { //Rektangel-objekt
    this.JV = "NaN",
    this.pos = [0,0],
    this.size = [0,0],
    this.color = "#000",
    this.fill = false,

    this.init =
    function() {
    },

    this.draw =
    function() {
      this.JV.rectangle(this.pos[0],this.pos[1],this.size[0],this.size[1],this.color,this.fill);
    },

    this.move =
    function(pos,size) {
      this.pos = pos
      this.size = size
      this.draw()
    }
}

function _line() { //Linje-objekt
    this.JV = "NaN",
    this.pos = [0,0],
    this.size = [0,0],
    this.color = "#000",
    this.angle = 0,
    this.fill = false,

    this.init =
    function() {
    },

    this.draw =
    function() {
      this.JV.line(this.pos[0],this.pos[1],this.size[0],this.size[1],this.color);
    },

    this.move =
    function(pos,size) {
      this.pos = pos
      this.size = size
      this.draw()
    },

    this.rotate =
    function(speed) { //Funksjon som roterer linjen rundt startpunktet ved hjelp av trigonometri.

      this.angle += speed;
      var x = Math.cos(this.angle);
      var y = Math.sin(this.angle);

      this.size[0] = x / 4
      this.size[1] = y / 4

      blade.move(blade.pos, blade.size)
    }
}

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
// This is an example of how to use the new Library JVisuals
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

// var JV = new JVisuals();
//
// window.onload = function() {
//
//   JV.init(document.getElementById("canvas"));
//   JV.origo = [0.5,0.5];
//   JV.scale = 2;
//   JV.grid();
//
//   var obj = new _Object()
//   obj.init(JV)
//
//   JV.rectangle(0.1,0.5,0.25,0.2);
//   JV.line(0.0,0.0,0.9,0.9);
// }

// Example of how to create an object.

// function _Object() {
//     this.JV = "NaN",
//     this.x = 0,
//     this.y = 0,
//     this.color = "#000",
//
//     this.init =
//     function(JV) {
//       this.JV = JV;
//     },
//
//     this.draw =
//     function() {
//       //this.JV.circle(0.2,0.6,0.1,0,100)
//     },
//
//     this.move =
//     function() {
//     }
// }
