import { deleteAsync } from 'del';
import config from '../config.js';

const clean = () => {
	return deleteAsync([config.paths.root.build, config.paths.root.tmp]);
}

export default clean;
