/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const assert = require('assert')

const identifier = /[\w-]+[?]?/;
const reg = new RegExp(`(${identifier.source})`)

module.exports = function (Liquid) {
    this.registerTag('highlight', {
        parse (tagToken, remainTokens) {
            const match = tagToken.args.match(reg);
            assert(match, `${tagToken.args} not valid identifier`);

            this.lang = match[1];
            this.tokens = []

            const stream = this.liquid.parser.parseStream(remainTokens)
            stream
              .on('token', (token) => {
                if (token.name === 'endhighlight') stream.stop()
                else this.tokens.push(token)
              })
              .on('end', () => {
                throw new Error(`tag ${tagToken.raw} not closed`)
              })
            stream.start()
        },
        * render (ctx) {
            const originalCode = this.tokens.map((token) => token.raw).join('')

            if (!originalCode) return ;
            if ([`{%-`, `-%}`].some(delimiter => ~originalCode.indexOf(delimiter))) return ;

            if (ctx.globals.NOHIGHLIGHT) return originalCode;

            const markdownCode = ''
              + '```' + this.lang + '\n'
              + originalCode + '\n'
              + '```' + '\n'

            return markdownCode;
        },
    });
}