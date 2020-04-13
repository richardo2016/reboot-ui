// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const { getConfigItem } = require('../../helpers/rollup-utils')

module.exports = getConfigItem({
    input: 'src/index.ts',
    format: 'umd',
    name: 'RebootUI',
    mvvm_type: 'react',
    use_uglify: true,
    babel_options: {},
    ts_options: {"useTsconfigDeclarationDir":true},
    postConfig: (rollup_cfg) => {
        rollup_cfg.output.file = `dist/index.js`
        // rollup_cfg.output.exports = `named`
    }
})