import {Opt}  from '../..';
import {Style} from '../../style';

export const onlySubcommands: (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                              (opt?: Opt) =>
                              (style?: Style) =>
                              string