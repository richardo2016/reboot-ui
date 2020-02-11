const nunjucks = require('nunjucks')
const highlight = require('highlight.js')

const { highlightCode } = require('./_utils');

function HighlightExtension() {
    this.tags = ['highlight'];

    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // parse the body and possibly the error block, which is optional
        var body = parser.parseUntilBlocks('error', 'endhighlight');
        var errorBody = null;

        if(parser.skipSymbol('error')) {
            parser.skip(lexer.TOKEN_BLOCK_END);
            errorBody = parser.parseUntilBlocks('endremote');
        }

        parser.advanceAfterBlockEnd();

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
    };

    this.run = function(context, url, body, errorBody) {
        var ret = new nunjucks.runtime.SafeString(
            `${highlightCode(body(), 'js')}`
        );

        return ret;
    };
}

module.exports = (env) => {
    env.addExtension('HighlightExtension', new HighlightExtension());
}