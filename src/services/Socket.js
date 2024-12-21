import io from 'socket.io-client';
import config from '../config';

const socket = io(config.constants.BASE_API_URL);

export default socket;