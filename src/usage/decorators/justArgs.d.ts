import {Opt}   from '../..';
import {Style} from '../../style';

export const justArgs: (list?: string[]) =>
                       (usageFunction: (opts?: Opt[]) => (style?: Style) => string) =>
                       (opts?: Opt[]) =>
                       (style?: Style) =>
                       string