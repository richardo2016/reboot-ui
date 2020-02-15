const nunjucks = require('nunjucks')
const { highlightCode } = require('../prism/_utils');

function CaptureTag() {
    this.tags = ['capture'];

    this.parse = function(parser, nodes, lexer) {
        var tagName = 'capture';
        var tag = parser.peekToken();

        if (!parser.skipSymbol(tagName))
            parser.fail('parseInclude: expected ' + tagName);

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);

        parser.advanceAfterBlockEnd(tag.value);
        
        // parse the body and possibly the error block, which is optional
        var body = parser.parseUntilBlocks('endcapture');

        parser.advanceAfterBlockEnd();

        const valueArg = args.children[0];
        const kwArgs = new nodes.KeywordArgs(valueArg.lineno, valueArg.colno)

        kwArgs.addChild(
            new nodes.Pair(
                valueArg.lineno,
                valueArg.colno,
                new nodes.Literal(valueArg.lineno, valueArg.colno, 'type'),
                new nodes.Literal(valueArg.lineno, valueArg.colno, valueArg.value),
            )
        )

        try {
            const lval = body.children[0].children[0].value;
            if (lval.indexOf(`</p>`) === 0)
                body.children[0].children[0].value = lval.slice('</p>'.length).trim();
        } catch (error) {}

        const newArgs = new nodes.NodeList(tag.lineno, tag.colno)
        newArgs.addChild(kwArgs)
        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', newArgs, [body]);
    }

    this.run = function(context, args, body) {
        var ret = null;

        switch (args.type) {
            case 'example':
                var html = body();

                ret = new nunjucks.runtime.SafeString(`\
                    <div class="bd-example">${html}</div>\
                    ${highlightCode(/* escapeHtml */(html).trim(), 'html')}
                `);
                break
            case 'callout':
                ret = new nunjucks.runtime.SafeString(`<div class="bd-callout bd-callout-info">${body()}</div>`);
                break
        }

        return ret;
    }
}

module.exports = (env) => {
    env.addExtension('CaptureTag', new CaptureTag());
}
