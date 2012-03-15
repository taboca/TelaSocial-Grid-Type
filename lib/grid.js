
   hashChars = new Array();
   hashLines = new Array();

   function grid(str) { 
	hashSum(str);
	for(k in hashChars) { 
		//alert("cound for "+k+" is "+ hashChars[k]);
	} 
 	// fineRows 
  	line=0; 
        maxmax=str.split('.').length-1;

	var charStream = str.split('.');
	var flatBuffer = '';
	for(k in charStream) { 
		flatBuffer+=charStream[k];
	}  
	var cols = parseInt(flatBuffer.length)-parseInt(charStream.length)-1;
	var lineBuf = '';
	while(line<maxmax) { 
        	maxline = pickRow(line,line+1,str);
		lineBuf+=makeRow(line,maxline,flatBuffer,cols);
		line+=maxline;
  	} 
	$('#container').append(lineBuf);
   } 
    
   function makeRow(line, maxline, str, cols) { 
       	//alert(line+ ' and ' + maxline );
	var buffCells = '';
	var buff='';
	for(var k = 0;k<cols;k++) { 
	  var buffCells = '';
          buff += '<div class="c gh720">';
	  for(var l = line; l<maxline; l++) { 
		var currChar = str[l*cols+k];
	  	if(buffCells.indexOf(currChar)==-1) { 
			buffCells+=currChar+',';
			size = hashChars[currChar].split(',').length-1;;	
          		buff+='<div class="c gv'+size+'"> ... '+currChar;
	  		buff+='</div>';
		} 
  	  } 

	buff+='</div>';
	} 
	return buff;
   } 

   function pickRow(line,maxline,str) { 
 	// fineRows 
	var bufferSpan = '';
	while(line<maxline) { 
		for(k in str) { 
			var cellChar = str[k];
			if(cellChar=='.') { line++; } else { 
				linesForCell = hashChars[cellChar];
			   	lines = linesForCell.split(',');
			   	linesMax = lines[lines.length-2];
				linesDelta = parseInt(linesMax)+1-line;
				if(linesDelta>1 && bufferSpan.indexOf(cellChar)==-1) { 
			 	  bufferSpan+=cellChar+',';	
				  maxline+=linesDelta-1;
				}
			} 
  		} 
	} 
//alert(maxline);
        return maxline; 
   }  
 
   function hashSum(str) { 
   	var l=0;
	for(k in str) { 
		if(str[k]=='.') { l++; } else { 
			if(!hashChars[str[k]]) { hashChars[str[k]]=''; };
			hashChars[str[k]]+=l+",";
			hashLines[l]+=str[k]+",";
		} 
  	} 
   } 
 
