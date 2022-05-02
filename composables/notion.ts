/* eslint-disable no-console */
export const notionFetch = (url: string, fetchOptions: any = {}) => {
  // eslint-disable-next-line no-undef
  return $fetch(url, {
    baseURL: '/api',
    ...fetchOptions,
    // headers: {
    //   Authorization: `token ${useGithubCookie().value}`,
    //   ...fetchOptions.headers,
    // },
  })
}
