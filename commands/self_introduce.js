const Discord = require('discord.js');

const IntroText =
{
    content: "嗷嗚～☆ 我的名字是……肚子空空的貪吃佩可是也！",
    embed: {
      title: "貪吃佩可 (尤絲蒂亞娜‧冯‧阿斯特賴亞) ~~咕嚕鬼~~",
      description: "```\n位於前衛，全力保護同伴，是一位貪吃的劍士。\n大胃王，興趣是做飯吃飯，\n可以把一盤堆得像小山似的炒飯全部吃完\n並且還能繼續吃其他食物。\n由於喜歡四處旅行所以很缺錢，只能在餐飲店打工，\n實際上還是為了能方便地吃到東西。\n只要是能吃的東西，就算是魔獸也吃給你看的女孩。\n若仔細觀察可發現其所持的劍也被她啃了一口\n現實本名為\n尤絲蒂亞娜‧F‧阿斯特賴亞\n（ユースティアナ・フォン・アストライア）\n，與其他人不同，貪吃佩可是真正的外國王室的公主，\n其所屬的國家曾出資援助了MIMI和《阿斯特雷亞》的研發。\n而她的名字「ペコリーヌ」來自登錄遊戲時翻譯器產生的錯誤（可以理解為電腦的一段文字因錯誤的Unicode顯示為亂碼）。\n而在現實中，\n也正是因為千里真那（霸瞳皇帝）奪走了公主的能力，\n導致部分認識貪吃佩可的人會出現短暫的無法認知狀態，\n包括她的父母，並且由於來自外國，需要隨身攜帶翻譯器，\n所以有時會出現語言不通無法交流的情況，\n並且翻譯器實時運行以及戰鬥時能力釋放需要消耗巨大的能量，故在遊戲裡貪吃佩可經常飢餓非常能吃，\n在遊戲裡，\n創建新的公會需要登記時曾委派騎士代為登記而不是親自去，\n說明其在現實中可能處於被通緝而逃亡的狀態。```",
      url: "https://gamewith.tw/pricone-re/article/show/87341",
      color: 16747594,
      timestamp:  new Date(),
      footer: {
        icon_url: "https://i.imgur.com/s3u9SEO.png",
        text: "自我介紹"
      },
      thumbnail: {
        url: "https://i.imgur.com/s3u9SEO.png"
      },
      image: {
        url: "https://i.imgur.com/JKiegJU.png"
      },
      author: {
        name: "貪吃佩可",
        url: "https://gamewith.tw/pricone-re/article/show/87341",
        icon_url: "https://i.imgur.com/s3u9SEO.png"
      },
      fields: [
        {
          name: "身高",
          value: "156 公分",
          inline: true
        },
        {
          name: "體重",
          value: "46 公斤",
          inline: true
        },
        {
          name: "生日",
          value: "3月31日",
          inline: true
        },
        {
          name: "血型",
          value: "O 型",
          inline: true
        },
        {
          name: "種族",
          value: "人族"
        },
        {
          name: "公會",
          value: "美食殿堂"
        },
        {
          name: "興趣",
          value: "邊走邊吃、料理"
        },
        {
          name: "CV",
          value: "M・A・O"
        }
      ]
    }
}
    function selfintroduce(message, args)
    {
        console.log('aaba');
        message.channel.send(IntroText);
    }

module.exports = {
	name: 'selfintroduce,自我介紹,Hello,Hey,嗨,是誰,?,自我介紹,誰,可以幹嘛',
	description: '自我介紹!',
	execute(message, args) {
        selfintroduce(message,args);
	},
};