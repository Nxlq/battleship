/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={d:(o,t)=>{for(var r in t)e.o(t,r)&&!e.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:t[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};e.d({},{C:()=>m});const o=e=>{let o=0;return{length:e,isSunk:!1,hit:function(){return o+=1,o},getHitCount:function(){return console.log(o),o},checkIfSunk:function(){return e-o<=0}}},t=()=>{let e=!1;const t=[],r=[];function n(){e=!0!==e}const i={carrier:o(5),battleship:o(4),cruiser:o(3),submarine:o(3),destroyer:o(2)};let s=0;function l(){return s}const c=new Map([]);for(let e=0;e<10;e+=1)for(let o=0;o<10;o+=1)c.set([e,o].toString(),"water");const a=()=>0!==Object.values(i).filter((e=>!e.checkIfSunk())).length;return{getBoard:()=>(console.log(c),c),setShip:(e,o,t="h")=>{if(console.log({coord:e,ship:o,direction:t}),!function(e,o,t){const r=i[o].length,n="h"===t?[e[0],e[1]+(r-1)]:[e[0]+(r-1),e[1]];return n[0]>=0&&n[0]<=9&&n[1]>=0&&n[1]<=9}(e,o,t))return console.error("invalid placement position");const r=i[o].length;for(let n=0;n<r;n+=1){const r="h"===t?[e[0],e[1]+n]:[e[0]+n,e[1]];if(console.log({coord:e,coordsToSet:r}),"water"!==c.get(r.toString()))return console.error("invalid coords: cannot place ships on top of each other");c.set(r.toString(),o),s+=1,console.log(l())}return!0},logShips:()=>{console.log(i)},receiveAttack:o=>{if(!e)return console.log("board can not be currently attacked"),!1;const s=o.toString();return!t.includes(s)&&(!r.includes(s)&&("water"!==c.get(s)?(i[c.get(s)].hit(),t.push(s),a()?(n(),c.get(s)):"game over"):(r.push(o.toString()),n(),c.get(s))))},getShipHitcount:function(e){return i[e].getHitCount()},missedAttacks:r,hasShipsAlive:a,toggleBoardState:n,isBoardActive:()=>(console.log(e),e),getShipsPlacedCount:l}},r=document.getElementById("btn-start-game"),n=document.querySelectorAll(".game-board"),i=document.querySelectorAll('[draggable="true"]'),s=document.querySelector(".game-board.one"),l=(document.querySelector(".game-board.two"),document.querySelector(".game-container.one")),c=document.querySelector(".game-container.two"),a=(document.querySelector("body"),{piecesToTheRight:null,shipLength:null,piecesToTheLeft:null,shipDirection:"h",shipType:null,curCoord:null,shipHeadCoord:null,isDragging:!1,verticalHoverElArr:null,horizontalHoverElArr:null});function d(e){[...s.children].forEach((o=>{const t=e.get(o.attributes.coords.value);"water"===t&&(o.classList.remove("hovered"),o.classList.add("water")),"water"!==t&&(o.classList.remove("hovered"),function(e){e.classList.add("ship")}(o))}))}function g(e){console.log("start",e),[a.shipType]=e.target.classList,a.shipDirection="h",a.verticalHoverElArr=null,a.horizontalHoverElArr=null}function h(e){}function u(e){if(e.preventDefault(),console.log("over"),!0===e.ctrlKey?a.shipDirection="v":a.shipDirection="h","h"===a.shipDirection){a.verticalHoverElArr?.forEach((e=>e.classList.remove("hovered"))),e.target.classList.add("hovered");const o=[];o.push(e.target);let t=e.target.nextElementSibling;for(let e=0;e<a.piecesToTheRight;e+=1)t.classList.add("hovered"),o.push(t),console.log(o),t=t.nextElementSibling;const r=a.shipLength-(a.piecesToTheRight+1);let n=e.target.previousElementSibling;for(let e=0;e<r;e+=1)n.classList.add("hovered"),o.push(n),n=n.previousElementSibling;a.horizontalHoverElArr=o}if("v"===a.shipDirection){a.horizontalHoverElArr.forEach((e=>e.classList.remove("hovered")));const o=[];o.push(e.target),e.target.classList.add("hovered");for(let e=0;e<a.piecesToTheLeft;e+=1){const t=document.querySelector(`[coords="${a.curCoord[0]-(e+1)},${a.curCoord[1]}"]`);t.classList.add("hovered"),o.push(t)}for(let e=0;e<a.piecesToTheRight;e+=1){const t=document.querySelector(`[coords="${a.curCoord[0]+(e+1)},${a.curCoord[1]}"]`);t.classList.add("hovered"),o.push(t)}a.verticalHoverElArr=o,console.log(a.verticalHoverElArr)}}function p(e){e.preventDefault(),console.log("enter"),console.log("TARGET",e.target),console.log(e.target.nextElementSibling),a.curCoord=this.getAttribute("coords").split(",").map((e=>+e))}function v(e){console.log("leave"),console.log("TARGET",e.target),console.log(a.curCoord);const o=e.target.getAttribute("coords").split(",").map((e=>+e));if(e.target.classList.remove("hovered"),"h"===a.shipDirection){let o=e.target.nextElementSibling;for(let e=0;e<a.piecesToTheRight;e+=1)o.classList.remove("hovered"),o=o.nextElementSibling;const t=a.shipLength-(a.piecesToTheRight+1);let r=e.target.previousElementSibling;for(let e=0;e<t;e+=1)r.classList.remove("hovered"),r=r.previousElementSibling}if("v"===a.shipDirection){for(let e=0;e<a.piecesToTheLeft;e+=1)document.querySelector(`[coords="${o[0]-(e+1)},${o[1]}"]`).classList.remove("hovered");for(let e=0;e<a.piecesToTheRight;e+=1)document.querySelector(`[coords="${o[0]+(e+1)},${o[1]}"]`).classList.remove("hovered")}}function f(e){console.log(e.target,"!!!!!!!");const o=document.querySelector(`.${a.shipType}`);if(a.shipHeadCoord="h"===a.shipDirection?[a.curCoord[0],a.curCoord[1]-a.piecesToTheLeft]:[a.curCoord[0]-a.piecesToTheLeft,a.curCoord[1]],console.log(a.shipHeadCoord),console.log(e.target),console.log(a),!m.gameboard.setShip(a.shipHeadCoord,a.shipType,a.shipDirection))return console.log("UNSUCCESSFUL"),d(m.gameboard.getBoard()),void o.classList.remove("invisible");console.log("drop"),this.classList.remove("hovered"),this.classList.add("ship"),o.classList.add("invisible"),d(m.gameboard.getBoard())}i.forEach((e=>{console.log(e),e.addEventListener("dragstart",g),e.addEventListener("dragend",h),e.addEventListener("mousedown",(e=>{console.log(e),function(e){const o=e.parentElement.getAttribute("data-length");let t=0,r=e;for(;r.nextElementSibling;)console.log(r.nextElementSibling),r=r.nextElementSibling,t+=1;a.piecesToTheRight=t,a.shipLength=o,a.piecesToTheLeft=a.shipLength-(a.piecesToTheRight+1)}(e.target)}))}));const m={gameboard:t()},b=(()=>{const e=t();function o(e,o){return Math.floor(Math.random()*(o-e+1)+1)}return{gameboard:e,getValidCoords:function(){let t=[o(0,9),o(0,9)];for(;e.missedAttacks.includes(t.toString());)t=[o(0,9),o(0,9)];return t}}})();function L(){return m.gameboard.isBoardActive()?(l.style.backgroundColor="#9c0000",void(c.style.backgroundColor="black")):b.gameboard.isBoardActive()?(c.style.backgroundColor="#9c0000",void(l.style.backgroundColor="black")):"error neither board is active?"}window.addEventListener("DOMContentLoaded",(()=>{n.forEach((e=>{const o=[...e.children];let t=0,r=0;o.forEach((e=>{r>9&&(r=0,t+=1),e.setAttribute("coords",`${t},${r}`),r+=1}))})),console.log(s.childNodes),s.childNodes.forEach((e=>{e.addEventListener("dragover",u),e.addEventListener("dragenter",p),e.addEventListener("dragleave",v),e.addEventListener("drop",f)}))})),r.addEventListener("click",(()=>{m.gameboard.getBoard(),b.gameboard.getBoard()})),n.forEach((e=>{e.addEventListener("click",L)}))})();
//# sourceMappingURL=main.js.map