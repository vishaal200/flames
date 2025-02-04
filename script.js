"use strict";

const view = document.querySelector(".button");
const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const overlay_bg = document.querySelector(".overlay");
const overlay = document.querySelector(".result");
const heart = document.querySelector(".heart");
const close = document.querySelector(".close-btn");

let f_name;
let s_name;

let flames = ["F", "L", "A", "M", "E", "S"];
const desc = {
  F: "Friendship",
  L: "Love",
  A: "Affection",
  M: "Marriage",
  E: "Enemy",
  S: "Sister",
};

close.addEventListener("click", function () {
  overlay_bg.style.display = "none";
  heart.style.display = "none";
  overlay.style.display = "none";
  name1.value = "";
  name2.value = "";
});

view.addEventListener("click", function () {
  f_name = name1.value;
  s_name = name2.value;

  f_name = f_name.toUpperCase();
  s_name = s_name.toUpperCase();

  const count = calculateCount(f_name, s_name);

  let flames1 = [...flames];
  const letter = findResult(count, flames1);
  console.log(letter);

  document.querySelector(".desc").textContent = desc[letter];
  overlay_bg.style.display = "block";
  heart.style.display = "block";
  overlay.style.display = "flex";
});

function calculateCount(name1, name2) {
  const count1 = {};
  const count2 = {};
  let count = 0;
  for (let i = 0; i < name1.length; i++) {
    if (name1[i] == " ") continue;
    if (count1[name1[i]]) {
      count1[name1[i]]++;
    } else {
      count1[name1[i]] = 1;
    }
  }

  for (let i = 0; i < name2.length; i++) {
    if (name2[i] == " ") continue;
    if (count2[name2[i]]) {
      count2[name2[i]]++;
    } else {
      count2[name2[i]] = 1;
    }
  }

  const key1 = Object.keys(count1);
  const key2 = Object.keys(count2);
  //   console.log(key1);
  //   console.log(key2);
  for (let i of key1) {
    const ele = count2[i] ? count2[i] : 0;
    count += Math.abs(count1[i] - ele);
  }

  for (let i of key2) {
    if (key1.includes(i)) continue;

    count += count2[i];
    // console.log(i + ":" + count);
  }

  return count;
}

function findResult(count, arr) {
  let inx = 0;
  while (arr.length > 1) {
    inx = (inx + count - 1) % arr.length;
    arr.splice(inx, 1);
  }
  return arr[0];
}
