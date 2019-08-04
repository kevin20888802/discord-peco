const Discord = require('discord.js');

async function run(message, args, active, client)
{
    let fetched = active.get(message.guild.id);

    if(!fetched)
    {
        return message.channel.send('哦？音樂盒沒有在放音樂呢。');
    }

    let queue = fetched.queue;
    let nowplay = queue[0];

    let themsg = new Discord.RichEmbed();
    themsg.setTitle('');
    themsg.setColor('#FF8C4A');
    themsg.setAuthor('音樂盒', 'https://i.imgur.com/s3u9SEO.png', 'https://gamewith.tw/pricone-re/article/show/87341');
    themsg.addBlankField();
    themsg.addField('現在播放：' + nowplay.songTitle,'由' + nowplay.requester + '要求', true);
    themsg.addBlankField();
    themsg.addField('歌單：','-', false);
    for(let i = 1; i < queue.length; i++)
    {
        themsg.addField(queue[i].songTitle,'由' + queue[i].requester + '要求',false);
    }
    message.channel.send(themsg);
}


module.exports = {
    name: 'queue,nowplaying,nowplay,歌單,音樂盒歌單,音樂清單,現在播的歌',
    description: '音樂功能:歌單.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};