import {Opts}  from '../..';
import {Style} from '../../style';

export const justArgs: (list?: string[]) =>
                       (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                       (opts?: Opts) =>
                       (style?: Style) =>
                       string