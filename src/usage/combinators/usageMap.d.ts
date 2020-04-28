import {Opt, Style} from '../../style';

export const usageMap: (f?: ((opt?: Opt) => (style?: Style) => string)) => (opt?: Opt) => (style?: Style) => string