import {Opt}  from '../..';
import {Style} from '../../style';

export const onlyFirstArg: (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                           (opt?: Opt) =>
                           (style?: Style) =>
                           string