import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import moment from 'moment-timezone'
import fs from 'fs'
import fetch from 'node-fetch'
  import jimp from 'jimp'
  
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Kurang *${max - user.exp}* lagi! ✨
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    let pp = 'https://telegra.ph/file/712e80d59373d2dfe5cbe.jpg'
    const vv = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
              
    let hh = API('males', '/levelup', {
                                pp: vv,
                                })
    if (before !== user.level) {
        let teks = `.             ${user.role}`
        let str = `
*🎉 𝗦 𝗘 𝗟 𝗔 𝗠 𝗔 𝗧🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]`.trim()
        try {
        const img = await levelup(teks, user.level)
            conn.send3ButtonImg(m.chat, await(await fetch(hh)).buffer(), `𝗦𝗘𝗟𝗔𝗠𝗔𝗧, ᴀɴᴅᴀ ᴛᴇʟᴀʜ ɴᴀɪᴋ ʟᴇᴠᴇʟ!!\n⚙ Lᴇᴠᴇʟ : ${user.level}\n⚙ Rᴏʟᴇ : ${user.role}`, botdate, 'ᴍᴇɴᴜ', '.menu', 'ᴏᴡɴᴇʀ', '.owner', 'Credit', '.credit', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    description: sgc,
    title: "𝗫𝗙𝗲𝗿𝗱 𝗕𝗢𝗧",
    body: wm,
    thumbnail: await(await fetch(pp)).buffer(),
    sourceUrl: sgc
   }}})
        } catch (e) {
       /*     conn.sendButton(m.chat, str, botdate, [['INVENTORY', '.inv']], m)*/
            conn.send3ButtonImg(m.chat, await(await fetch(hh)).buffer(), `𝗦𝗘𝗟𝗔𝗠𝗔𝗧, ᴀɴᴅᴀ ᴛᴇʟᴀʜ ɴᴀɪᴋ ʟᴇᴠᴇʟ!!`, botdate, 'ᴍᴇɴᴜ', '.menu', 'ᴏᴡɴᴇʀ', '.owner', 'Credit', '.credit', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    description: sgc,
    title: "𝗫𝗙𝗲𝗿𝗱 𝗕𝗢𝗧",
    body: wm,
    thumbnail: await(await fetch(pp)).buffer(),
    sourceUrl: sgc
   }}})
        }
    }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^level(|up)$/i

export default handler
