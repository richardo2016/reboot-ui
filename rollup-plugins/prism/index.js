const Prism = require('prismjs')
Prism.manual = true;
require('prismjs/components/prism-scss')
require('prismjs/components/prism-sass')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-powershell')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')

require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace')

exports.Prism = Prism