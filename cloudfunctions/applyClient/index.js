// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/*
* status: 0 - inProcess,
       1 - accept,
       2 - reject
*/
exports.main = async (event, context) => {
  try {
    return await db.collection('ClientApplications').add({
      data: {
        _id: event.openId,
        client_level: 1,
        phone: event.phone,
        oper1_id: event.oper1_id,
        oper2_id: event.oper2_id,
        oper3_id: event.oper3_id,
        status: 0,
        applied_at: db.serverDate(),
      }
    })
  } catch (e) {
    console.error(e)
  }
}