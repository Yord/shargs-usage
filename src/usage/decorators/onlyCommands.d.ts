import {Opt}   from '../..';
import {Style} from '../../style';

export const onlyCommands: (usageFunction: (opts?: Opt[]) => (style?: Style) => string) =>
                           (opts?: Opt[]) =>
                           (style?: Style) =>
                           string