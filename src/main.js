
const fetchData = require('./crawler')
const { print } = require('./util')
const HOST = 'https://licai.cofool.com'
print('start crawling');

const cheerio = require('cheerio');
const userPge = require('./detail_page')



async function main() {
    for (let i = 1; i < 400; i++) {
        let url = `https://licai.cofool.com/ask/gupiao-${i}.html`;

        await fetchData(url).then((res) => {
            if (!res) { return }
            print(`crawling page ${i}`)
            const html = res.data;
            const $ = cheerio.load(html);
            const qa_list = $('div.answer-detail-list');
            qa_list.each(async function () {
                let detail_url = $(this).find('a').attr('href');
                if (detail_url) {
                    let full_path = HOST + detail_url;
                    await userPge(full_path)
                }
            });
        })
    }
}

main()