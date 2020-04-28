import {Opt}  from '../..';
import {Style} from '../../style';

export const noCommands: (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                         (opt?: Opt) =>
                         (style?: Style) =>
                         string