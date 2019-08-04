function run(message,args,active,client)
{
    message.member.voiceChannel.leave();   
}

module.exports = {
    name: 'leave,leaves,離開,滾,走開,退語音,退頻道,退,散,你可以走了,你可以滾了,你可以回去了',
    description: '離開語音頻道。',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};