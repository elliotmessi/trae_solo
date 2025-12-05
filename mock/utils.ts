export const success = <T extends any = any>(data: T) => {
  return {
    success: true,
    code: 0,
    data,
  }
}
