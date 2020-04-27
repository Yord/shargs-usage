import {Opts}  from '../..';
import {Style} from '../../style';

export const onlyCommands: (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                           (opts?: Opts) =>
                           (style?: Style) =>
                           string