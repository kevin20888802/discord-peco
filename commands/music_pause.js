function run (message,args,active,client)
{
    let fetched = active.get(message.guild.id);
    if(!fetched)
    {
        return message.channel.send('哦?音樂盒現在沒有播歌。');
    }

    if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    {
        return message.channel.send('你要跟我在同一個語音頻道才能暫停現在放的歌。');
    }

    if(fetched.dispatcher.paused)
    {
        return message.channel.send('音樂盒現在的歌曲已經暫停了。'); 
    }

    fetched.dispatcher.pause();

    message.channel.send('暫停音樂盒歌曲!');
}

module.exports = {
    name: 'pause,pauses,暫停,暫停播放,暫停歌,先別播,先別播歌,先別放歌',
    description: '音樂功能:暫停歌曲.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};