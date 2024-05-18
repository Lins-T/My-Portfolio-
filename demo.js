'use strict';
const hourInput = document.querySelector('#hour');
const minuteInput = document.querySelector('#minute')
const editInputs = document.querySelectorAll('.editInputs')

let hourList = document.querySelector('.hours');

//Dunno why its working, but somehow the Element there is setting the dateSetter type to an Element typeOf
let defTime = [];

const hourContainer = document.querySelector('.hourContainer');
const minuteContainer = document.querySelector('.minuteContainerr');

const meridean = document.querySelector('.meridean-Wrapper');

let indexHour = NaN;
let indexMin = NaN;

const timeSetter = {
  hourList: document.querySelector('.hours'),
  minuteList: document.querySelector('.minutes'),

  timeList: (hour, minute) => {
    let now = moment();


    for (let i = 0; i < 12; i++) {
      let list = document.createElement('li')
      list.classList.add('hh')
      list.innerHTML = `${i}`

      if (i === 9) {
        list.classList.add('default');
      }

      hour.appendChild(list);
    }

    for (let i = 0; i < 60; i++) {
      let list = document.createElement('li')
      list.classList.add('mm')
      list.innerHTML = `${i}`

      if (i === 0) {
        list.classList.add('default');
      }

      minute.appendChild(list);
    }

    hourList: hour;
    hourList.scrollBy(30 * 10, 0)
    minuteList: minute;
    defTime = Array.from(document.querySelectorAll('.default'))
  },



  toolBar: document.querySelector('.timeTool'),
  timeTool: (toolBar) => {
    toolBar.addEventListener('click', (btn) => {
      if (btn.target.classList.contains('set')) {
        alert('set')
      }
    })
  },


  activeMed: 'active-meridean',
  am: meridean.children[0],
  pm: meridean.children[1],

  merideanEvents: (am, pm, activeMed) => {
    meridean.addEventListener('click', btn => {
      if (btn.target.dataset.name == 'am') {
        am.classList.add(activeMed)
        pm.classList.remove(activeMed)
      }
      if (btn.target.dataset.name == 'pm') {
        pm.classList.add(activeMed)
        am.classList.remove(activeMed)
      }
    })
  },

  control1: document.querySelectorAll('.controlHour'),
  control2: document.querySelectorAll('.controlMin'),

  timeHou: (hourButton, hour, def) => {
    let array = Array.from(hourButton)

    array.forEach(addButton => {
      if (addButton.classList.contains('subHour')) {
        timeHour(addButton, hour, def)
      } else if (addButton.classList.contains('addHour')) {
        timeHour(addButton, hour, def)
      }
    })
  },

  timeMin: (minuteButton, minute, def) => {
    let array = Array.from(minuteButton)

    array.forEach(subButton => {
      if (subButton.classList.contains('subMin')) {
        timeMinute(subButton, minute, def)
      } else if (subButton.classList.contains('addMin')) {
        timeMinute(subButton, minute, def)
      }
    })
  },

}

function timeHour(button, array, def) {
  array = Array.from(array.children)
  let deft = undefined;

  if (array.includes(def)) {
    deft = def
  }

  indexHour = array.indexOf(deft)

  button.addEventListener('click', btn => {
    if (btn.target.classList.contains('subHour') && indexHour >= 1) {
      array[indexHour].classList.remove('default')
      array[indexHour - 1].classList.add('default')
      array[indexHour - 1].scrollIntoView({ behavior: 'smooth' })
      hourInput.value = array[indexHour - 1].textContent.trim()
      indexHour = array.indexOf(array[indexHour - 1])
    }

    if (btn.target.classList.contains('addHour') && indexHour < array.length - 1) {
      array[indexHour].classList.remove('default')
      array[indexHour + 1].classList.add('default')
      array[indexHour + 1].scrollIntoView({ behavior: 'smooth' })
      hourInput.value = array[indexHour + 1].textContent.trim()
      indexHour = array.indexOf(array[indexHour + 1])
    }
  })
}

function timeMinute(button, array, def) {
  array = Array.from(array.children)
  let deft = undefined;

  if (array.includes(def)) {
    deft = def
  }

  indexMin = array.indexOf(deft);

  button.addEventListener('click', btn => {
    if (btn.target.classList.contains('subMin') && indexMin >= 1) {
      array[indexMin].classList.remove('default')
      array[indexMin - 1].classList.add('default')
      array[indexMin - 1].scrollIntoView({ behavior: 'smooth' })
      minuteInput.value = array[indexMin - 1].textContent.trim()
      indexMin = array.indexOf(array[indexMin - 1])
    }

    if (btn.target.classList.contains('addMin') && indexMin < array.length - 1) {
      array[indexMin].classList.remove('default')
      array[indexMin + 1].classList.add('default')
      array[indexMin + 1].scrollIntoView({ behavior: 'smooth' })
      minuteInput.value = array[indexMin + 1].textContent.trim()
      indexMin = array.indexOf(array[indexMin + 1])
    }
  })
}

function inputSelect(input) {
  Array.from(input).forEach(input => {
    input.addEventListener('click', btn => {
      btn.target.select()
    })
  })
}
inputSelect(editInputs)

timeSetter.timeList(
  timeSetter.hourList,
  timeSetter.minuteList)
timeSetter.timeTool(timeSetter.toolBar)

timeSetter.merideanEvents(
  timeSetter.am,
  timeSetter.pm,
  timeSetter.activeMed);

timeSetter.timeHou(
  timeSetter.control1,
  timeSetter.hourList,
  defTime[0]);

timeSetter.timeMin(
  timeSetter.control2,
  timeSetter.minuteList,
  defTime[1]);


const dateSetter = {
  dateContainer: document.querySelector('.dateSetter'),
  months: document.querySelector('.months'),
  activeMonth: document.querySelector('.activeMonth'),
  dateFormat: document.querySelector('.dateFormat').children,
  week: document.querySelector('.week'),
  day: document.querySelector('.day'),
  navButtons: Array.from(document.querySelectorAll('.button')),
  monthDialouge: document.querySelector('.dialog'),
  date: moment(),

  weekDays: function () {
    let date = moment();
    for (let i = 0; i < 12; i++) {
      date.set('month', i)
      let list = document.createElement('li');
      list.classList.add('monthOption')
      list.setAttribute('data-month-index', (Number.parseInt(date.format('MM')) - 1).toString())

      list.innerHTML = `${date.format('MMM')}`
      this.monthDialouge.appendChild(list)
    }

    for (let i = 0; i < 7; i++) {
      date.set('day', i)

      let list = document.createElement('li');
      list.classList.add('days', 'calenderItem')
      list.innerHTML = `${date.format('ddd')}`;
      this.week.appendChild(list)
    }
  },

  dayDate: function (argument) {
    let date = this.date;

    date.set('month', argument)
    //console.log(date.format('MMM DD dd'))

    for (let i = 1; i <= date.daysInMonth(); i++) {
      date.set('date', i)
      let list = document.createElement('li');
      list.classList.add('dayDate', 'calenderItem');
      list.setAttribute('data-day-index', date.day())//moment().day() )
      list.innerHTML = `${date.format('DD')}`;

      if (i === 1) {
        list.classList.add('one')

        var dayx = `1 / 1 / 2 / ${Number.parseInt(list.dataset.dayIndex) + 2}`;
        document.documentElement.style.setProperty('--yas', dayx)
      }

      if (i === Number.parseInt((moment().format('D')))) {
        list.classList.add('dayDate', 'calenderItem', 'active')
      }

      this.day.appendChild(list)
    };

    this.one = document.querySelector('.one');
  },

  //Calender Formats 
  ddd: document.querySelector('.ddd'),
  MMM: document.querySelector('.MMM'),
  DDD: document.querySelector('.DDD'),
  YYY: document.querySelector('.YYY'),

  eventListener: function () {

    const arg1 = Array.from(this.monthDialouge.children).forEach(mont => {
      mont.addEventListener('click', btn => {
        this.date.set('month', btn.target.dataset.monthIndex)
        this.MMM.innerHTML = `${this.date.format('MMM')}`
        this.ddd.innerHTML = `${this.date.format('ddd')},`
        this.day.innerHTML = '';
        this.dayDate(btn.target.dataset.monthIndex)
        this.activeMonth.innerHTML = `${this.date.format('MMM')}`
        this.eventListener()[0]
      })
    })

    let current;
    
    const arg2 = Array.from(this.day.children).forEach(day => {
      let bool = Array.from(this.day.children).some(e => e.classList.contains('active'))
      if (bool) {
        day.classList.remove('active')
        alert
      }
      day.addEventListener('click', btn => {
        this.date.set('date', Number.parseInt(btn.target.textContent.trim()))
        this.ddd.innerHTML = `${this.date.format('ddd')} ,`
        this.MMM.innerHTML = `${this.date.format('MMM')}`
        this.DDD.innerHTML = `${this.date.format('DD')} `
        this.YYY.innerHTML = `${this.date.format('YYYY')} `

        current = btn.target;
        this.eventListener()[1]
        console.log(this.eventListener())
        btn.target.classList.add('active')
      })
    })

    return [arg1, arg2]

  }
}


function setDefaultDate() {
  const date = this.date;
  this.ddd.innerHTML = `${date.format('ddd')} ,`
  this.MMM.innerHTML = `${date.format('MMM')}`
  this.DDD.innerHTML = `${date.format('DD')} `
  this.YYY.innerHTML = `${date.format('YYYY')} `
}

setDefaultDate.call(dateSetter)
const fcn1 = dateSetter.weekDays.bind(dateSetter)
const fcn2 = dateSetter.dayDate.bind(dateSetter)
const fcn3 = dateSetter.eventListener.bind(dateSetter)

fcn1()
fcn2(moment().month())
fcn3()