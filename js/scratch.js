function generateId(length) {
  var id = '';
  while (id.length < length) {
    var ch = Math.random()
      .toString(36)
      .substr(2, 1);
    if (Math.random() < 0.5) {
      ch = ch.toUpperCase();
    }
    id += ch;
  }
  return id;
}

console.log(generateId(10));


var randomizer = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  } 
  /* Period parameters */  
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */
  this.init_genrand(seed);
}  
 
/* initializes mt[N] with a seed */
randomizer.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
      var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
  + this.mti;
      this.mt[this.mti] >>>= 0;
  }
}

/* generates a random number on [0,0xffffffff]-interval */
randomizer.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
      this.init_genrand(5489); /* a default initial seed is used */

    for (kk=0;kk<this.N-this.M;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (;kk<this.N-1;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
}

/* generates a random number on [0,1)-real-interval */
randomizer.prototype.random = function() {
  return this.genrand_int32()*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on (0,1)-real-interval */
randomizer.prototype.randint = function(min, max) {
  let intval = 0;
  if(min == undefined) {
    intval = this.genrand_int32(); 
  }
  else {
    if(max == undefined){
      max = min;
      min = undefined;
    }
    else {
      if (max < min){
        let tempmax = max;
        max = min;
        min = tempmax;
      }
    }
    if(min == 0){
      intval = this.genrand_int32() % (max+1);
    }
    else if (min == undefined) {
      intval = this.genrand_int32() % (max) + 1; 
      if(max < 0) intval = -intval;
    }
    else {
      intval = this.genrand_int32() % (max-min+1) + min;
    }
  }
  return intval;
  /* divided by 2^32 */
}
 
/* generates a random number on [0,1) with 53-bit resolution*/
randomizer.prototype.genrand_res53 = function() { 
  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
  return(a*67108864.0+b)*(1.0/9007199254740992.0); 
} 


window.onload = function() {
  
        let options = ["❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌","❌",1,1,1,1,1,2,2,2,2,3,3,3,4,4,5]
  
        let currentcanvaswidth = 75;
        let currentcanvasheight = 75;
        let canvasscalar = 1.2;
        let tempwidth = currentcanvaswidth * canvasscalar;
        let tempheight = currentcanvasheight * canvasscalar;
  
        var clipPathElement = document.querySelector("#scratch_clip");
        clipPathElement.setAttribute("transform", "scale("+canvasscalar+")"); 
  
  
        var rando = new randomizer(840);
  
        function createScratchOffContainer(index) {
            // Create a new div for the container
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('container');
          
            containerDiv.style.width = (75*canvasscalar) + "px";  // Set the new width
            containerDiv.style.height = (75*canvasscalar) + "px"; // Set the new height

            // Create the secret message div
            const secretMessageDiv = document.createElement('div');

            // Create the first canvas
            const canvas1 = document.createElement('canvas');
            canvas1.classList.add('canvas');
            canvas1.id = `canvas-h${index}`;  // Unique ID
            canvas1.width = tempwidth;
            canvas1.height = tempheight;

            // Create the second canvas
            const canvas2 = document.createElement('canvas');
            canvas2.classList.add('canvas');
            canvas2.id = `canvas-s${index}`;  // Unique ID
            canvas2.width = tempwidth
            canvas2.height = tempheight

            // Create the SVG
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('scratch_off_svg');
            svg.setAttribute('width', tempwidth);
            svg.setAttribute('height', tempheight);
            svg.setAttribute('viewBox', '0 0 75 75');
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('d', 'M 16.16 5.6 C 17.1744 5.8376 18.8792 6.6968 19.84 7.18 C 22.7656 8.652 26.3872 11.2136 28.96 13.264 C 28.96 13.264 31.52 15.4176 31.52 15.4176 C 31.9704 15.812 32.6256 16.3416 32.88 16.88 C 33.124 16.9384 33.1064 16.9528 33.12 17.2 C 33.12 17.2 33.44 17.44 33.44 17.44 C 33.44 17.44 33.6 17.36 33.6 17.36 C 33.6 17.36 33.68 17.44 33.68 17.44 C 33.768 17.7144 34.6648 18.4984 34.9256 18.8 C 35.064 18.96 35.2432 19.2208 35.4632 19.2608 C 35.6304 19.2912 36.548 19.028 36.8 18.9808 C 37.7744 18.7984 39.0176 18.5616 40 18.56 C 42.4312 18.556 44.2784 18.5928 46.64 19.36 C 46.8976 18.8792 47.1456 18.716 47.4976 18.32 C 47.4976 18.32 49.984 15.872 49.984 15.872 C 49.984 15.872 50.56 15.288 50.56 15.288 C 53.2424 12.8184 57.0992 10.0752 60.24 8.192 C 61.4064 7.4928 62.5976 6.8616 63.84 6.3088 C 64.2968 6.1056 65.0312 5.736 65.52 5.76 C 65.7392 5.5384 65.8456 5.7976 65.9336 6.0016 C 65.9336 6.0016 66.4248 7.36 66.4248 7.36 C 66.8544 8.5928 67.5072 11.7928 67.668 13.12 C 67.668 13.12 68 16.24 68 16.24 C 68 16.24 68 16.96 68 16.96 C 68 16.96 68.08 17.92 68.08 17.92 C 68.08 17.92 68.08 22 68.08 22 C 68.08 22 68 23.36 68 23.36 C 68 23.36 67.6464 27.36 67.6464 27.36 C 67.404 29.112 67.0768 30.84 66.668 32.56 C 66.668 32.56 66.2928 33.92 66.2928 33.92 C 66.2176 34.1544 66.08 34.4768 66.1208 34.72 C 66.1664 34.9928 66.56 35.5232 66.732 35.76 C 66.732 35.76 68.08 37.68 68.08 37.68 C 68.08 37.68 66.08 38.16 66.08 38.16 C 66.3712 38.5672 66.6232 38.7656 66.9528 39.12 C 67.4928 39.6992 68.032 40.3224 68.5016 40.96 C 70.1808 43.2432 71.5272 45.916 72.0336 48.72 C 72.1256 49.2256 72.2336 49.8072 72.24 50.32 C 72.24 50.32 72.24 52.08 72.24 52.08 C 72.2368 52.4352 72.2272 52.6088 72.16 52.96 C 72.16 52.96 70.92 51.6576 70.92 51.6576 C 70.92 51.6576 70.16 50.8 70.16 50.8 C 69.7712 50.7352 69.5632 50.5 69.28 50.24 C 69.28 50.24 70.0432 52.8 70.0432 52.8 C 70.4304 54.8504 70.2048 56.9024 69.5728 58.88 C 69.2824 59.788 68.92 60.6648 68.4992 61.52 C 68.4992 61.52 67.84 62.72 67.84 62.72 C 67.84 62.72 66.0232 61.2984 66.0232 61.2984 C 66.0232 61.2984 65.04 60.7056 65.04 60.7056 C 64.8136 60.5704 63.9072 60.1168 63.68 60.1176 C 63.3792 60.1192 62.68 60.7984 62.4 61.0104 C 62.4 61.0104 59.12 63.4824 59.12 63.4824 C 59.12 63.4824 55.52 66.044 55.52 66.044 C 55.52 66.044 49.68 70.1584 49.68 70.1584 C 49.68 70.1584 46.64 72.2048 46.64 72.2048 C 46.64 72.2048 44 73.9792 44 73.9792 C 44 73.9792 42.48 75.0064 42.48 75.0064 C 42.1832 75.192 41.2472 75.8776 40.96 75.8648 C 40.6536 75.8512 39.732 75.1416 39.44 74.9376 C 39.44 74.9376 36 72.64 36 72.64 C 36 72.64 27.6 66.8576 27.6 66.8576 C 27.6 66.8576 23.2 63.748 23.2 63.748 C 23.2 63.748 19.6 61.0632 19.6 61.0632 C 19.3272 60.8656 18.4968 60.1384 18.24 60.1072 C 17.9736 60.0752 17.2928 60.46 17.04 60.5984 C 16.3968 60.9504 15.7744 61.3576 15.2 61.8136 C 14.7776 62.1488 14.5032 62.4928 14 62.72 C 14 62.72 12.6328 59.84 12.6328 59.84 C 12.1496 58.592 11.6824 56.7768 11.68 55.44 C 11.68 55.44 11.68 54.4 11.68 54.4 C 11.6816 53.4648 11.9416 52.1656 12.2464 51.28 C 12.2464 51.28 12.64 50.24 12.64 50.24 C 12.64 50.24 10.8464 51.7736 10.8464 51.7736 C 10.8464 51.7736 9.68 52.96 9.68 52.96 C 9.68 52.96 9.6 51.6 9.6 51.6 C 9.6 51.6 9.6936 49.84 9.6936 49.84 C 9.9168 47.504 10.7936 45.2272 11.9544 43.2 C 12.5 42.2472 13.5512 40.748 14.2624 39.92 C 14.6376 39.484 15.5592 38.6056 15.76 38.16 C 15.76 38.16 13.84 37.68 13.84 37.68 C 14.0152 37.2608 14.7696 36.2272 15.076 35.84 C 15.284 35.5776 15.7288 35.048 15.776 34.72 C 15.8064 34.5016 15.6128 33.9272 15.5496 33.68 C 15.5496 33.68 14.9936 31.44 14.9936 31.44 C 14.5376 29.3832 14.2688 27.452 14.0664 25.36 C 14.0664 25.36 13.92 23.84 13.92 23.84 C 13.92 23.84 13.84 22.16 13.84 22.16 C 13.84 22.16 13.84 18.08 13.84 18.08 C 13.84 18.08 13.92 16.88 13.92 16.88 C 13.9224 15.5736 14.1912 13.8712 14.3776 12.56 C 14.6736 10.4696 15.2768 7.5 16.16 5.6 Z');
            svg.appendChild(path);

            // Append elements to the inner container
            containerDiv.appendChild(secretMessageDiv);
            containerDiv.appendChild(canvas1);
            containerDiv.appendChild(canvas2);
            containerDiv.appendChild(svg);
          
            var ctx = canvas2.getContext('2d');
            if(!chosen.includes(index)) {
              ctx.fillStyle = '#777777';
              ctx.fillRect(0, 0, tempwidth, tempheight);
              const img = document.getElementById("scratchimg");
              ctx.drawImage(img, 0, 0, img.width, img.height, 3*canvasscalar - 3, 0, tempwidth, tempheight);
            }

            var ctx2 = canvas1.getContext('2d');
            //ctx2.fillStyle = '#E9B639';
            ctx2.fillStyle = '#222222';
            ctx2.fillRect(0, 0, tempwidth, tempheight);
            ctx2.fillStyle = '#FFFFFF';
            ctx2.font = "20px serif";
            ctx2.textAlign = "center";
            let option = parseInt(rando.randint(0, options.length-1));
            let choice = options[option];
            if(parseInt(choice) > 0) {
              choice = "$"+choice;
            }
            ctx2.fillText(choice, tempwidth/2 + 3*canvasscalar - 3, tempheight/2 + tempheight/8);

            canvas1.addEventListener('mousemove', function(e){
              //cutCircle(ctx, e.layerX, e.layerY, 10, 0);
            });

            canvas2.addEventListener('mousemove', function(e){
              cutCircle(ctx, e.layerX, e.layerY, 10, index);
            });
          
          canvas2.addEventListener('touchmove', function(e) {
              e.preventDefault();  // Prevent scrolling while dragging on the canvas

              // Get the touch position relative to the canvas
              const touch = e.touches[0];
              const rect = canvas2.getBoundingClientRect();
              const x = touch.clientX - rect.left;
              const y = touch.clientY - rect.top;
              //const x = touch.pageX - rect.left;
              //const y = touch.pageY - rect.top;

              cutCircle(ctx, x, y, 10, 1);
          });

            // Append the inner container to the outer container
            document.getElementById('scratchcontainer').appendChild(containerDiv);
        }

        // Initialize 3 scratch-off containers
        for (let i = 0; i < 9; i++) {
            createScratchOffContainer(i);
        }
}


var pressed = false;
var selected = -1;

var chosen = [];
var max = 3;




function cutCircle(context, x, y, radius, scratchedNum){
  if(pressed) {
    
    //if one has not yet been selected, set it selected
    //if current does not match selected, exit
    if (selected === -1) {
      selected = scratchedNum;
      console.log(scratchedNum)
    }
    else if(selected !== scratchedNum){
      return;
    }
    
    //only 2 out of 3 can be scratched
    //make sure this one is scratchable
    if(!chosen.includes(scratchedNum)) {
      if(chosen.length >= max){
        return;
      }
      chosen.push(scratchedNum);
    }
    
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.fill();
    
  } //if pressed
}


document.addEventListener('mousedown', function(e){
	pressed = true;
});
document.addEventListener('mouseup', function(e){
	pressed = false;
  selected = -1;
});

document.addEventListener('touchstart', function(e) {
    pressed = true;
});
document.addEventListener('touchend', function(e) {
    pressed = false;
    selected = -1;
});
