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
    addexample();
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

    
    function addexample(){

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
          
        for(i=1;i<=3;i++){
            var text = new Konva.Text({
                x: 70+corX+anotherX,
                y: 50*i*1.5,
                text: String(Math.floor(Math.random() * (10 - 1) + 1)),
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

    }


    stage.on('click', function (e) {
      // e.target is a clicked Konva.Shape or current stage if you clicked on empty space
      console.log('clicked on', e.target);
      console.log(
        'usual click on ' + JSON.stringify(stage.getPointerPosition())
      );
    });