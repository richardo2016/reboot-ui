const Prism = require('prismjs')
Prism.manual = true;
// require('prismjs/components/prism-markdown')
// require('prismjs/components/prism-markup')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-sass')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-powershell')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-shell-session')
require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace')

Prism.plugins.NormalizeWhitespace.setDefaults({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
    'break-lines': true,
    // 'indent': 4,
    'tabs-to-spaces': true,
});

exports.Prism = Prism