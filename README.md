# @helpr/modern-rank-card

### This version is used by the Discord Bot Helpr to generate rank cards

[![downloadsBadge](https://img.shields.io/npm/dt/@helpr/modern-rank-card?style=for-the-badge)](https://npmjs.com/@helpr/modern-rank-card)
[![versionBadge](https://img.shields.io/npm/v/@helpr/modern-rank-card?style=for-the-badge)](https://npmjs.com/@helpr/modern-rank-card)

## Easy setup!

With `modern-rank-card` you can add beautiful modern images to the ranks of your Discord bot level system.
Beautiful, Efficient and Light.

## Installation

```bash
$ npm install --save @helpr/modern-rank-card
```

## Here's a complete example (compatible with discord.js v14+)

```js
const Canvas = require("@helpr/modern-rank-card"),
const { AttachmentBuilder } = require("discord.js");

let image = await new Canvas.RankCard()
.setAddon("xp", false)
.setAddon("rank", false)
.setAddon("color", true)
.setAvatar(message.author.displayAvatarURL({ extension: "png" }))
.setUsername(message.author.username)
.setLevel(96)
.setXP("current", 26300)
.setXP("needed", 51000)
.setColor("level", "#ffffff")
.setBackground("https://i.imgur.com/hwgvX0t.png")
.toAttachment();

let attachment = new AttachmentBuilder(image.toBuffer(), { name: "rank.png" });

message.channel.send({ file: [attachment] })
```

## Credits

Made by [Max](https://github.com/hello391)
My Discord: [@.max\_\_\_\_](https://discord.com/users/767480706606694406)
