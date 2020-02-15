/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const marked = require('marked')
const htmlEscaper = require('html-escaper');

module.exports = function (Liquid) {
    this.registerFilter('markdownify', content => {
        let html
        const options = {};

        if (content.startsWith('`'))
            html = marked.inlineLexer(content, [], options);
        else
            html = marked(content, options);

        return /* htmlEscaper.escape */(html)
    });
}