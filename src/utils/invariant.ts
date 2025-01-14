export function invariant(condition: any, error: Error): asserts condition {
  if (condition) {
    return
  }

  throw error
}
