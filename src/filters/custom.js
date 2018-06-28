import moment from 'moment'
let timeFromNow = function  (n) {
  return moment(n).fromNow()
}

export {timeFromNow}