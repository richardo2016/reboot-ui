const Prism = require('prismjs')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-sass')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-powershell')

const htmlEscaper = require('html-escaper');

function filterPrismLang (lang) {
    switch (lang) {
        case 'html':
        case 'xml':
            break
        case 'js':
        case 'javascript':
            break
        case 'css':
            break
        case 'scss':
        case 'sass':
            break

        case 'bash':
        case 'shell':
        case 'powershell':
            break
        default:
            throw new Error(`[filterPrismLang] unsupported lang ${lang}`)
    }

    return lang
}

exports.highlightCode = (code, lang) => {
    filterPrismLang(lang);

    code = htmlEscaper.unescape(code);

    return /* htmlEscaper.escape */(`\
<div class="bd-clipboard">\
    <button type="button" class="btn-clipboard" title="" data-original-title="Copy to clipboard">\
        Copy\
    </button>\
</div>\
<figure class="highlight">
    <pre><code class="language-${lang}" data-lang="${lang}">${Prism.highlight(code, Prism.languages[lang], lang)}</code></pre>
</figure>
`)
}