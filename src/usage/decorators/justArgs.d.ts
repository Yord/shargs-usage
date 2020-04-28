import {Opt}  from '../..';
import {Style} from '../../style';

export const justArgs: (list?: string[]) =>
                       (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                       (opt?: Opt) =>
                       (style?: Style) =>
                       string