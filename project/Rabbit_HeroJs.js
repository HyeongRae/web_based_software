function hero(speed, hp, atk) {
   var view1 = new Image();
   var view2 = new Image();
   var view3 = new Image();
   var view1i = new Image();
   var view2i = new Image();
   var view3i = new Image();

   var view21 = new Image();
   var view22 = new Image();
   var view23 = new Image();
   var view21i = new Image();
   var view22i = new Image();
   var view23i = new Image();

   var eff = new Image();
   var deff = new Image();
   deff.src = "image/EE.png";
   eff.src = "image/E.png";
   view1.src = "image/hero1-1.png";
   view2.src = "image/hero1-2.png";
   view3.src = "image/hero1-a.png";

   view1i.src = "image/hero1-1-i.png";
   view2i.src = "image/hero1-2-i.png";
   view3i.src = "image/hero1-a-i.png";

   view21.src = "image/hero2-1.png";
   view22.src = "image/hero2-2.png";
   view23.src = "image/hero2-a.png";

   view21i.src = "image/hero2-1-i.png";
   view22i.src = "image/hero2-2-i.png";
   view23i.src = "image/hero2-a-i.png";

   var hpback = new Image();
   var hpbar = new Image();
   hpback.src = "image/frame.png";
   hpbar.src = "image/hp.png";
   this.speed = speed;
   this.hp = hp;
   this.atk = atk;
   this.xpos = 100;
   this.ypos = 300;
   this.w = 77;
   this.h = 80;
   this.motion = 1;
   this.doatk = 0;  //1이면 공격 중
   this.atkedpl = 0;  //때리면 1 이펙트 출력
   this.atkedEn = 0;  //맞으면 1 이펙트 출력
   this.imm = 0;  //1이면 무적상태
   this.version = 0;
   bufcontext.drawImage(view1,this.xpos,this.ypos,this.w ,this.h);
   document.addEventListener("keydown",getKeyDown,false);
   document.addEventListener("keyup",getKeyUp,false);

   this.move = function() {
      if(keyPressOn["38"]&&this.ypos!=0) this.ypos -= this.speed;
      if(keyPressOn["40"]&&this.ypos!=530) this.ypos += this.speed;
      if(keyPressOn["37"]&&this.xpos!=0) this.xpos -= this.speed;
      if(keyPressOn["39"]&&this.xpos!=1130) this.xpos += this.speed;
      if(this.version == 0) {
         if(this.imm == 0){
            if(this.motion <= 10 && this.doatk == 0)
               bufcontext.drawImage(view1, this.xpos, this.ypos, this.w, this.h);
            else if(this.motion <= 20 && this.doatk == 0)
               bufcontext.drawImage(view2, this.xpos, this.ypos, this.w, this.h);
            else
               bufcontext.drawImage(view3, this.xpos, this.ypos, this.w, this.h);
         }
         else {
            if(this.motion <= 10 && this.doatk == 0)
               bufcontext.drawImage(view1i, this.xpos, this.ypos, this.w, this.h);
            else if(this.motion <= 20 && this.doatk == 0)
               bufcontext.drawImage(view2i, this.xpos, this.ypos, this.w, this.h);
            else
               bufcontext.drawImage(view3i, this.xpos, this.ypos, this.w, this.h);
         }
      }
      else {
         if(this.imm == 0){
            if(this.motion <= 10 && this.doatk == 0)
               bufcontext.drawImage(view21, this.xpos, this.ypos, this.w, this.h);
            else if(this.motion <= 20 && this.doatk == 0)
               bufcontext.drawImage(view22, this.xpos, this.ypos, this.w, this.h);
            else
               bufcontext.drawImage(view23, this.xpos, this.ypos, this.w, this.h);
         }
         else {
            if(this.motion <= 10 && this.doatk == 0)
               bufcontext.drawImage(view21i, this.xpos, this.ypos, this.w, this.h);
            else if(this.motion <= 20 && this.doatk == 0)
               bufcontext.drawImage(view22i, this.xpos, this.ypos, this.w, this.h);
            else
               bufcontext.drawImage(view23i, this.xpos, this.ypos, this.w, this.h);
         }
      }
      if(this.atkedpl == 1)
         bufcontext.drawImage(eff, this.xpos + this.w, this.ypos + 29, 60, 60);
      if(this.atkedEn == 1)
         bufcontext.drawImage(deff, this.xpos +36, this.ypos +20, 63, 68);
      this.motion++;
      if(this.motion > 20)
         this.motion = 1;

   }
   this.showHpbar = function(){
      if(this.hp < 0) return 0;
      bufcontext.drawImage(hpback, 0, 0, 1200, 600);
      bufcontext.drawImage(hpbar, 114, 3, this.hp*32.9, 40);
   }

   function getKeyDown(event){
      var keyValue;
      if(event==null){
          return;
          }else{
            keyValue=event.keyCode;
            event.preventDefault();
          }
          if(keyValue=="87")keyValue="38";
          else if(keyValue=="83")keyValue="40";
          else if(keyValue=="65")keyValue="37";
          else if(keyValue=="68")keyValue="39";
          keyPressOn[keyValue] = true;
    }

   function getKeyUp(event){
      var keyValue;
      if(event==null){
          keyValue=window.event.keyCode;
          window.event.preventDefault();
          }else{
            keyValue=event.keyCode;
            event.preventDefault();
          }
          if(keyValue=="87")keyValue="38"; //up
          else if(keyValue=="83")keyValue="40"; //down
          else if(keyValue=="65")keyValue="37"; //left
          else if(keyValue=="68")keyValue="39"; //right
          keyPressOn[keyValue]=false;
      }

   this.atked = function(damage){
      this.hp -= damage;
      if(this.hp <= 0){
         return 0;
      }
      return 1;
   }

}
function enemy(ypos, stage) {
   this.hp;
   this.atk;
   this.xpos = 1200;
   this.ypos = ypos;
   this.motion = Math.floor(Math.random()*10);
   this.w = 65;
   this.h = 60;

   var view1 = new Image();
   var view2 = new Image();
   var ranNum = Math.floor(Math.random()*100);
   switch(stage){
         case 1:
            if(ranNum < 70) {
               this.atk = 1;
               this.hp = 1;
               view1.src = "image/M2-1-1.png";
               view2.src = "image/M2-1-2.png";
            }
            else if(ranNum < 100) {
               this.atk = 2;
               this.hp = 2;
               view1.src = "image/M2-2-1.png";
               view2.src = "image/M2-2-2.png";
            }
            break;
         case 2:
            w = 64;
            h = 60;

            if(ranNum < 70) {
               this.atk = 1;
               this.hp = 1;
               view1.src = "image/M3-1-1.png";
               view2.src = "image/M3-1-2.png";
            }
            else if(ranNum < 100) {
               this.atk = 2;
               this.hp = 2;
               view1.src = "image/M3-3-1.png";
               view2.src = "image/M3-3-2.png";
            }
            break;
         case 3:
            w=105;
            h=60;

            if(ranNum < 70) {
               this.atk = 1;
               this.hp = 1;
               view1.src = "image/M1-1-1.png";
               view2.src = "image/M1-1-2.png";
            }
            else if(ranNum < 100) {
               this.atk = 2;
               this.hp = 2;
               view1.src = "image/M1-2-1.png";
               view2.src = "image/M1-2-2.png";
            }
            break;
   }

   this.atked = function(damage) {
      this.atkedpl = 1;
      this.hp -= damage;
      if(this.hp <= 0){
         return 0;
      }
      return 1;
   }

   this.move = function() {
      if(this.xpos <= -this.w)
         return 1;
      this.xpos -= 2;
      if(this.motion <= 10)
         bufcontext.drawImage(view1, this.xpos, this.ypos, this.w, this.h);
      else
         bufcontext.drawImage(view2, this.xpos, this.ypos, this.w, this.h);

      this.motion++;
      if(this.motion > 20)
         this.motion = 1;
      return 0;
   }
}
function boss(stage) {
   this.hp;
   this.atk;
   this.way = -3;
   this.xpos = 1200;
   this.ypos = 125;
   this.motion = 1;
   this.w = 238;
   this.h = 250;
   this.atkdone = 0; //0이면 패턴 끝
   var view1 = new Image();
   var view2 = new Image();
   var viewmad1 = new Image();
   var viewmad2 = new Image();
   var viewa = new Image();
   var hpback = new Image();
   var hpbar = new Image();

   hpbar.src = "image/hp2.png";
   this.entercheck = 1;
   this.xback = -6;
   this.yback = -6;
   this.pattern = 1;
   switch(stage){
         case 1:
            this.atk = 3;
            this.hp = 10;
            view1.src = "image/boss-1.png";
            view2.src = "image/boss-2.png";
            hpback.src = "image/frame1.png";
            viewmad1.src = "image/boss-1-1.png";
            viewmad2.src = "image/boss-1-2.png";
            viewa.src = "image/boss-a.png";
            break;
         case 2:
            this.w = 439;
            this.h = 250;
            this.atk = 3;
            this.hp = 10;
            hpback.src = "image/frame2.png";
            view1.src = "image/M3-2-1.png";
            view2.src = "image/M3-2-2.png";
            viewmad1.src = "image/M3-2-1.png";
            viewmad2.src = "image/M3-2-2.png";
            viewa.src = "image/M3-2-1.png";
            break;
         case 3:
            this.w=257;
            this.h=250;
            this.atk = 3;
            this.hp = 10;
            hpback.src = "image/frame3.png";
            view1.src = "image/M1-3-1.png";
            view2.src = "image/M1-3-2.png";
            viewmad1.src = "image/M1-3-1.png";
            viewmad2.src = "image/M1-3-2.png";
            viewa.src = "image/M1-3-1.png";
            break;
   }

   this.showHpbar = function(){
      if(this.hp < 0)
         return 0;
      bufcontext.drawImage(hpback, 751, 477, 449, 123);
      bufcontext.drawImage(hpbar, 756, 553, this.hp*33, 43);
   }

   this.atked = function(damage) {
      this.hp -= damage;
      if(this.hp <= 0){
         this.entercheck = 1;
         return 0;
      }
      return 1;
   }
   this.enter = function() {
      if(this.xpos <= 1200 - this.w) {
         this.entercheck = 0;
         return 0;
      }
      this.xpos -= 1;
      if(this.motion <= 10)
         bufcontext.drawImage(view1, this.xpos, this.ypos, this.w, this.h);
      else
         bufcontext.drawImage(view2, this.xpos, this.ypos, this.w, this.h);
      this.motion++;
      if(this.motion > 20)
         this.motion = 1;
      return 1;
   }
   this.move = function() {
      if(this.ypos <= 0)
         this.way = 3;
      if(this.ypos >= 350)
         this.way = -3;
      this.ypos += this.way;
      if(this.motion <= 10)
         bufcontext.drawImage(view1, this.xpos, this.ypos, this.w, this.h);
      else
         bufcontext.drawImage(view2, this.xpos, this.ypos, this.w, this.h);

      this.motion++;
      if(this.motion > 20)
         this.motion = 1;
   }

   this.atkpattern = function(type) {

      switch(type) {
         case 1:
            if(this.xpos <= 0)
               this.xback = 6;
            if(this.xpos >= 1200 - this.w && this.xback > 0) { // 보스 공격 끝
               this.atkdone = 0;
               this.xback = -6;
               return 0;
            }
            this.xpos += this.xback;
            bufcontext.drawImage(viewa, this.xpos, this.ypos, this.w, this.h);
            this.atkdone = 1;
            return 1;
            break;
         case 2:
            if(this.xpos <= 0)
               this.xback = 6;
            if(this.xpos >= 1200 - this.w && this.xback > 0) { // 보스 공격 끝
               this.atkdone = 0;
               this.xback = -6;
               return 0;
            }
            this.xpos += this.xback;
            if(this.ypos <= 0)
               this.yback = 6;
            else if(this.ypos >= 600 - this.h) {
               this.yback = -6;
            }
            this.ypos += this.yback;
            if(this.motion <= 10)
               bufcontext.drawImage(view1, this.xpos, this.ypos, this.w, this.h);
            else
               bufcontext.drawImage(view2, this.xpos, this.ypos, this.w, this.h);
            if(this.atkedpl == 1)
               bufcontext.drawImage(eff, this.xpos, this.ypos, 60, 60);
            this.motion++;
            if(this.motion > 20)
               this.motion = 1;
            this.atkdone = 1;
            return 1;
            break;
      }
   }
}
var kill = 0;

var player;         //플레이어
var keyPressOn={};
var stage = 1;      //스테이지
var e = new Array();
var ranNum = 0;
var preNum = ranNum;
var Ecount = 0;
var NumEnemy = 100;
var start;         //게임시작
var max=1;          //나오는 적 조절
var maxcount = 1;    //나오는 적 조절
var graphstage = 1;
var xpos = -300;
var ypos = 0;
var Enter = 0;    //1이면 게임시작
var xcount=0;   //배경 지나온 길이
var l;          //패배 setinterval
var c;         //클리어 setinterval
var s;          //스테이지 setinterval
var v = new Image();
var anykey = new Image();
var BG = new Image();
var img = new Image();
var bossm = new boss(stage);
var stageimg = new Image();
var logo = new Image();
logo.src = "image/logo.png";
img.src = "image/FAIL.png";
BG.src = "image/background.png";
v.src = "image/hero.png";
anykey.src = "image/anykey.png";
var firstpage;

var bgm = new Audio();
bgm.src = "sound/bgm.mp3";
var hit = new Audio();
hit.src = "sound/hit.mp3";
var behit = new Audio();
behit.src = "sound/behit.mp3";
var bosss = new Audio();
bosss.src = "sound/boss.wav";

var fail = new Audio();
fail.src = "sound/fail.mp3";
var clear = new Audio();
clear.src = "sound/clear.mp3";
var moveend = new Audio();
moveend.src = "sound/moveend.mp3";
var count =0;
var esccheck =0;
function go(){
   firstpage = setInterval(first,13);
   Enter = 0;
}

function lose(){
   clearInterval(start);
   viewcontext.drawImage(img,0,0,1200,600);
   e = [];
   player = new hero(5,10,1);
   xpos = -300;
   stage = 1;
}
function clearview() {
   var CLEAR = new Image();
   CLEAR.src = "image.CLEAR.png";
   viewcontext.drawImage(CLEAR, 0, 0);
}
function stageview() {
   stageimg.src = "image/stage"+stage+".png";
   viewcontext.drawImage(stageimg, 0, 0);
}

document.addEventListener('keydown',function(event){
      if(event.keyCode == 13 && Enter == 0){  //enter
         bgm.play();
         viewcontext.clearRect(0,0,1200,600);
		 clearInterval(firstpage);
         s = setInterval(stageview, 13);
         clearInterval(l);
         player = new hero(5,10,1);
         max=0;
         maxcount=0;
         makeEnemy();
         Enter = 1;
		 esccheck = 1;
         setTimeout(function() {
            clearInterval(s);
			 esccheck = 0;
            start = setInterval(game, 13);
         }, 2000);

      }
      if(event.keyCode == 27 && esccheck == 0){  //esc
         viewcontext.clearRect(0,0,1200,600);
         clearInterval(firstpage);
         clearInterval(l);
         clearInterval(start);  // 게임 종료
         e = [];
         player.version=0;
         stage =1;
         bossm = new boss(stage);
         alert("restart");
         go();
      }
    if(event.keyCode == 32 && Enter == 1 && player.doatk == 0){  //spacebar
      //모션
      hit.play();
      player.doatk = 1;
      setTimeout(function() { player.doatk = 0}, 1000);
      for(var i =0; i < max; i++) { //데미지 계산
         if(e[i].xpos >= player.xpos + 40 - e[i].w && e[i].xpos <= player.xpos + 40 + player.w) {
            if(e[i].ypos >= player.ypos-e[i].h && e[i].ypos <= player.ypos+player.h) {
               //이펙트
               player.atkedpl = 1;
               setTimeout(function() {player.atkedpl = 0}, 100);
               if(e[i].atked(player.atk) == 0){
                  kill++;
                  e.splice(i, 1);
                  max--;
               }
            }
         }
      }
      if(bossm.xpos >= player.xpos + 40 - bossm.w && bossm.xpos <= player.xpos + 40 + player.w) {
            if(bossm.ypos >= player.ypos - bossm.h && bossm.ypos <= player.ypos+player.h) {
               //이펙트

               player.atkedpl = 1;
               setTimeout(function() {player.atkedpl = 0}, 100);
               if(bossm.atked(player.atk) == 0){
					graphstage = stage+1;
					kill++;
                  clearInterval(start);
                  switch(stage) {
                     case 3:
                        clear.play();
                        c = setInterval(clearview, 13);
                        Enter = 0;
                        stage = 1;
                        bossm = new boss(stage);
                        setTimeout(function() {
                           clearInterval(c);
                           go();
                        }, 2000);
                        break;
                     case 1:
                        player.version=1;
                     default :
                        stage += 1;
                        bossm = new boss(stage);
                        Enter = 0;
                        max = 0;
                        maxcount = 0;
                        makeEnemy();
                        s = setInterval(stageview, 13);
                        setTimeout(function() {
                           clearInterval(s);
                           Enter = 1;
                           start = setInterval(game, 13);
                        }, 2000);
                        break;
                  }
               }
            }
      }

    }
});
function first() {
   xcount++; //배경 지나온 길이
   if(xcount >= 7949) //그림 끝에 도달하면 첨부터
      xcount=0;
   bufcontext.drawImage(BG, xcount,0 ,viewcanvas.width, viewcanvas.height, 0, 0, viewcanvas.width, viewcanvas.height); //배경으로 채우기
   bufcontext.drawImage(anykey,200,380);
   bufcontext.drawImage(logo,335,10);
   viewcontext.drawImage(bufcanvas, 0, 0);
}

function checkHit(){
      for(var i =0; i <max; i++) {
         if(e[i].xpos >= player.xpos-e[i].w && e[i].xpos <= player.xpos+player.w) {
            if(e[i].ypos >= player.ypos-e[i].h && e[i].ypos <= player.ypos+player.h) {
               //이펙트
               behit.play();
               player.atkedEn = 1;
               setTimeout(function() {player.atkedEn = 0}, 100);
               if(player.atked(e[i].atk) == 0){
                  fail.play();
                  l = setInterval(lose, 15);
               }
               e.splice(i, 1);
               max--;
               player.imm = 1;
               setTimeout(function() { player.imm = 0}, 3000); //3초후 무적 끝
               return 0;
            }
         }
      }
      if(bossm.xpos >= player.xpos-bossm.w && bossm.xpos <= player.xpos+player.w) {
         if(bossm.ypos >= player.ypos - bossm.h && bossm.ypos <= player.ypos+player.h) {
            //이펙트
            behit.play();
            player.atkedEn = 1;
            setTimeout(function() {player.atkedEn = 0}, 100);
            player.imm = 1;
            setTimeout(function() { player.imm = 0}, 3000); //3초후 무적 끝
            if(player.atked(bossm.atk) == 0){
               fail.play();
               l = setInterval(lose, 15);
            }
         return 0;
         }
      }
}

function makeEnemy(){ //적 생성
      for(var i=0; i < 15; i++) {

         while(preNum == ranNum) {
            ranNum = Math.floor(Math.random()*10);
            if(preNum == ranNum)
               ranNum = Math.floor(Math.random()*10);
         }
         e.push(new enemy(ranNum*60, stage));
         preNum = ranNum;
      }
}

function moveEnemy() {
      if(max >= e.length)
         max = e.length;
      else {
         maxcount++;
         if(maxcount%110==0)
            max++;
      }

      for(var i=0; i < max; i++) {
         if(e[i].move() == 1) {
            if(player.atked(1) == 0) {
               fail.play();
               l = setInterval(lose, 15);
            }
            moveend.play();
            e.splice(i, 1);
            max--;
         }

      }


      if(e.length == 0) {

         if(bossm.entercheck){ //등장
            bossm.enter();
         }
         else if(bossm.atkdone == 1) {
            bosss.play();
            switch(bossm.pattern) {
               case 1:
                  bossm.atkpattern(1);
                  break;
               case 2:
                  bossm.atkpattern(2);
                  break;
            }
         }
         else {
            bossm.move();
            bossm.pattern = Math.floor(Math.random()*2+1);
            bossm.atkdone = Math.floor(Math.random()*300);
         }
      }
}

function game() {
   if(player.imm == 0)
      checkHit();
   display();
}

function display() {
      xcount++; //배경 지나온 길이
      if(xcount >= 7949) //그림 끝에 도달하면 첨부터
         xcount=0;
      bufcontext.drawImage(BG, xcount,0 ,viewcanvas.width, viewcanvas.height, 0, 0, viewcanvas.width, viewcanvas.height); //배경으로 채우기
      moveEnemy();
      player.move();
      player.showHpbar();
      if(bossm.entercheck == 0)
         bossm.showHpbar();
      viewcontext.drawImage(bufcanvas, 0, 0);
}
