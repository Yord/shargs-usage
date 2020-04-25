import {Opt}   from '../..';
import {Style} from '../../style';

export const optsFilter: (p?: (opt?: Opt) => boolean) =>
                         (usageFunction: (opts?: Opt[]) => (style?: Style) => string) =>
                         (opts?: Opt[]) =>
                         (style?: Style) =>
                         string