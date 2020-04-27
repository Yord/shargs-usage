import {Opts}  from '../..';
import {Style} from '../../style';

export const noCommands: (usageFunction: (opts?: Opts) => (style?: Style) => string) =>
                         (opts?: Opts) =>
                         (style?: Style) =>
                         string