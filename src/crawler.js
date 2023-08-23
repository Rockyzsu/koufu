const { print } = require('./util')
const axios = require('axios');

async function fetchData(url) {

    const instance = axios.create({
        headers: {
            'Cookie':'_uab_collina=169277797813597801844547; viewNotice=1; url_city_str_=1; Hm_lvt_14678c95555c4a60bf207c106ffb4058=1691724347,1692727678,1692775432; think_language=zh; cur_city=%E5%8C%97%E4%BA%AC; cur_cityid=1; cur_relatedid=0; cur_parentid=531; locate=1; url_city_str=aid_1;',
            'Host':'licai.cofool.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' // UA
        }
    });
    // make http call to url
    // print('url==> ' + url)
    let response = await instance.get(url, {timeout: 10000}).catch((err) => { console.log('error'); return });

    if (!response || response.status !== 200) {
        
        print(`Error occurred while fetching data，url ${url}`);
        return;
    }
    return response;

}


module.exports = fetchData
// const url=''
// fetchData(url)