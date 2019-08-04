const ytdl = require('ytdl-core');


async function run(message, args, active, client)
{
    if(!message.member.voiceChannel)
    {
        return message.channel.send('你需要加入語音頻道!');
    }

    if(!args[0])
    {
        return message.channel.send('請輸入網址!');
    }

    let validate = await ytdl.validateURL(args[0]);

    if(!validate)
    {
        let searchcmd = require('./music_search.js');
        return searchcmd.execute(message,args,active,client);
    }

    let info = await ytdl.getInfo(args[0]);

    let data = active.get(message.guild.id) || {};
    if(!data.connection)
    {
        data.connection = await message.member.voiceChannel.join();
    }
    if(!data.queue)
    {
        data.queue = [];
    }
    data.guildID = message.guild.id;
    
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if(!data.dispatcher)
    {
        play(client, active, data);
    }
    else
    {
        message.channel.send('已加入歌單：' + info.title);
    }

    active.set(message.guild.id, data);
} 

async function play(client , active, data)
{
    client.channels.get(data.queue[0].announceChannel).send('現在播放：'+ data.queue[0].songTitle);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {fliter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function()
    {
        finish(client, active,this);
    });
}

function finish(client , active, dispatcher)
{
    let fetched = active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.length > 0)
    {
        active.set(dispatcher.guildID, fetched);
        play(client,active,fetched);
    }
    else
    {
        active.delete(dispatcher.guildID);

        let voicech = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if(voicech)
        {
            voicech.leave();
        }
    }
}

module.exports = {
    name: 'play,放音樂,播放,播歌,playmusic,plays,放音樂,放歌',
    description: '音樂功能:播放歌曲.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};