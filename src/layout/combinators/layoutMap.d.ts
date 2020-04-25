import {Style} from '../../style';

export const layoutMap: <A>(f: ((a: A) => (style: Style) => string)) => (list?: A[]) => (style?: Style) => string