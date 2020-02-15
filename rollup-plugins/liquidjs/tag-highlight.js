/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const assert = require('assert')
const htmlEscaper = require('html-escaper');

const identifier = /[\w-]+[?]?/;
const reg = new RegExp(`(${identifier.source})`)

const { highlightCode } = require('../prism/_utils');

module.exports = function (Liquid) {
    this.registerTag('highlight', {
        parse (tagToken, remainTokens) {
            const match = tagToken.args.match(reg);
            assert(match, `${tagToken.args} not valid identifier`);
            this.lang = match[1];

            this.tokens = []
            const stream = this.liquid.parser.parseStream(remainTokens);
            stream
                .on('token', (token) => {
                    if (token.name === 'endhighlight') stream.stop()
                    else this.tokens.push(token)
                })
                .on('end', () => {
                    throw new Error(`tag ${token.raw} not closed`)
                })
            stream.start()
        },
        * render (ctx) {
            const text = this.tokens.map((token) => token.raw).join('')

            return text;
            // return highlightCode(text, this.lang)
        },
    });
}