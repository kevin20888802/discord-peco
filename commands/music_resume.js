function run (message,args,active,client)
{
    let fetched = active.get(message.guild.id);
    if(!fetched)
    {
        return message.channel.send('哦?音樂盒現在沒有播歌。');
    }

    if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    {
        return message.channel.send('你要跟我在同一個語音頻道才能繼續現在放的歌。');
    }

    if(!fetched.dispatcher.paused)
    {
        return message.channel.send('音樂盒的歌曲正在播放中。'); 
    }

    fetched.dispatcher.resume();

    message.channel.send('繼續播放音樂盒歌曲!');
    
}

module.exports = {
    name: 'resume,resumes,繼續放,繼續放歌,繼續,繼續播,繼續播歌',
    description: '音樂功能:繼續歌曲.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};