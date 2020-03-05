export const FORM_SYMBOL_TOKEN = Date.now()

export const FEEDBACK_POSTIONS = {
    KEY: `controlValidationFeedbackPosition$$_${FORM_SYMBOL_TOKEN}`, // Symbol('#key'),
    'before-labelbefore': Symbol('#before-labelbefore'),
    'after-labelafter': Symbol('#after-labelafter'),
    'after-control': Symbol('#after-control'),
}