// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/*
* client_level: 0 - admin,
           1 - business client,
           2 - general user
*/
exports.main = async (event, context) => {
  try {
    return await db.collection('Clients').add({
      data: {
        _id: event.openId,
        phone: event.phone,
        oper1_id: event.oper1_id,
        oper2_id: event.oper2_id,
        oper3_id: event.oper3_id,
        client_level: event.client_level,
        joined_at: db.serverDate()
      }
    })
  } catch (e) {
    console.error(e)
  }
}