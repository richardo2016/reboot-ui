/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const assert = require('assert')
const identifier = /[\w-]+[?]?/;
const reg = new RegExp(`(${identifier.source})`)

module.exports = function (Liquid) {
    this.registerTag('capture', {
        parse (tagToken, remainTokens) {
            const match = tagToken.args.match(reg);
            assert(match, `${tagToken.args} not valid identifier`);
            this.variable = match[1];
            this.templates = [];
            const stream = this.liquid.parser.parseStream(remainTokens);
            stream.on('tag:endcapture', () => stream.stop())
                .on('template', (tpl) => this.templates.push(tpl))
                .on('end', () => {
                    throw new Error(`tag ${tagToken.raw} not closed`);
                });
            stream.start();
        },
        * render (ctx) {
            const r = this.liquid.renderer;
            const html = yield r.renderTemplates(this.templates, ctx);
            
            ctx.front()[this.variable] = html;
        },
    });
}