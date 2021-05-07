---
title: 'Server-side Economies'
preview: 'How to enable server-side economies in your discord.'
date: '2021-05-06'
---

## What is a server-side economy?

With server-side economies, you can keep all items, money, badges, and player stats isolated to a discord server. This means that players will only have access to these items when they are in your server. Server-side economies also give more control to the owners of the server. Moderators with the `Manage Server` permission will be able to give items to players or even wipe all data for the server.

## Some Notes About Server-Side Economies

If you enable server-side economies, you'll notice some differences from the usual global economy:

- Clans are disabled.
- The black market is disabled.
- Some notification settings are disabled such as black market notifications, attack notifications and clan raid notifications.
- The `convert` command cannot be used.
- The monthly level wipe does **NOT** affect server-side economies. We feel that server moderators should use the `wipeserver` command instead.

## Enabling server-side economy

If you have the `Manage Server` permission, you can toggle server-side economy using the `toggleservereconomy` command.

**IMPORTANT NOTE: There is a 3 day cooldown before you can use the command again, this is because the command deactivates all players in a server and would be abused otherwise.**

![using the toggleservereconomy command](./serversidecommand.png)

## Moderation Commands

As a server moderator, you can use various commands to control the economy:

- `giveitem` - Used to give items to players.
- `wipeserver` - Used to wipe everyone in the server, good for when you want to hold contests (first person to get x item wins, first to get x kills wins, etc).

![using the giveitem command](./giveitemcommand.png)