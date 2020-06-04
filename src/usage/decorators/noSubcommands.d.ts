import {Opt}  from '../..';
import {Style} from '../../style';

export const noSubcommands: (usageFunction: (opt?: Opt) => (style?: Style) => string) =>
                            (opt?: Opt) =>
                            (style?: Style) =>
                            string