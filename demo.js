'use strict';
const timeSetter = document.querySelector('.timeSetter');
let childArray = new Array;
const add = document.createElement('div'),
  sub = document.createElement('div');

add.innerHTML = '+';
add.classList.add('add', 'controls')
sub.innerHTML = '-';
sub.classList.add('sub', 'controls')

const done = document.querySelector('.set');
const hourLi = document.querySelector('.hourList');

let hHeight = NaN;
let activity = undefined
let hourVal = undefined;
let hList = hours.children[0]
let rect = hList.getClientRects()
let rectY = rect[0].y = 250;

let bolean = undefined;


timeSetter.addEventListener('click', btn => {
  if (btn.target.id === 'hour') {
    //alert('hour')
    controls(btn.target)
    let panel = btn.target
    panel.after(add)
    panel.before(sub)

  }

  if (btn.target.id === 'minute') {
   // alert('minute')
    controls(btn.target)
    let panel = btn.target
    panel.after(add)
    panel.before(sub)
  }


})


function controls(panel) {

  let panelArray = Array.from(panel.children)

  childArray = Array.from(panel.children);
  console.log(panelArray)

  bolean = panelArray.some(inputs => {

    if (inputs.classList.contains('first') && inputs.classList.contains('last')) {
      return true
    }
  })

  if (bolean) {
    panelArray.forEach(input => {
      panelArray.children[0].classList.remove('first')
      panelArray.children[input.children.length - 1].classList.remove('last')
    })
  }
  childArray[0].classList.add('first')
  childArray[childArray.length - 1].classList.add('last')

  addSub(panel)
  getAdd(panel);
}

function addSub(input) {
  activity = input;

  //document.querySelector('.add')
  add.addEventListener('click', () => {
    getAdd(activity.children);
    hHeight = rect[0].height;
    activity.scrollBy(0, hHeight);
    hHeight += hHeight;
  })

  //document.querySelector('.sub')
  sub.addEventListener('click', () => {
    hHeight = rect[0].height;
    activity.scrollBy(0, -hHeight);
    hHeight += hHeight;
    getSub(activity.children);
  })
}

function getAdd(obj) {
  let parent = Array.from(obj)

  for (let child of parent) {
    setTimeout(() => {
      let childRect = child.getClientRects();
      let childY = childRect[0].y
      if (childY > rectY && childY < rectY + 50) {
        hourVal = child.innerHTML;
        if (child.classList.contains('last')) {
          child.after(childArray[0])
        } else {
          child.after(childArray[childArray.indexOf(child) + 1])
        }
      }
    }, 500)
  }
}


function getSub(obj) {
  let parent = obj

  for (let child of parent) {
    setTimeout(() => {
      let childRect = child.getClientRects();
      let childY = childRect[0].y
      if (childY > rectY && childY < rectY + 50) {
        hourVal = child.innerHTML;
        if (child.classList.contains('first')) {
          child.before(childArray[childArray.length - 1])
        } else if (child.classList.contains('last')) {
          child.before(childArray[childArray.indexOf(child) - 1])
        } else {
          child.before(childArray[childArray.indexOf(child) - 1])
        }
      }
    }, 500)
  }
}

done.addEventListener('click', () => {
  console.log(hourVal)
  alert(hourVal)
})



