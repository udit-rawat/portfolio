/* Path to a file in public/, served from the site root. */
export const asset = (path: string) => '/' + path.replace(/^\//, '')
