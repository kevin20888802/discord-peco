async function run(message,args,active,client) 
{
    let fetched = active.get(message.guild.id);    

    if(!fetched)
    {
        return message.channel.send('哦?音樂盒沒有在播歌。');
    }

    if(message.member.voiceChannel !== message.guild.me.voiceChannel)
    {
        return message.channel.send('你要跟我在同一個語音頻道才能投票跳歌。');
    }

    let userCount = message.member.voiceChannel.members.size;
    let requireCount = Math.ceil(userCount/2);

    if(!fetched.queue[0].voteSkips)
    {
        fetched.queue[0].voteSkips = [];
    }
    
    if(fetched.queue[0].voteSkips.includes(message.member.id))
    {
        return message.channel.send(message.member.name + '，你已經投票跳歌了。');
    }

    fetched.queue[0].voteSkips.push(message.member.id);
    active.set(message.guild.id, fetched);

    if(fetched.queue[0].voteSkips.length >= requireCount)
    {
        message.channel.send('人數過半，現在跳下一首歌!');
        return fetched.dispatcher.emit('finish');
    }


    message.channel.send('成功投票跳歌!  (目前投票跳歌人數:' + fetched.queue[0].voteSkips.length.toString() + '/' + requireCount.toString()+')');
}



module.exports = {
    name: 'skip,skips,跳過,下一首,下一首歌,幹這首難聽,幹 這首難聽死了,換別首,換歌',
    description: '音樂功能:跳過.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};