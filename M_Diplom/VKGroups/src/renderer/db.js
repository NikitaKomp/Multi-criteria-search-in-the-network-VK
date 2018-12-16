import Promise from 'bluebird'
import NeDb from 'nedb'
import _ from 'lodash'

const db = new NeDb({filename: './db.db', autoload: true})

export function getToken () {
  return new Promise(function (resolve, reject) {
    db.findOne({}, (err, doc) => {
      if (!_.isEmpty(err)) {reject(err)}
      if (_.isEmpty(doc)) {
        console.debug(`token not found`)
      } else {
        console.debug(`token loaded: ${JSON.stringify(doc)}`)
      }
      if(doc)
        resolve(doc.token)
      else
        resolve(null)
    })
  })
}

export function saveTokenData (authResponse) {
  let promise = new Promise(function (resolve, reject) {
    let entry = {
      token: authResponse.token,
      expires: authResponse.expires,
    }
    db.update(
      {userId: authResponse.user},
      {$set: entry},
      {upsert: true},
      (err, num) => {
        if (!_.isEmpty(err)) {reject(err)}
        console.debug(`token saved`)
        db.findOne({userId: authResponse.user}, (err, doc) => {
          if (!_.isEmpty(err)) {reject(err)}
          resolve(doc)
        })
      },
    )
  })
  return Promise.resolve(promise)
}