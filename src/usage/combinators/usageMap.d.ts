import {Opt, Opts, Style} from '../../style';

export const usageMap: (f: ((opt?: Opt) => (style?: Style) => string)) => (opts?: Opts) => (style?: Style) => string