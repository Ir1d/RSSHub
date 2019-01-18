const axios = require('axios');
const cheerio = require('cheerio');

    const host = 'http://poj.org/';

    let user = `imcaffrey`;
    if (user === undefined) {
        // throw error
    }

    axios({
        method: 'get',
        url: host + 'userstatus?user_id=' + user,
        headers: {
            Referer: host,
        },
    }).then(function(response) {
      const $ = cheerio.load(response.data);
      // console.log($);
      const text = $('center').children('table').children()[0].children[3].children[4].children[1].children[0].data;
      // console.log();
      let p = /p\(\d+\)/g;
      let list = text.split('\n').filter((s) => (s.match(p)));
      console.log(list.length);
      
    });
    // console.log(response.data);
    return;
    ctx.state.data = {
        title: 'POJ',
        link: host + 'userstatus?user_id=' + user,
        description: 'POJ',
        item:
            text &&
            text
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('p').text(),
                        link: host + 'Survey/Notice/' + item.attr('href'),
                        description: item.find('p').text(),
                        pubDate: item.find('em').text(),
                    };
                })
                .get(),
    };
// };
