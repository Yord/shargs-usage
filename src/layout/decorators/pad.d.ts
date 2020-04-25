import {Style} from '../../style'

export const pad: (path?: (string|number)[], spaces?: number) =>
                  (layoutFunction?: (style?: Style) => string) =>
                  (style?: Style) =>
                  string