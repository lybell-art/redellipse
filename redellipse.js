var tileCount=20;
var tileWidth;
var tileHeight;
var shapeSize=30.0;
var shapeAngle=0.0;
var sizeMode=1;

var tiles=[];

function setup() { 
  createCanvas(1000, 600);
	noStroke();
	fill(255,0,0);
	tileWidth=width/tileCount;
	tileHeight=height/tileCount;
	for(var i=0;i<tileCount;i++)
	{
		tiles.push([]);
		for(var j=0;j<tileCount;j++)
		{
			tiles[i].push(new tile(i,j));
		}
	}
} 

function draw() { 
  background(255);
	for(var i=0;i<tileCount;i++)
	{
		for(var j=0;j<tileCount;j++)
		{
			tiles[i][j].direct();
			tiles[i][j].sizing();
			tiles[i][j].render();
		}
	}
}

function keyReleased()
{
	if(key=='d'||key=='D')
	{
		sizeMode=(sizeMode+1)%3;
		console.log(sizeMode);
	}
	if(keyCode==UP_ARROW) shapeSize+=5;
	if(keyCode==DOWN_ARROW) shapeSize=max(shapeSize-5,5);
	if(keyCode==LEFT_ARROW) shapeAngle+=5;
	if(keyCode==RIGHT_ARROW) shapeAngle-=5;
}

function tile(xNo, yNo)
{
	this.x=tileWidth*xNo+tileWidth/2;
	this.y=tileHeight*yNo+tileWidth/2;
	this.angle=0;
	this.size=0;
	this.direct=function()
	{
		this.angle=atan2(mouseY-this.y,mouseX-this.x);
		this.angle+=(shapeAngle*(PI/180));
	}
	this.sizing=function()
	{
		var sizeDelta=map(dist(mouseX,mouseY,this.x,this.y),0,500,5,shapeSize);
		switch(sizeMode)
		{
			case 0:this.size=shapeSize; break;
			case 1:this.size=shapeSize*1.5-sizeDelta; break;
			case 2:this.size=sizeDelta; break;
		}
	}
	this.render=function()
	{
		push();
		translate(this.x,this.y);
		rotate(this.angle);
		ellipse(0,0,this.size,this.size/2);
		pop();
	}
}
