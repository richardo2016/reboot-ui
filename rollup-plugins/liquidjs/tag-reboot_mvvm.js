/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const buble = require('buble');

const assert = require('assert')

const identifier = /[\w-]+[?]?/;
const reg = new RegExp(`(${identifier.source})`)

function md5 (input) {
  const crypto = require('crypto');
  const md5 = crypto.createHash('md5');

  return md5.update(input).digest('hex');
}

module.exports = function (Liquid) {
    this.registerTag('reboot_mvvm', {
        parse (tagToken, remainTokens) {
            const match = tagToken.args.match(reg);
            assert(match, `${tagToken.args} not valid identifier`);

            this.mvvm_type = match[1];
            this.tokens = []

            const stream = this.liquid.parser.parseStream(remainTokens)
            stream
              .on('token', (token) => {
                if (token.name === 'endreboot_mvvm') stream.stop()
                else this.tokens.push(token)
              })
              .on('end', () => {
                throw new Error(`tag ${tagToken.raw} not closed`)
              })
            stream.start()
        },
        render (ctx) {
            let source = this.tokens.map((token) => token.raw).join('')
            const originalCode = source;

            const uuid = md5(source + `${Date.now()}`);
            const sampleElId = `mvvm_type${uuid}`

            source += `;ReactDOM.render(<Sample uuid={'${uuid}'} />, document.getElementById('${sampleElId}'));`
            let { code: output } = buble.transform(source, {
              jsx: 'React.createElement',
              objectAssign: 'Object.assign',
            })
              
            const markdownCode = ''
              + '```reboot_jsx' + '\n'
              + originalCode + '\n'
              + '```' + '\n'
            
            ctx.front()[this.mvvm_type] = {
              uuid,
              id: sampleElId,
              mvvm_type: this.mvvm_type,
              
              clientRenderJs: output,
              originalCode,
              markdownCode
            };
        },
    });
}