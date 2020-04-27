import {Opt}   from '../..';
import {Style} from '../../style';

export const optsMap: (f?: (opt?: Opt) => Opt) =>
                      (usageFunction: (opts?: Opt) => (style?: Style) => string) =>
                      (opts?: Opt) =>
                      (style?: Style) =>
                      string