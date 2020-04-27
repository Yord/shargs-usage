import {Opt, Opts} from '../..';
import {Style}     from '../../style';

export const optsMap: (f?: (opt?: Opt) => Opt) =>
                      (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                      (opts?: Opts) =>
                      (style?: Style) =>
                      string