let mode=0;
let arr1 = [[],[]];
let arr2 = [[],[]];
let arrnew=[[],[]];
let all=[arr1, arr2];
let row=0;
let col=0;



var stage = new Konva.Stage({
    container: 'container',
    width: 1100,
    height: 800,
  });

  var layer = new Konva.Layer();

stage.add(layer);

function trainMode(){
  layer.destroyChildren();
var text = new Konva.Text({
    x: 10,
    y: 15,
    text: 'Simple Text',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green'
  });

layer.add(text);

for(i=1;i<=3;i++){
var bracketline=new Konva.Line({
    points:[50,50*i,50,100*i],
    stroke: 'black',
    strokeWidth:4,
    
    lineJoin:'round',
}); 

var text = new Konva.Text({
    x: 60,
    y: 50*i*1.5,
    text: '5',
    fontSize: 70,
    fontFamily: 'Calibri',
    fill: 'black'
  });

layer.add(text);

layer.add(bracketline);
}

for(i=1;i<=3;i++){
    var bracketline=new Konva.Line({
        points:[250,50*i,250,100*i],
        stroke: 'black',
        strokeWidth:4,
        
        lineJoin:'round',
    }); 
    
    
    layer.add(bracketline);
    }

    for(i=1;i<=3;i++){
        var text = new Konva.Text({
            x: 60+70,
            y: 50*i*1.5,
            text: '5',
            fontSize: 70,
            fontFamily: 'Calibri',
            fill: 'black'
          });
        
        layer.add(text);

        tr2 = new Konva.Transformer({
            node: text,
            enabledAnchors: ['middle-left', 'middle-right'],
        
            boundBoxFunc: function (oldBox, newBox) {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
            },
        });
    }

    for(i=1;i<=3;i++){
        var text = new Konva.Text({
            x: 60+140,
            y: 50*i*1.5,
            text: '5',
            fontSize: 70,
            fontFamily: 'Calibri',
            fill: 'black'
          });
        
        layer.add(text);
    }

    var bracketline=new Konva.Line({
        points:[48,50,70,50],
        stroke: 'black',
        strokeWidth:4,
        
        lineJoin:'round',
    }); 

    layer.add(bracketline);

    var bracketline=new Konva.Line({
        points:[252,50,230,50],
        stroke: 'black',
        strokeWidth:4,
        
        lineJoin:'round',
    }); 

    layer.add(bracketline);
 
        var bracketline=new Konva.Line({
        points:[48,300,70,300],
        stroke: 'black',
        strokeWidth:4,
        
        lineJoin:'round',
    }); 

    layer.add(bracketline);

    
    var bracketline=new Konva.Line({
        points:[252,300,230,300],
        stroke: 'black',
        strokeWidth:4,
        
        lineJoin:'round',
    }); 

    layer.add(bracketline);


   
        //tr2.nodes([]);
    
    text.on('transform', function () {
        
        text.setAttrs({
            width: text.width() * text.scaleX(),
            scaleX: 1,
        });
    });

    text.on('dblclick dbltap', () => {
        // hide text node and transformer:
        text.hide();
        

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = text.absolutePosition();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
          x: stage.container().offsetLeft + textPosition.x,
          y: stage.container().offsetTop + textPosition.y,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = text.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = text.width() - text.padding() * 2 + 'px';
        textarea.style.height =
          text.height() - text.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = text.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = text.lineHeight();
        textarea.style.fontFamily = text.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = text.align();
        textarea.style.color = text.fill();
        rotation = text.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          px += 2 + Math.round(text.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
          textarea.parentNode.removeChild(textarea);
          window.removeEventListener('click', handleOutsideClick);
          text.show();
       
        }

        function setTextareaWidth(newWidth) {
          if (!newWidth) {
            // set width for placeholder
            newWidth = text.placeholder.length * text.fontSize();
          }
          // some extra fixes on different browsers
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
          }

          var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
          if (isEdge) {
            newWidth += 1;
          }
          textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
          // hide on enter
          // but don't hide on shift + enter
          if (e.keyCode === 13 && !e.shiftKey) {
            text.text(textarea.value);
            removeTextarea();
          }
          // on esc do not set value back to node
          if (e.keyCode === 27) {
            removeTextarea();
          }
        });

        textarea.addEventListener('keydown', function (e) {
          scale = text.getAbsoluteScale().x;
          setTextareaWidth(text.width() * scale);
          textarea.style.height = 'auto';
          textarea.style.height =
            textarea.scrollHeight + text.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
          if (e.target !== textarea) {
            text.text(textarea.value);
            removeTextarea();
          }
        }
        setTimeout(() => {
          window.addEventListener('click', handleOutsideClick);
        });
      });
    }

    function learnMode(){
     
        loadThemes();


    }

    function loadThemes(){

      layer.destroyChildren();
      var text1 = new Konva.Text({
        x: 10,
        y: 15,
        text: 'Bevezetés',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black'
      });

      text1.on('click', () => {
        console.log("megy");
        load1();
    });


    
    layer.add(text1);

    var text2 = new Konva.Text({
      x: 10,
      y: 45,
      text: 'Művelet típusok',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black'
    });

    text2.on('click', () => {
      console.log("megy");
  });


  
  layer.add(text2);

  var text3 = new Konva.Text({
    x: 10,
    y: 75,
    text: 'Összeadás/Kivonás',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'black'
  });

  text3.on('click', () => {
    console.log("megy");
    operation='+';
    addexample('+');
    
});



layer.add(text3);


var text4 = new Konva.Text({
  x: 10,
  y: 105,
  text: 'Szorzás',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'black'
});

text4.on('click', () => {
  console.log("megy");
    operation='*';
   addexample('*');
   
});



layer.add(text4);

var text5 = new Konva.Text({
  x: 10,
  y: 135,
  text: 'Transzponálás',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'black'
});

text5.on('click', () => {
  console.log("megy");
});



layer.add(text5);

    }


    function load1(){
      layer.destroyChildren();
      
      var textback = new Konva.Text({
        x: 5,
        y: 5,
        text: 'Vissza',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black'
      });
      
      textback.on('click', () => {
        console.log("megy");
        loadThemes();
      });
      
      
      
      layer.add(textback);
    }

    
    function addexample(str){
      mode=1;
      layer.destroyChildren();
      let lineX=0;
      let anotherL=0;
      load1();
      for(k=1;k<=3;k++){
      for(j=1;j<=2;j++){
      for(i=1;i<=3;i++){
        var bracketline=new Konva.Line({
            points:[50+lineX+anotherL,50*i,50+lineX+anotherL,100*i],
            stroke: 'black',
            strokeWidth:4,
            
            lineJoin:'round',
        }); 

        layer.add(bracketline);
        }
        lineX+=210;
      }
        lineX-=210;
        anotherL+=100;
    }
    
        let corX=0;
        let anotherX=0;
        for(k=1;k<=2;k++){
        for(j=1;j<=3;j++){
          all[k-1].push( [] );
        for(i=1;i<=3;i++){
          all[k-1][i-1].push( Math.floor(Math.random() * (10 - 1) + 1) );
            var text = new Konva.Text({
                x: 70+corX+anotherX,
                y: 50*i*1.5,
                text: String(all[k-1][i-1][j-1]),
                name: `${k-1}${i-1}${j-1}`,
                fontSize: 70,
                fontFamily: 'Calibri',
                fill: 'black'
              });
          
            layer.add(text);
        }
        corX+=70;
      }
      anotherX+=100;
    }


    


    console.log(all[0][0][0]);
     //arrnew= Array.from(Array(3), () => new Array(3));
     if(str=='+'){
      	for(i=0;i<3;i++){
          arrnew.push( [] );
          for(j=0;j<3;j++){
            arrnew[i][j]=all[0][i][j]+all[1][i][j];
          }
        }
      }else if(str=='*')
      {
      	for(i=0;i<3;i++){
       
          arrnew.push( [] );
          for(j=0;j<3;j++){
            arrnew[i][j]=0;
            for(z=0;z<3;z++){
          
            arrnew[i][j]+= all[0][i][z]*all[1][z][j];
            console.log("arrnew: "+arrnew);
            }
          }
        }
        console.log("arrnew:");
        //console.log(all[0]);

        //arrnew=math.multiply(arr1, arr2);
        
        
      }

        console.log(arrnew);
        
    }

 
    let operation;
    stage.on('click', function (e) {
      // e.target is a clicked Konva.Shape or current stage if you clicked on empty space


      if (mode==1){
        nextNum(operation);
      }
      console.log('clicked on', e.target);
      console.log(
        'usual click on ' + JSON.stringify(stage.getPointerPosition())
      );
    });


    var textbackA;
    var textbackB;
    var textbackE;
    var textbackN;
    let lastR;
    let lastC;
    let mulposX;

   let newX=0;
   var textNW; 

    function nextNum(str2)
    {
     
         // console.log(arr1);
       
         //all[0][row][col]

        console.log(arr1);

        let sel;
        if(str2=='+'){
        sel=layer.findOne(`.0${row}${col}`);
        
        sel.fill('red');
        sel=layer.findOne(`.1${row}${col}`);
        sel.fill('red');
        if(lastR!=null){
        sel=layer.findOne(`.0${lastR}${lastC}`);
        
        sel.fill('black');

        sel=layer.findOne(`.1${lastR}${lastC}`);
        sel.fill('black');
        
        sel=layer.findOne(`.2${lastR}${lastC}`);
        sel.fill('black');

        }
      }else if(str2=='*'){
        for(i=0;i<3;i++){
        sel=layer.findOne(`.0${row}${i}`);
        sel.fill('red');

        sel=layer.findOne(`.1${i}${col}`);
        sel.fill('red');
        
        }
      
        if(lastR!=null){
          for(i=0;i<3;i++){
      

        sel=layer.findOne(`.1${i}${lastC}`);
        sel.fill('black');
          }

          if(col==0){
            for(i=0;i<3;i++){
            sel=layer.findOne(`.0${lastR}${i}`);
        
            sel.fill('black');
            }
          }
     
       }
     }


        lastC=col;
        lastR=row;
        if(str2=='+'){
      if(typeof textbackA != "undefined"){
      textbackA.destroy();
      textbackB.destroy();
      textbackE.destroy();
      textbackN.destroy();
      }
      textbackA = new Konva.Text({
        x: 45,
        y: 350,
        text: all[0][row][col],
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      var textbackS = new Konva.Text({
        x: 60,
        y: 350,
        text: '+',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      textbackB = new Konva.Text({
        x: 75,
        y: 350,
        text: all[1][row][col],
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      textbackE = new Konva.Text({
        x: 90,
        y: 350,
        text: '=',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      textbackN = new Konva.Text({
        x: 115,
        y: 350,
        text: arrnew[row][col],
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });
      
      if(col==0)
      {
        newX=0;
      }

      newX+=70;
       textNW = new Konva.Text({
        x: 615+newX,
        y: (50*(row+1))*1.5,
        text: String(arrnew[row][col]),
        name: `2${row}${col}`,
        fontSize: 70,
        fontFamily: 'Calibri',
        fill: 'red'
      });
  
    layer.add(textNW);

    
      

      layer.add(textbackA);
      layer.add(textbackS);
      layer.add(textbackB);
      layer.add(textbackE);
      layer.add(textbackN);
      }
      if(col==arr1[row].length-1){
        row++;
        col=0;
      }else{
        col++;
      }
    

    if(str2=='*'){
      mulposX=0;
      for(i=0;i<3;i++){
      textbackA = new Konva.Text({
        x: 45+mulposX,
        y: 350,
        text: all[0][row][i],
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      var textbackM = new Konva.Text({
        x: 60+mulposX,
        y: 350,
        text: '*',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      textbackB = new Konva.Text({
        x: 75+mulposX,
        y: 350,
        text: all[1][i][col-1],
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      if(i<arr1[row].length-1){
      
      var textbackS = new Konva.Text({
        x: 90+mulposX,
        y: 350,
        text: '+',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });
    }else{
      var textbackS = new Konva.Text({
        x: 90+mulposX,
        y: 350,
        text: '=',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });

      var textbackNnn = new Konva.Text({
        x: 105+mulposX,
        y: 350,
        text: String(arrnew[row][col-1]),
        name: `2${row}${col}`,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red'
      });
      layer.add(textbackNnn);
    }

      layer.add(textbackA);
      layer.add(textbackB);
      layer.add(textbackM);
      layer.add(textbackS);
      
      mulposX+=60;
    }
    }


   
      console.log(arrnew);
    }