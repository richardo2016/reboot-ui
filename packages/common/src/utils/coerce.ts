export function coerceInteger (input: any, fallback = 0) {
  let result = parseInt(input)
  if (isNaN(result) || !Number.isFinite(result)) {
    result = fallback
  }

  return result
}

export function coerceFloat (input: any, fallback = 0) {
  let result = parseFloat(input)
  if (isNaN(result) || !Number.isFinite(result)) {
    result = fallback
  }

  return result
}
