import {Opt}  from '../..';
import {Style} from '../../style';

export const usage: (functions?: ((opt?: Opt) => (style?: Style) => string)[]) =>
                    (opt?: Opt) =>
                    (style?: Style) =>
                    string