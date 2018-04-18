const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDuration = time => {

  time = parseInt(time)

  var hours = parseInt(time / 3600)

  var minus = parseInt(time / 60)

  var seconds = time % 60

  var timeStr = (minus > 10 ? minus : '0' + minus) + ":" + (seconds > 9 ? seconds : '0' + seconds);
  
  if (hours > 0) {

    timeStr = (hous > 10 ? hours : '0' + hours) + ":" + timeStr

  }

  return timeStr

}

const inArray = (el, arr) => {

  for (var i = 0; i < arr.length; i++) {

    if (el == arr[i]) {

      return i

    }

  }

  return -1

}

module.exports = {
  formatTime: formatTime,
  formatDuration: formatDuration,
  inArray: inArray
}
