function run(message,args,active,client)
{
    message.member.voiceChannel.join();
}

module.exports = {
    name: 'join,joins,近來,進來,進語音,進來語音,進語音頻,進頻道,進,進來拉,這裡有食物,這裡有飯糰,這裡有剉冰',
    description: '離開語音頻道。',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};