export function generateJoiError(error: any) {
  return error.details.map((err: any) => err.message);
}
