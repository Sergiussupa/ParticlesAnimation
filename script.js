(function(){
 
  var canvas = document.createElement(`canvas`),
  ctx = canvas.getContext(`2d`),
  w = canvas.width = innerWidth,
  h = canvas.height = innerHeight,
  particeles = [],
  properties = {
      bgColor         : `rgba( 17, 17, 19, 1)`,
      particleColor   : `rgba(255, 40, 40, 1)`,
      particeleRadius : 3,
      particleCount   : 60,
      particeleMaxVelocity : 0.5,
      lineLength      : 150,
      particleLife    : 6,
  };
  document.querySelector(`body`).appendChild(canvas);

  window.onresize = function() {     
  w = canvas.width = innerWidth,
  h = canvas.height = innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * w,
      this.y = Math.random() * h;
      this.velocitytyX = Math.random() * (properties.particeleMaxVelocity * 2) - properties.particeleMaxVelocity;
      this.velocitytyY = Math.random() * (properties.particeleMaxVelocity * 2) - properties.particeleMaxVelocity;
      this.life        = Math.random() * properties.particleLife * 60;
    }
    position() {
      this.x + this.velocitytyX > w && this.velocitytyX > 0 || this.x + this.velocitytyX < 0 && this.velocitytyX < 0 ? this.velocitytyX *= -1 : this.velocitytyX;
      this.y + this.velocitytyY > h && this.velocitytyY > 0 || this.y + this.velocitytyY < 0 && this.velocitytyY < 0 ? this.velocitytyY *= -1 : this.velocitytyY;
      this.x += this.velocitytyX;
      this.y += this.velocitytyY;
    };
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particeleRadius, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife() {
      if (this.life < 1) {
        this.x = Math.random() * w,
        this.y = Math.random() * h;
        this.velocitytyX = Math.random() * (properties.particeleMaxVelocity * 2) - properties.particeleMaxVelocity;
        this.velocitytyY = Math.random() * (properties.particeleMaxVelocity * 2) - properties.particeleMaxVelocity;
        this.life        = Math.random() * properties.particleLife * 60;
      };
      this.life--;
    }
  }


  function reDrawBackground() {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
  }

  function drawLines() {
    var x1, y1, x2, y2, length, opacity;
    for (var i in particeles) {
      for (var j in particeles) {
           x1 = particeles[i].x; 
           y1 = particeles[i].y; 
           x2 = particeles[j].x; 
           y2 = particeles[j].y; 
           length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
           if (length < properties.lineLength) {
              opacity = 1 - length / properties.lineLength;
              ctx.lineWidth = `0.5`;
              ctx.strokeStyle = `rgba(255, 40, 40, `+opacity+`)`;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.closePath();
              ctx.stroke();
           }
      }
    }
  }

  function reDrawParticles() {
    for (var i in particeles) {
        particeles[i].reCalculateLife();
        particeles[i].position();
        particeles[i].reDraw();
    }
  }

  function loop() {
      reDrawBackground();
      reDrawParticles();
      drawLines();
      requestAnimationFrame(loop);
  }

  function init() {
      for (var i = 0; i < properties.particleCount; i++) {
        particeles.push(new Particle);
      }
    loop();
  }

  init();
})();