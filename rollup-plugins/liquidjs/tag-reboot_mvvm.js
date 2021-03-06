/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */
const buble = require('buble');
const babel = require('@babel/core')

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
            let { code: output } = babel.transformSync(source, {
              babelrc: false,
              presets: [
                ["@babel/preset-env", {
                  "modules": false
                }],
                "@babel/preset-react"
              ]
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

    this.registerTag('capture_react', {
      parse (tagToken, remainTokens) {
        const match = tagToken.args.match(reg);
        assert(match, `${tagToken.args} not valid identifier`);

        this.varname = match[1] || 'captured_react';
        this.tokens = []

        const stream = this.liquid.parser.parseStream(remainTokens)
        stream
          .on('token', (token) => {
            if (token.name === 'endcapture_react') stream.stop()
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

        const uuid = md5(`${source}${Date.now()}`);
        const sampleElId = `react-fragment-id/${uuid}`

        source += `;ReactDOM.render(<Sample uuid={'${uuid}'} />, document.getElementById('${sampleElId}'));`
        const { code: clientRenderJs } = buble.transform(source, {
          jsx: 'React.createElement',
          objectAssign: 'Object.assign',
          transforms: {
            modules: false,
          }
        })
          
        const markdown = ''
          + '```jsx' + '\n'
          + originalCode + '\n'
          + '```' + '\n'

        ctx.front()[this.varname] = {
          uuid,
          id: sampleElId,
          varname: this.varname,
          
          clientRenderJs,
          source: originalCode,
          markdown
        };
        
//         return `
// <div class="bd-example" id="${sampleElId}">
// </div>
// <script type="text/plain" data-js-id="${sampleElId}">
//   ${clientRenderJs}
// </script>`;
      },
    });
}