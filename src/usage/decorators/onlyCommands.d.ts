import {Opt}  from '../..';
import {Style} from '../../style';

export const onlyCommands: (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                           (opt?: Opt) =>
                           (style?: Style) =>
                           string