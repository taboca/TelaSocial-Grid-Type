function grid(str,cols) { 
  clusterFlip(false, document.getElementById('container'), 0,str,cols);
} 

function clusterFlip(flipFlop, currEl, index, str,columns) { 
  var range = str.length/columns;
  var classType ='';
  while(index<range) { 
    if(str!='') {
      var classType = getClassType(flipFlop);
      var childElem = emitElement(currEl, classType);
      index = clusterQuery(flipFlop, childElem, str, columns);
      str = str.substr(index*columns, str.length);
    } else { break;} 
  } 
}

function emitElement(parentElem, classType) {
  var el = document.createElement("div");
  el.setAttribute("class",classType);
  parentElem.appendChild(el);	
  return el;
} 

function getClassType(flipFlop) {
  return flipFlop ? 'c gh' : 'c gv';
}

function clusterQuery(flipflop, el, str,columns) { 
  var hashChars = hashSum(str, columns);
  var indexLine = 0;
  var parseUpToLine = indexLine+1; 
  var oIndex = indexLine; 
  var buff = '';
  var pixel = 0;
  var cssWidth=100;
  var cssHeight=100;
  while(indexLine<parseUpToLine) { 
    var cellUpToLine = hashChars[str[pixel]]-1;
    buff += str[pixel];
    if(cellUpToLine>=parseUpToLine) { 
      parseUpToLine=cellUpToLine+1;
    } 
    pixel++;
    if(pixel%columns == 0) { indexLine++ } 
  } 
  var o = flipString(buff,buff.length/columns, columns);
  var checkReduce = reduce(o,columns);
  if(!checkReduce) { 	
   	clusterFlip(!flipflop, el, 0, o, buff.length/columns); 
  } else {  
    var lines = o.length/columns;
    el.innerHTML='<div class="inner">'+o+'</div>';	
    var yHeight = cssHeight*lines;
    var xWidth = cssWidth*columns;
    if(flipflop) { 
      var temp = yHeight;
      yHeight = xWidth;
      xWidth = temp;
    } 
    el.setAttribute('style','width:'+xWidth+'px;height:'+yHeight+'px');
  }  
  return parseUpToLine; 
}  

function reduce(str,cols) { 
  var ss = str[0];
  var cCount = 0;
  for(var k=0;k<str.length;k++) { 
    if(k % cols==0) { cCount++ } 
    var c = str[k];
    if(ss!=c) return false; 
  } 
  return { c: cCount } 
} 


function flipString(inputStr, lines, cols) { 
  var outputString='';
  for(j=0;j<cols;j++) { 
    for(var i=0;i<lines;i++) { 
      outputString+=inputStr[i*cols+j];
    } 
  }
  return outputString; 
} 

function hashSum(str,cols) { 
  var hashChars=new Array();
  var line = 0;
  for(k in str) { 
    var hit = k % cols; 
    if(hit==0) { line++ } 
    var curr = str[k];
    if(!hashChars[curr]) { hashChars[curr]=line; } 
    if(line > hashChars[curr]) { hashChars[curr]=line } 
  } 
  console.log(str);
  console.log(hashChars);
  return hashChars;
} 

