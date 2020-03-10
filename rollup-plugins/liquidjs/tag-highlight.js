/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const assert = require('assert')

const htmlEscaper = require('html-escaper');
const htmlPretty = require('pretty');

const { highlightCode } = require('../prism/_utils')

const identifier = /[\w-]+[?]?/;
const reg = new RegExp(`(${identifier.source})`)

module.exports = function (Liquid) {
    this.registerTag('highlight', {
        parse (tagToken, remainTokens) {
            const match = tagToken.args.match(reg);
            assert(match, `${tagToken.args} not valid identifier`);

            this.lang = match[1];
            this.tokens = []
            this.templates = []

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
            let text = this.tokens.map((token) => token.raw).join('')

            if (!text) return ;

            if ([`{%-`, `-%}`, `{{-`, `-}}`].some(delimiter => ~text.indexOf(delimiter))) {
              text = text.replace(/\{\%\-/g, '{%')
              text = text.replace(/\-\%\}/g, '%}')
              text = text.replace(/\{\{\-/g, '{{')
              text = text.replace(/\-\}\}/g, '}}')

              const templates = this.liquid.parse(text)
              const html = yield this.liquid.renderer.renderTemplates(templates, ctx)

              return highlightCode(htmlEscaper.unescape(html), this.lang);
            }

            if (this.lang === 'html')
              text = htmlPretty(text)

            return ''
            + '```' + this.lang + '\n'
            + text + '\n'
            + '```' + '\n'
        },
    });
}