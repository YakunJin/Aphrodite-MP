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
        desc: event.productDesc || '',
        price: event.price || 0,
        imageWidth: event.imageWidth,
        imageHeight: event.imageHeight,
        created_at: db.serverDate()
      }
    })
  } catch (e) {
    console.error(e)
  }
}