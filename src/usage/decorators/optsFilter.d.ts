import {Opt, Opts} from '../..';
import {Style}     from '../../style';

export const optsFilter: (p?: (opt?: Opt) => boolean) =>
                         (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                         (opts?: Opts) =>
                         (style?: Style) =>
                         string