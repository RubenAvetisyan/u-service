export const useGeneratedKey = (str: string) => {
  return str.toLowerCase().replace(/[\s\.*\/\$%\^\&\(\)\!@+]+/g, '-').replace(/^-/g, '')
}
