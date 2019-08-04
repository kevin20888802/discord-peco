const search = require('yt-search');

async function run(message,args,active,client)
{
    search(args.join(' '), function(err, res){
        if(err) return message.channel.send('發生錯誤...。');
        
        let videos = res.videos.slice(0,10);

        let resp = '';
        for(let i = 0 ; i < videos.length; i++)
        {
            resp += '[' + (i+1).toString() + ']:' + videos[i].title + '\n';
        }

        resp += '\n 請選擇歌曲(輸入數字)。';

        message.channel.send(resp);

        const fliter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
        const collector = message.channel.createMessageCollector(fliter);

        collector.videos = videos;

        collector.once('collect' , function(m){
            let playCommand = require('./music_play.js');
            let vidurl = 'https://www.youtube.com' + this.videos[parseInt(m.content) - 1].url;
            let aarg = [];
            aarg[0] = vidurl;
            playCommand.execute(message,aarg,active,client);
        });
    });
}


module.exports = {
    name: 'search,searchs,找歌,找歌曲,搜歌,搜尋歌',
    description: '音樂功能:搜尋歌曲.',
    execute(message,args,active,client) {
        run(message,args,active,client);
    },
};