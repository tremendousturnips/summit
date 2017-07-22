import {fetchMessages} from '../../src/actions/messages'

describe('>>>A C T I O N --- Test messagesActions',()=>{
    it('+++ fetchMessages', () => {
        const newMessage = fetchMessages(1, 1)
        expect(newMessage).to.exist;
    });

});
//*******************************************************************************************************