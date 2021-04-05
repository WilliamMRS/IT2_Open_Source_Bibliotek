/*jslint devel: true */
//************************************************************************************************************************************
// Har ikke hatt nok tid til å få luket ut alle bugs så noe ser litt rart ut. Kan gjerne fikse de og levere inn igjen da
// Har en bug som restarter samme sangen 1/3 inn i sangen. Vet ikke om det er koden eller html.audio som ødelegger (Kan være audio filene(3 første))
// Må også legge inn repeat av lista og mye annet.
//************************************************************************************************************************************
/*
*Change albumpicture and songtext for every song.
*Clickable play, pause and next/back buttons (Interactive Canvas)
*Clickable list of songs (Scrollable list?)
Automatic next song (Bug still restarts song at 1/3 of length)
Autostop when there's nothing left to play (Bug hinders implementation)
*Shuffle (kommer)
*Song progressbar
Seek via click on song progressbar

fix playback bug at 1/3 of playback

*/
var ctx; //global canvas.2d context
var mX; //mouse coordinates
var mY; //mouse coordinates
var audio; //"musicPlayer"
var albumCover; //"albumCover" The image of the album

var albumCoverList; //The album array with .jpg files
var songList; //The song array with .mp3 files
var songTitle; // The title array with text files
var currentSong; //number of current song
var isPlaying; //is anything playing?

function drawText(text, x, y, fillstyle, font) {
	"use strict";
	ctx.font = font;//18px Arial
	ctx.fillStyle = fillstyle; //"black"
	ctx.textAlign = "middle";
	ctx.fillText(text, x, y);
}

function drawSquare(x, y, height, width, color) {
    "use strict";
    ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawFilledTriangle(x, y, height, width, color) {
    "use strict";
    ctx.beginPath();
	ctx.fillStyle = color;
	
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFilledSquare(x, y, height, width, colour) {
    "use strict";
    ctx.beginPath();
	ctx.fillStyle = colour;
	
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y - height);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawPlaylist(songs, titles, images) {
	"use strict";
	var i, imageToLoad;
	for (i = 0; i <= songTitle.length - 1; i += 1) {
		drawFilledSquare(100, 50 * i + 600, 50, 800, "grey");
		drawText(titles[i], 170, 50 * i + 583, "white", "20px Arial");
		document.getElementById("playListImage").src = albumCoverList[i];
		imageToLoad = document.getElementById("playListImage");
		ctx.drawImage(imageToLoad, 100, 50 * i + 550, 50, 50);
	}
}

function canvasRenderer() {
	"use strict";
	// Render timeline, title and albumcover.
	var grd, duration, lapsedDuration, currentTime1;
	
	//background grd setup
	grd = ctx.createLinearGradient(0, -500, 0, 2000);
	grd.addColorStop(0, "black");
	grd.addColorStop(1, "white");
	ctx.clearRect(0, 0, 1000, 600);
	//Draw background
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 1000, 1000);
	//Draw Title
	drawText("All Rights Reserved: © Schpotify Inc", 800, 990, "lightgreen", "12px Arial");
	//Draw Player Controls
	drawFilledTriangle(575, 500, 15, -15, "white");
	drawFilledTriangle(575, 500, -15, -15, "white");
	drawFilledTriangle(590, 500, 15, -15, "white");
	drawFilledTriangle(590, 500, -15, -15, "white"); //right arrow
	drawFilledTriangle(425, 500, -15, 15, "white");// left arrow
	drawFilledTriangle(425, 500, 15, 15, "white");
	drawFilledTriangle(440, 500, -15, 15, "white");
	drawFilledTriangle(440, 500, 15, 15, "white");
	if (isPlaying === false) { //Play button
		drawFilledTriangle(530, 500, 20, -35, "white");
		drawFilledTriangle(530, 500, -20, -35, "white");
	}
	if (isPlaying === true) { //Pause button
		drawFilledSquare(490, 518, 36, 15, "white");
		drawFilledSquare(510, 518, 36, 15, "white");
	}
	//Draw Song Title and AlbumCover
	document.getElementById("albumCover").src = albumCoverList[currentSong];
	albumCover = document.getElementById("albumCover");
    ctx.drawImage(albumCover, 300, 50, 400, 400);
	drawText(songTitle[currentSong] + "   " + Math.round(audio.currentTime) + " : " + Math.round(audio.duration), 300, 470, "White", "16px Arial");
	//Draw Progressbar and timestamp
	currentTime1 = audio.currentTime;
	duration = audio.duration / 400;
	lapsedDuration = currentTime1 / duration;
	drawFilledSquare(300, 450, 10, lapsedDuration, "lightGreen");
	//Draw Playlist
	drawPlaylist(songList, songTitle, albumCoverList);
	//Draw Shuffle, Repeat list and Repeat song button
}

function playMusic() {
	"use strict";
	audio.play();
	isPlaying = true;
}

function pauseMusic() {
	"use strict";
	audio.pause();
	isPlaying = false;
}

/*
Needs an array of Songs and albumcovers to function. Filenames only.
*/
function nextSong(songNumber, songList, albumCovers) {
	"use strict";
	audio.pause();
	audio.src = songList[songNumber];
	audio.play();
	isPlaying = true;
	console.log("Next song ---> " + songList[songNumber]);
	console.log("currentsong number = " + songNumber);
}

function previousSong(songNumber, songList, albumCovers) {
	"use strict";
	audio.pause();
	audio.src = songList[songNumber];
	audio.play();
	isPlaying = true;
	console.log("Previous song <--- " + songList[songNumber]);
	console.log("currentsong number = " + songNumber);
}

	//Returns mouse coordinates on a page when mouse is clicked. Can be used with margin:0; to get coordinates of a canvas.
window.onclick = function (e) {
	"use strict";
	mX = e.pageX;
	mY = e.pageY;
	console.log(mX + " " + mY);
		
	if (mX >= 495 && mX <= 530 && mY >= 500 && mY <= 540 && isPlaying === false) {
		playMusic();
		console.log("play");
	} else if (mX >= 490 && mX <= 530 && mY >= 500 && mY <= 535 && isPlaying === true) {
		pauseMusic();
		console.log("pause");
	} else if (mX >= 425 && mX <= 455 && mY >= 500 && mY <= 535) {
		currentSong += -1;
		previousSong(currentSong, songList, albumCoverList);
		console.log("Previous song");
	} else if (mX >= 560 && mX <= 590 && mY >= 500 && mY <= 535) {
		currentSong += 1;
		console.log("Next song");
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 568 && mY <= 618) {
		currentSong = 0;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 618 && mY <= 668) {
		currentSong = 1;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 668 && mY <= 718) {
		currentSong = 2;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 718 && mY <= 768) {
		currentSong = 3;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 768 && mY <= 818) {
		currentSong = 4;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 818 && mY <= 868) {
		currentSong = 5;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 868 && mY <= 918) {
		currentSong = 6;
		nextSong(currentSong, songList, albumCoverList);
	} else if (mX >= 100 && mX <= 900 && mY >= 918 && mY <= 968) {
		currentSong = 7;
		nextSong(currentSong, songList, albumCoverList);
	}
};

function setupPlaylist() {
	"use strict";
	songList = ["AstridSSuchABoy.mp3", "BarnsCourtneyGlitterAndGold.mp3", "LynyrdSkynyrdSweetHomeAlabama.mp3", "LadyGagaApplause.mp3", "ACDCThunderStruck.mp3", "MikePerryInsideTheLines.mp3", "SanHoloLight.mp3", "ZaraLarssonLushLyfe.mp3"];
	albumCoverList = ["AstridSSuchABoy.jpg", "BarnsCourtneyGlitterAndGold.jpg", "LynyrdSkynyrdSweetHomeAlabama.jpg", "LadyGagaApplause.png", "ACDCThunderStruck.jpg", "MikePerryInsideTheLines.jpeg", "SanHoloLight.jpg", "ZaraLarssonLushLyfe.png"];
	songTitle = ["Astrid S - Such a Boy", "Barns Courtney - Glitter and Gold", "Lynyrd Skynyrd - Sweet Home Alabama", "Lady Gaga - Applause", "AC DC - Thunderstruck", "Mike Perry - Inside The Lines", "San Holo - Light", "Zara Larsson - Lush Lyfe"];
}

function winInit() {
    "use strict";
	//audio and context setup
	audio = document.getElementById("musicPlayer");
	ctx = document.getElementById("myCanvas").getContext("2d");
	setupPlaylist();
	currentSong = 0;
	console.log("current song number = " + currentSong + "current song: " + songList[currentSong]);
	console.log(songList);
	console.log(albumCoverList);
	isPlaying = false;
	setInterval(canvasRenderer, 100);
	audio.loop = true;
	console.log("All lights are green Houston");
}

window.onload = winInit;