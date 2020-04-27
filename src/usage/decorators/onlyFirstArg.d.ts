import {Opts}  from '../..';
import {Style} from '../../style';

export const onlyFirstArg: (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                           (opts?: Opts) =>
                           (style?: Style) =>
                           string