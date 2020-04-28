import {Opt, Opt} from '../..';
import {Style}    from '../../style';

export const optsFilter: (p?: (opt?: Opt) => boolean) =>
                         (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                         (opt?: Opt) =>
                         (style?: Style) =>
                         string