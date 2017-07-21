import { schema } from 'normalizr';

const message = schema.Entity('messages');
const messageSchema = { messages: message };

export default messageSchema;