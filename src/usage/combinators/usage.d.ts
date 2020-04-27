import {Opts}  from '../..';
import {Style} from '../../style';

export const usage: (functions?: ((opts?: Opts) => (style?: Style) => string)[]) =>
                    (opts?: Opts) =>
                    (style?: Style) =>
                    string