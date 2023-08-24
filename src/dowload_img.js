require('dotenv').config()
const db = require('./mongodb')
const DB_URI = process.env.DB_URI
db.connect(DB_URI)
const { koufuModel, koufuStop } = require('./models')
const { print } = require('./util')
const { downloadimage } = require('./download_services')
async function getData() {
    const result = await koufuModel.find()
    for (let item of result) {
        const url = item.wx_url
        const pattern = url.split('/')
        filename = pattern[pattern.length - 1]
        await downloadimage(url, filename)
        print('wait for next')
    }
    koufuStop()
}

getData()


