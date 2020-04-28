import {Opt}   from '../..';
import {Style} from '../../style';

export const optsMap: (f?: (opt?: Opt) => Opt) =>
                      (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                      (opt?: Opt) =>
                      (style?: Style) =>
                      string