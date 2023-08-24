// 定义表结构
const { print } = require('./util')
const mongoose = require('mongoose')
const doc = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true
    },
    wx_url: {
        type: String

    }
})

const koufuModel = mongoose.model('koufu', doc, 'koufu')
function isExist(user_id) {
    return koufuModel.findOne({ user_id: user_id })
}
function createDoc(user_id, url) {
    if (isExist(user_id)) { return }
    try {
        koufuModel.create(
            {
                user_id: user_id,
                wx_url: url
            }
        )
        print(`insert ${user_id}`)
    } catch (e) {
        // print('dup')
        // print(e)
    }
}

function koufuStop() {

    mongoose.disconnect()
}


module.exports = { koufuModel, createDoc, koufuStop }