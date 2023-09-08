/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{C:()=>T,o:()=>y});const t=e=>{let t=0;return{length:e,isSunk:!1,hit:function(){return t+=1,t},getHitCount:function(){return console.log(t),t},checkIfSunk:function(){return e-t<=0}}},o=()=>{let e=!1;const o=[],r=[];function n(){e=!0!==e}const s={carrier:t(5),battleship:t(4),cruiser:t(3),submarine:t(3),destroyer:t(2)};let i=0;function c(){return i}const l=new Map([]);for(let e=0;e<10;e+=1)for(let t=0;t<10;t+=1)l.set([e,t].toString(),"water");const a=()=>0!==Object.values(s).filter((e=>!e.checkIfSunk())).length;return{getBoard:()=>(console.log(l),l),setShip:(e,t,o="h")=>{if(console.log({coord:e,ship:t,direction:o}),!function(e,t,o){const r=s[t].length,n="h"===o?[e[0],e[1]+(r-1)]:[e[0]+(r-1),e[1]];return n[0]>=0&&n[0]<=9&&n[1]>=0&&n[1]<=9}(e,t,o))return console.error("invalid placement position");const r=s[t].length,n=[];for(let t=0;t<r;t+=1){const r="h"===o?[e[0],e[1]+t]:[e[0]+t,e[1]];if(console.log({coord:e,coordsToSet:r}),"water"!==l.get(r.toString()))return console.error("invalid coords: cannot place ships on top of each other");n.push(r)}return n.forEach((e=>l.set(e.toString(),t))),i+=1,console.log(c()),!0},logShips:()=>{console.log(s)},receiveAttack:t=>{if(!e)return console.log("board can not be currently attacked"),!1;const i=t.toString();return!o.includes(i)&&(!r.includes(i)&&("water"!==l.get(i)?(s[l.get(i)].hit(),o.push(i),a()?(n(),l.get(i)):"game over"):(r.push(t.toString()),n(),l.get(i))))},getShipHitcount:function(e){return s[e].getHitCount()},missedAttacks:r,hasShipsAlive:a,toggleBoardState:n,isBoardActive:()=>(console.log(e),e),getShipsPlacedCount:c}},r=document.getElementById("btn-start-game"),n=document.querySelectorAll(".game-board"),s=document.querySelectorAll('[draggable="true"]'),i=document.querySelector(".game-board.one"),c=(document.querySelector(".game-board.two"),document.querySelector(".game-container.one")),l=document.querySelector(".game-container.two"),a=document.querySelector("body"),d={piecesToTheRight:null,shipLength:null,piecesToTheLeft:null,shipDirection:"h",shipType:null,curCoord:null,shipHeadCoord:null,isDragging:!1,verticalHoverElArr:null,horizontalHoverElArr:null};function g(e){e.classList.add("water")}function h(e){e.classList.add("ship")}function u(){return T.gameboard.isBoardActive()?(c.style.backgroundColor="#9c0000",void(l.style.backgroundColor="black")):y.gameboard.isBoardActive()?(l.style.backgroundColor="#9c0000",void(c.style.backgroundColor="black")):"error neither board is active?"}function p(){a.style.backgroundColor="red"}function v(e){[...i.children].forEach((t=>{const o=e.get(t.attributes.coords.value);"water"===o&&(t.classList.remove("hovered"),g(t)),"water"!==o&&(t.classList.remove("hovered"),h(t))}))}function m(e){console.log("start",e),[d.shipType]=e.target.classList,d.shipDirection="h",d.verticalHoverElArr=null,d.horizontalHoverElArr=null}function f(e){}function b(e){if(e.preventDefault(),console.log("over"),!0===e.ctrlKey?d.shipDirection="v":d.shipDirection="h","h"===d.shipDirection){d.verticalHoverElArr?.forEach((e=>e.classList.remove("hovered"))),e.target.classList.add("hovered");const t=[];t.push(e.target);let o=e.target.nextElementSibling;for(let e=0;e<d.piecesToTheRight;e+=1)o.classList.add("hovered"),t.push(o),console.log(t),o=o.nextElementSibling;const r=d.shipLength-(d.piecesToTheRight+1);let n=e.target.previousElementSibling;for(let e=0;e<r;e+=1)n.classList.add("hovered"),t.push(n),n=n.previousElementSibling;d.horizontalHoverElArr=t}if("v"===d.shipDirection){d.horizontalHoverElArr.forEach((e=>e.classList.remove("hovered")));const t=[];t.push(e.target),e.target.classList.add("hovered");for(let e=0;e<d.piecesToTheLeft;e+=1){const o=document.querySelector(`[coords="${d.curCoord[0]-(e+1)},${d.curCoord[1]}"]`);o.classList.add("hovered"),t.push(o)}for(let e=0;e<d.piecesToTheRight;e+=1){const o=document.querySelector(`[coords="${d.curCoord[0]+(e+1)},${d.curCoord[1]}"]`);o.classList.add("hovered"),t.push(o)}d.verticalHoverElArr=t,console.log(d.verticalHoverElArr)}}function S(e){e.preventDefault(),console.log("enter"),console.log("TARGET",e.target),console.log(e.target.nextElementSibling),d.curCoord=this.getAttribute("coords").split(",").map((e=>+e))}function E(e){console.log("leave"),console.log("TARGET",e.target),console.log(d.curCoord);const t=e.target.getAttribute("coords").split(",").map((e=>+e));if(e.target.classList.remove("hovered"),"h"===d.shipDirection){let t=e.target.nextElementSibling;for(let e=0;e<d.piecesToTheRight;e+=1)t.classList.remove("hovered"),t=t.nextElementSibling;const o=d.shipLength-(d.piecesToTheRight+1);let r=e.target.previousElementSibling;for(let e=0;e<o;e+=1)r.classList.remove("hovered"),r=r.previousElementSibling}if("v"===d.shipDirection){for(let e=0;e<d.piecesToTheLeft;e+=1)document.querySelector(`[coords="${t[0]-(e+1)},${t[1]}"]`).classList.remove("hovered");for(let e=0;e<d.piecesToTheRight;e+=1)document.querySelector(`[coords="${t[0]+(e+1)},${t[1]}"]`).classList.remove("hovered")}}function L(e){console.log(e.target,"!!!!!!!");const t=document.querySelector(`.${d.shipType}`);if(d.shipHeadCoord="h"===d.shipDirection?[d.curCoord[0],d.curCoord[1]-d.piecesToTheLeft]:[d.curCoord[0]-d.piecesToTheLeft,d.curCoord[1]],console.log(d.shipHeadCoord),console.log(e.target),console.log(d),!T.gameboard.setShip(d.shipHeadCoord,d.shipType,d.shipDirection))return console.log("UNSUCCESSFUL"),v(T.gameboard.getBoard()),void t.classList.remove("invisible");console.log("drop"),this.classList.remove("hovered"),this.classList.add("ship"),t.classList.add("invisible"),v(T.gameboard.getBoard()),5===T.gameboard.getShipsPlacedCount()&&(5===T.gameboard.getShipsPlacedCount()&&n.forEach((e=>{const t=[...e.children];e.addEventListener("click",u),t.forEach((e=>e.addEventListener("click",(e=>{if(!e.target.classList.contains("coord-square"))return;const t=e.target.attributes.coords.value;if(console.log(t),e.target.parentElement.classList.contains("one")){const o=T.gameboard.receiveAttack(t);if(!o)return;"game over"===o&&p(),function(e){const t=document.createElement("div");t.classList.add("marked"),e.appendChild(t)}(e.target),y.gameboard.toggleBoardState()}else{const o=y.gameboard.receiveAttack(t);if(!o)return;"water"===o&&g(e.target),"water"!==o&&h(e.target),"game over"===o&&p(),T.gameboard.toggleBoardState()}}))))})),y.gameboard.toggleBoardState(),u())}s.forEach((e=>{console.log(e),e.addEventListener("dragstart",m),e.addEventListener("dragend",f),e.addEventListener("mousedown",(e=>{console.log(e),function(e){const t=e.parentElement.getAttribute("data-length");let o=0,r=e;for(;r.nextElementSibling;)console.log(r.nextElementSibling),r=r.nextElementSibling,o+=1;d.piecesToTheRight=o,d.shipLength=t,d.piecesToTheLeft=d.shipLength-(d.piecesToTheRight+1)}(e.target)}))}));const T={gameboard:o()},y=(()=>{const e=o();function t(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function r(){return 0===t(0,1)?"h":"v"}function n(){return[t(0,9),t(0,9)]}return{gameboard:e,placeShipsRandomly:function(){const t={carrier:r(),battleship:r(),cruiser:r(),submarine:r(),destroyer:r()};Object.entries(t).forEach((t=>{const[o,r]=t;console.log(o,r);let s=e.setShip(n(),o,r);for(;!s;)s=e.setShip(n(),o,r)}))}}})();y.placeShipsRandomly(),y.gameboard.getBoard(),window.addEventListener("DOMContentLoaded",(()=>{n.forEach((e=>{const t=[...e.children];let o=0,r=0;t.forEach((e=>{r>9&&(r=0,o+=1),e.setAttribute("coords",`${o},${r}`),r+=1}))})),console.log(i.childNodes),i.childNodes.forEach((e=>{e.addEventListener("dragover",b),e.addEventListener("dragenter",S),e.addEventListener("dragleave",E),e.addEventListener("drop",L)}))})),r.addEventListener("click",(()=>{T.gameboard.getBoard(),y.gameboard.getBoard()}))})();
//# sourceMappingURL=main.js.map