// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const dbc = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return (await db.collection('ClientApplications').where({
    _id: dbc.in([event.openId])
  }).get())
}