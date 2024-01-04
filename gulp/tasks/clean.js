// import del from 'del';
import { deleteAsync } from 'del';
import config from '../config.js';

// const clean = () => del([config.paths.root.build, config.paths.root.tmp]);
const clean = await deleteAsync([config.paths.root.build, config.paths.root.tmp]);

export default clean;
