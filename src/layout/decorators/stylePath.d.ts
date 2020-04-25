import {Style} from '../../style'

export const stylePath: <A, B>(path?: (string|number)[], f: (a?: A) => B) =>
                              (layoutFunction?: (style?: Style) => string) =>
                              (style?: Style) =>
                              string