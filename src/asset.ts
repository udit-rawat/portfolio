/* Path to a file in public/, prefixed with the deploy base (/portfolio/ on GitHub Pages). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
