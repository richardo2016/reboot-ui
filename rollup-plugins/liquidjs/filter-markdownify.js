/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const marked = require('marked')
const cheerio = require('cheerio')

module.exports = function (Liquid) {
    this.registerFilter('markdownify', content => {
        let html
        const options = {};

        if (content.startsWith('`'))
            html = marked.inlineLexer(content, [], options);
        else
            html = marked(content, options);

        return html
    });

    this.registerFilter('cheerio_remove', (content, selector) => {
        const $ = cheerio.load(content, { xmlMode: true })
        $(selector).remove()

        return $.html()
    });

    this.registerFilter('cheerio_addCls', (content, selector, clsName) => {
        if (!clsName) return content;

        const $ = cheerio.load(content, { xmlMode: true })
        $(selector).addClass(clsName)

        return $.html()
    });
}