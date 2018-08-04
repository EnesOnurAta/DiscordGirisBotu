//Discord.js Kütüphanesi
const Discord = require("discord.js");

//client olan değişkeni Discord.Client()'e atadık
const client = new Discord.Client();

//Gerekli Eklentiler
const Jimp = require('jimp');
const fs = require('fs');

//komut girmeden önce yazılacak ön ek
let prefix = "+";

//Botun Oynuyor kısmı (twitch yayınlı) , Konsola Log veriyor
client.on("ready", () => {
  client.user.setGame("👻 Giriş - Çıkış 👻", "https://www.twitch.tv/enesonurata")
  console.log("Hayalet isimli bot acildi")
});
 
//Sunucuya yeni bir üye girerse "hayalet-log" isimli kanala resimli girişi atar
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'hayalet-log');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

//Sunucudan bir üye çıkarsa "hayalet-log" isimli kanala resimli çıkışı atar
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'hayalet-log');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

//botu ekleyen bir sunucu varsa "${botuekleyenlerkanalı}" olan yeri kanalın ID sini yazın
client.on('guildCreate', guild => {
  let channel = bot.channels.get("${botuekleyenlerkanalı}")
  const embed = new Discord.RichEmbed()
    .setColor("Green")
    .setAuthor(`👻 Eklediler 👻`)
    .setThumbnail(guild.iconURL)
    .addField("Sunucu Adı", guild.name)
    .addField("Kurucu", guild.owner)
    .addField("Sunucu ID", guild.id, true)
    .addField("Toplam Kullanıcı", guild.memberCount, true)
    .addField("Toplam Kanal", guild.channels.size, true)
    .setFooter("${telifhakkı}")
  channel.send(embed);
});
//botu atan bir sunucu varsa "${botueklatanlarkanalı}" olan yeri kanalın ID sini yazın
client.on('guildDelete', guild => {
  let channel = bot.channels.get("${botuatanlarkanalı}")
  const embed = new Discord.RichEmbed()
    .setColor("Red")
    .setAuthor(`👻 Attılar 👻`)
    .setThumbnail(guild.iconURL)
    .addField("Sunucu Adı", guild.name)
    .addField("Kurucu", guild.owner)
    .addField("Sunucu ID", guild.id, true)
    .addField("Toplam Kullanıcı", guild.memberCount, true)
    .addField("Toplam Kanal", guild.channels.size, true)
    .setFooter("${telifhakkı}")
  channel.send(embed);
});
//Botu ekleyen sunucunun kurucusuna botun eklendiğini özelden bildirir
client.on('guildCreate', async guild => {
  const girismesaj = [
    '**${botadı}** sunucunuza başarıyla eklendi.',
    `Botumuzun özelliklerini öğrenmek için ${prefix}yardım yazabilirsiniz.`,
  ]
  guild.owner.send(girismesaj)
});

//Botun açılması için gerek "/ ULTRA | MEGA | SÜPER \" gizli tokeni buraya girin
client.login(process.env.BOT_TOKEN);
