import _ from 'lodash'
import Promise from 'bluebird'
import moment from 'moment'
import { Request } from 'vk-io'

let memberSexDefs = {
  1: 'female',
  2: 'male',
}

export function getGroupMembersSexStatistics(vk, groups) {
  return Promise.try(() => {
    return vk.api.groups.getById({
      group_ids: _.map(groups, 'id'),
      fields: ['members_count'],
    }).then(groups => {
      return groups.map(group => {
        let requestCode = [`"group_id": ${group.id}`]
        _.each(memberSexDefs, (_, key) => {
          let request = new Request('users.search', {
            group_id: group.id,
            sex: key,
            count: 0,
          })
          requestCode.push(
            `"${memberSexDefs[key]}": (${request.toString()}.count * 100) / ${group['members_count']}`)
        })
        console.log(`{${requestCode.join(', ')}`)
        return `{${requestCode.join(', ')}}`
      })
    }).then(requests => {
      let promises = []
      _.chunk(requests, 25).forEach(chunk => {
        console.log(`return [${chunk.join(',')}];`)
        promises.push(vk.api.execute({
          code: `return [${chunk.join(',')}];`,
        }))
      })
      return Promise.all(promises)
    }).then(result => {
      console.log(result)
    })
  })
}

let visitorsSexDefs = {
  f: 'female',
  m: 'male',
}

function _getAvg(arr) {
  let sum = arr.reduce((accumulator, count) => {
    return accumulator + count
  }, 0)
  return sum / arr.length
}

function _getPercent(max, val) {
  return (val * 100) / max
}

export function getGroupVisitorsSexStatistics(vk, dateFrom, dateTo, groupId) {
  let dateFormat = 'YYYY-MM-DD'
  dateFrom = moment(dateFrom || moment.now()).format(dateFormat)
  dateTo = moment(dateTo || moment.now()).format(dateFormat)

  let sexPercentageStats = {
    male: [],
    female: [],
  }
  return vk.api.stats.get({
    date_from: dateFrom,
    date_to: dateTo,
    group_id: groupId,
  }).then(stats => {
    stats.forEach(stats => {
      let visitors = stats.visitors
      console.log(visitors)
      let amount = visitors.visitors
      let sexes = visitors.sex
      let sexStats = {
        male: 0,
        female: 0,
      }
      sexes.forEach(sex => {
        if (visitorsSexDefs.hasOwnProperty(sex.value))
          sexStats[visitorsSexDefs[sex.value]] += sex.count
        else {
          console.warn('unknown sex type: ', sex)
        }
      },
      )
      console.log(sexStats.male)
      console.log(sexStats.female)
      console.log(amount)
      let malePercent = _getPercent(amount, sexStats.male)
      let femalePercent = _getPercent(amount, sexStats.female)
      console.log(malePercent)
      console.log(femalePercent)
      sexPercentageStats.male.push(malePercent)
      sexPercentageStats.female.push(femalePercent)
    })
    return {
      male: _getAvg(sexPercentageStats.male),
      female: _getAvg(sexPercentageStats.female),
    }
  })
}

function parseScrapedWallItem(html) {

}

function scrapeGroupWall(groupId, offset, date, query) {
  let link = `https://vk.com/wall-${groupId}?own=1`
  if (offset) link += `&offset=${offset}`
  if (date) link += `&day=${moment(date).format("DDMMYYYY")}`
  if (query) link += `&q=${q}`
  return axios.get(link).then(response => {
    console.log(response)
  })
}