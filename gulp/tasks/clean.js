import del from 'del';
import config from '../config';

const clean = () => del([config.paths.root.build, config.paths.root.tmp]);

export default clean;
