export function filterPrismLang (lang) {
    switch (lang) {
        case 'html':
        case 'xml':
            break
        case 'js': lang = 'javascript'
            break
        case 'javascript':
        case 'jsx':
        case 'typescript':
            break
        case 'ts': lang = 'typescript'
            break
        case 'css':
            break
        case 'scss':
        case 'sass':
            break

        case 'shell': lang = 'bash'
            break
        case 'bash':
        case 'powershell':
            break
        default:
            throw new Error(`[filterPrismLang] unsupported lang ${lang}`)
    }

    return lang
}

export function wrapHtml (code, lang) {
    return /* htmlEscaper.escape */(`\
<div class="bd-clipboard">
    <button type="button" class="btn-clipboard" title="" data-original-title="Copy to clipboard">
        Copy
    </button>
</div>
<figure class="highlight"><pre><code class="language-${lang}" data-lang="${lang}">${code}</code></pre></figure>
`)
}

export const highlightCode = (
    code,
    lang,
    {
        noWrapHTML = false,
        useClientHighlight = false
    } = {}
) => {
    filterPrismLang(lang);

    code = code.trim();

    const nw = Prism.plugins.NormalizeWhitespace;
    code = nw.normalize(code, {
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
    });

    if (useClientHighlight)
        return noWrapHTML ? code : wrapHtml(code, lang)

    const colored = Prism.highlight(code, Prism.languages[lang], lang);

    return noWrapHTML ? colored : wrapHtml(colored, lang)
}