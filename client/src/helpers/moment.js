import moment from 'moment'
function moments(date) {
  return moment(date).format('llll')
}

export default moments