const axios = require('../../utils/axios');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    // console.log(ctx);
    const host = 'http://poj.org/';

    let user = ctx.params && ctx.params.user;
    if (user === undefined) {
        user = '0';
    }

    const response = await axios({
        method: 'get',
        url: host + 'userstatus?user_id=' + user,
        headers: {
            Referer: host,
        },
    });

    const $ = cheerio.load(response.data);
    // console.log($);
    const text = $('center').children('table').children()[0].children[3].children[4].children[1].children[0].data;
    // console.log();
    let p = /p\(\d+\)/g;
    let list = text.split('\n').filter((s) => (s.match(p))).map((s) => {
        // arr[idx] = (s.match(/\d+/))
        // console.log(arr[idx])
        return Number(s.match(/\d+/));
    });
    // console.log(list);

    ctx.state.data = {
        title: 'POJ',
        url: host + 'userstatus?user_id=' + user,
        item: list
    };
};
