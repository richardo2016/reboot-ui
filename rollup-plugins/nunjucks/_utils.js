exports.highlightCode = (code, lang = 'html') => {
    return `\
<div class="bd-clipboard">\
    <button type="button" class="btn-clipboard" title="" data-original-title="Copy to clipboard">\
        Copy\
    </button>\
</div>\
<figure class="highlight">\
    <pre><code class="language-${lang}" data-lang="${lang}">${code}</code></pre>\
</figure>
`
}