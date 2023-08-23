
const { print } = require('./util')
const fetchData = require('./crawler')
require('dotenv').config()
const db = require('./mongodb')
var { createDoc, koufuStop } = require('./models')
const DB_URI = process.env.DB_URI
db.connect(DB_URI)

const cheerio = require('cheerio');
// const url = 'https://licai.cofool.com/ask/qa_2807052.html'

function userPge(url) {

  fetchData(url).then((res) => {
    if (!res) { return }

    print('start detail page crawling ' + url);
    const html = res.data;

    const $ = cheerio.load(html);
    const statsTable = $('div.share-info-code > img.c');
    statsTable.each(function () {
      let url_ = $(this).attr('src');
      const reg = /qrcode_(\d+)\./
      const result = url_.match(reg)
      if(!result||result.length<2){return}
      const user_id = result[1]
      print(user_id)
      createDoc(user_id, url_)

    })

  }

  )
  koufuStop()
}

const url = 'https://licai.cofool.com/ask/qa_2807038.html'
userPge(url)
module.exports = userPge