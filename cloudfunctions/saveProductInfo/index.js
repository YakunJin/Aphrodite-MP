// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('Products').add({
      data: {
        _openid: event.openId,
        image_id: event.imageId,
        image_path: event.imagePath,
        desc:"",
        price: 210,
        created_at: db.serverDate()
      }
    })
  } catch (e) {
    console.error(e)
  }
}