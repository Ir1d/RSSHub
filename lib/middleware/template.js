const art = require('art-template');
const path = require('path');
const config = require('../config');
const typeRegrx = /^\/(list|user|tot)/;
// const unsupportedRegrx = /\.json$/;

module.exports = async (ctx, next) => {
    // if (ctx.request.path.match(unsupportedRegrx)) {
    //     throw Error('<b>JSON output had been removed, see: <a href="https://github.com/DIYgod/RSSHub/issues/1114">https://github.com/DIYgod/RSSHub/issues/1114</a></b>');
    // }
    // console.log(ctx.request.path);
    ctx.state.type = ctx.request.path.match(typeRegrx) || ['', ''];
    // console.log(ctx.state.type);
    ctx.request.path = ctx.request.path;
    // ctx.request.path = ctx.request.path.replace(typeRegrx, '');

    await next();

    if (!ctx.body) {
        let template;

        switch (ctx.state.type[1]) {
            case 'list':
                template = path.resolve(__dirname, '../views/list.art');
                ctx.set({	
                    'Content-Type': 'application/json; charset=UTF-8',	
                });	
                break;
            case 'user':
                template = path.resolve(__dirname, '../views/user.art');
                ctx.set({	
                    'Content-Type': 'application/json; charset=UTF-8',	
                });	
                break;
            case 'json':	
                template = path.resolve(__dirname, '../views/json.art');	
                ctx.set({	
                    'Content-Type': 'application/json; charset=UTF-8',	
                });	
                break;
            default:
                template = path.resolve(__dirname, '../views/rss.art');
                break;
        }

        // console.log(ctx.state.data);
        if (ctx.state.data) {
            // trim title length
            ctx.state.data.item &&
                ctx.state.data.item.forEach((item) => {
                    if (item.title) {
                        for (let length = 0, i = 0; i < item.title.length; i++) {
                            length += Buffer.from(item.title[i]).length !== 1 ? 2 : 1;
                            if (length > config.titleLengthLimit) {
                                item.title = `${item.title.slice(0, i)}...`;
                                break;
                            }
                        }
                    }

                    if (item.enclosure_length) {
                        const itunes_duration = Math.floor(item.enclosure_length / 3600) + ':' + Math.floor((item.enclosure_length % 3600) / 60) + ':' + (((item.enclosure_length % 3600) % 60) / 100).toFixed(2).slice(-2);
                        item.itunes_duration = itunes_duration;
                    }
                });
        }

        const data = {
            lastBuildDate: new Date().toUTCString(),
            updated: new Date().toISOString(),
            ttl: config.cacheExpire,
            ...ctx.state.data,
        };
        // console.log(data);
        if (template) {
            ctx.body = art(template, data);
        }
    }
};
