# Тайлсет

За тайлсет скажем спасибо
разработчикам [Diablo III Warcraft](https://www.hiveworkshop.com/threads/diablo-iii-warcraft-beta-v1-19b.112705),
которые выложили [открытую версию](https://www.hiveworkshop.com/pastebin/8d9a0adb7c204239c9635426f35c9522.1378) карты.

<video src="https://youtu.be/LTBkwe3gNk8?si=7Qz2h6H4MdR2goNp"/>

Как и в оригинале, за основу выберем `Icecrown Glacier` и импортируем себе следующие тайлы:

```
TerrainArt\Icecrown\Ice_BlackSquares.blp
TerrainArt\Icecrown\Ice_RuneBricks.blp
TerrainArt\Icecrown\Ice_TiledBricks.blp
```

Так же штатными средствами добавим в набор два тайла из `Cityscape`:

```
TerrainArt\Cityscape\City_BrickTiles.blp
TerrainArt\Cityscape\City_GrassTrim.blp
```

Ну и напоследок заменим один из склонов:

```
ReplaceableTextures\Cliff\Cliff0.blp
```

## Альфа-тайл {id=alpha}

Это просто прозрачный тайл, который позволяет делать интересные вещи. Подробнее можете ознакомиться в
соответствующей [статье](https://xgm.guru/p/wc3/alpha-tiles). Мы же просто импортируем его два раза: для склона и для
текстуры снега.

```
ReplaceableTextures\Cliff\Cliff1.blp
TerrainArt\Icecrown\Ice_Snow.blp
```

