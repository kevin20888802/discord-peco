const Discord = require('discord.js');
const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require('cheerio-tableparser');

const charnames = require('./commandconfigs/charnames.json');

async function run(message, args)
{
        // Get Char Jap Names from json.
        let realname = '';
        let nameindex = 0;
        for(let i = 0 ; i < charnames.charnames.length ; i++)
        {
            for(let j = 0 ; j < charnames.charnames[i].name.length; j++)
            {
                if(charnames.charnames[i].name[j] == args[0] | charnames.charnames[i].value == args[0])
                {
                    realname = charnames.charnames[i].value;
                    nameindex = i;
                }
            }
        }

        var ifchardoc = getCharDocPage(realname,function(chardocpage)
        {
            if(chardocpage != null)
            {
                var achardoc = getCharDoc(chardocpage, function(adoc)
                {
                    let theembed = new Discord.RichEmbed()
                        .setColor('#75A518')
                        .setTitle(charnames.charnames[nameindex].name[0])
                        .setURL(chardocpage)
                        .setImage(adoc.chrpicurl)
                        .addField('強度評價:', adoc.charrate, true)
                        .addField('角色定位:', adoc.chartyp, true)
                        .addField('角色種族:', adoc.charloc, true)
                        .addField('初始星數:', adoc.charrare, true)
                        .addField('角色站位:', adoc.charclass, true)
                        .addField('角色聲優:', adoc.charcv, true)
                        .setTimestamp()

                    console.log(adoc.charpicurl);
                    message.channel.send(theembed);
                });
            }
            else
            {
                message.channel.send('哦?找不到' + args[0] + '呢。');
            }
        });


}

function getCharDocPage(aname, callback) 
{
    // Get Char Page On Main Page by Jap Name.
    request('https://gamewith.jp/pricone-re/article/show/92923', function (err, resp, body) {
        $ = cheerio.load(body);
        var thetable = $('.sorttable tr'); //use your CSS selector here
        for (let i = 1; i < thetable.length; i++) { // 走訪 tr
            if (thetable.eq(i).attr('data-col1') == aname) {
                const table_td = thetable.eq(i).find('td');
                callback(table_td.eq(0).find('a').attr('href').toString());
                break;
            }
        }
    });
}

function getCharDoc(aurl, callback)
{
    var achardoc = new Object();
    achardoc.chrpicurl = '';
    achardoc.charrate = '';
    achardoc.chartyp = '';
    achardoc.charloc = '';
    achardoc.charrare = '';
    achardoc.charclass = '';
    achardoc.charcv = '';

    request(aurl, function (err, resp, body) {
        $ = cheerio.load(body);
        let thetable = $('.puri_hyouka_table tr'); //use your CSS selector here
        achardoc.charrate = thetable.eq(0).find('td').eq(0).text();
        achardoc.chartyp = thetable.eq(1).find('td').eq(0).text().substring(0,3);
        let imgclass = $('div.pcr_img_charatop');
        achardoc.chrpicurl = imgclass.find('a').attr('href').toString();
        let bottable = $('.puri_kihon_table tr');
        achardoc.charclass = bottable.eq(0).find('td').eq(0).text();
        achardoc.charrare = bottable.eq(1).find('td').eq(0).text();
        achardoc.charloc = bottable.eq(2).find('td').eq(0).text();
        achardoc.charcv = bottable.eq(4).find('td').eq(0).text();
        callback(achardoc);
    });
}



module.exports = {
name: 'charinfo,角色,角色資訊,找人,帶我認識,幫我找',
description: '找尋公主連結:ReDive!裡的角色資訊!',
execute(message,args) {
    run(message,args);
},
};