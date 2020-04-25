import {Opt}   from '../..';
import {Style} from '../../style';

export const usage: (functions?: ((opts?: Opt[]) => (style?: Style) => string)[]) =>
                    (opts?: Opt[]) =>
                    (style?: Style) =>
                    string