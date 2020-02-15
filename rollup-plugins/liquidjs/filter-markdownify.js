/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const marked = require('marked')

module.exports = function (Liquid) {
    this.registerFilter('markdownify', content => {
        return marked(content, {})   
    });
}