/** Joins the truthy class names: cx('a', on && 'b') → 'a b' | 'a'. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ')
