# Scene prompt template

Use the approved Momo reference image as image input:

`production/assets/mascot/reference/momo-character-sheet-v1.png`

## Prompt

```text
以参考图中的同一只奶油色猫店长为唯一角色，严格保持它的脸型、点状深墨眼、小三角赭红鼻、短嘴、短圆耳、鼠尾草绿领巾、赭红围裙、胸前小杯子徽章、粗墨线和平涂风格。参考图只提供角色设定，不要复刻四视图排版。

竖版 9:16 场景：{{scene}}。Momo 在{{position}}，{{pose}}，{{expression}}，看向{{direction}}。{{props}}。画面{{blank_area}}留出干净空白，给{{ui}}使用。背景是{{background}}。扁平 2D 矢量插画，粗而干净的深墨线，有限色板，平涂，无渐变，无 3D，无写实光影。角色完整入画，{{no_crop}}。

必须出现：{{required_props}}。

绝对不要出现任何文字：不要招牌、不要店名、不要菜单、不要价格、不要字母、不要数字、不要汉字、不要条码、不要标签、不要水印。墙面、杯子、纸袋、小票、围裙徽章、柜台全部保持空白。no text, no signage, no typography, no letters, no numbers, no Chinese characters, no barcode.

禁止：竖起手指、比数字、人类手指、多余肢体；复刻设定图网格；3D、照片、复杂渐变、发光、强投影、毛发细节、裁切。
```

## Intro Momo prompt (p01)

Use the same character sheet. This is a portrait intro asset, not a full scene.

```text
以参考图中的同一只奶油色猫店长为唯一角色，严格保持脸型、点状深墨眼、小三角赭红鼻、短嘴、短圆耳、鼠尾草绿领巾、赭红围裙、胸前小杯子徽章、粗墨线和平涂风格。参考图只提供角色设定，不要复刻四视图排版。

竖版 9:10 角色引导图：Momo 位于画面下半部中央，{{intro_pose}}，{{intro_expression}}，看向{{intro_direction}}。上半部保持纯净暖奶油色空白，给标题和英文问题使用。不要奶茶杯、纸袋、柜台或任何道具，除了{{intro_prop}}。背景是暖奶油色 #F4E9D8，轻微纸张颗粒。扁平 2D 矢量插画，粗而干净的深墨线，有限色板，平涂，无渐变，无 3D，无写实光影。角色完整入画，脚和头顶不被裁切。

绝对不要出现任何文字：不要对话气泡、不要问号、不要字母、不要数字、不要汉字、不要标签、不要水印。no text, no speech bubble, no question mark, no letters, no numbers.

禁止：复刻设定图四视图排版；正面呆站；竖起手指、比数字、人类手指、多余肢体；3D、照片、复杂渐变、发光、强投影、毛发细节、裁切。
```

Example pose values:

- 奶茶 / 点单：一只爪子托下巴，仰头看向右上方，好奇
- 旅行：低头看手里的车票，微微皱眉
- 餐厅：拿着菜单，抬头看店员
- 诊所：一只手轻碰脸颊，担心
- 办公室：端着马克杯，思考
- 购物：拎着纸袋，看价签

## Filled example

```text
竖版 9:16 奶茶店词页场景：Momo 站在画面下半部偏左，一只手拿着一杯奶茶，杯盖中央插着一根透明吸管；另一只手自然放着，不要抬起任何一只爪子。表情平静友好，看向右侧。画面右侧和上方留出大面积干净空白，给词卡、气泡问句、答句和倒计时使用。背景只有一面空白暖奶油色墙和一条极简柜台。扁平 2D 矢量插画，粗而干净的深墨线，有限色板，平涂，无渐变，无 3D，无写实光影。角色完整入画，脚和杯子不被裁切。

必须出现：透明吸管插在奶茶杯盖中央。
```

## Rejection triggers

- any generated sign/menu/receipt text
- human fingers
- single raised finger unless explicitly needed
- character sheet grid
- missing straw/prop
- cropped feet
- busy right side that leaves no UI space
