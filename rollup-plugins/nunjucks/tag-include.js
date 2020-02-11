const nunjucks = require('nunjucks')

function IncludeTag() {
    this.tags = ['include'];
    this.parse = parse;
    this.run = run;

    function parse(parser, nodes) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.skip(lexer.TOKEN_BLOCK_END)
        
        return new nodes.CallExtension(this, 'run', args, [null]);
    }

    function run(context, args) {
        var ret = new nunjucks.runtime.SafeString(``);

        return ret;
    }
}

module.exports = (env) => {
    env.addExtension('IncludeTag', new IncludeTag());
}
