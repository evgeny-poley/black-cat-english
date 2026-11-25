# Промпты для иллюстраций

> **Статус (25.11.2026):** все карточки уроков 1–5 и портреты 4 героев сгенерированы через Figma MCP (модель gpt-image-2.5-flare) в файле Figma «temp». Оригиналы 1024 px лежат в `art_full/`, сжатые 512 px — в `img/`. Чтобы переделать картинку, найдите её промпт ниже и сгенерируйте заново.

Как подключить картинку: сохраните файл в папку `img/` под именем из списка (например `img/w_happy.png`). Подходят PNG, SVG, WebP или JPG. Курс сам заменит эмодзи на картинку, в коде ничего менять не нужно.

Рекомендации к файлам:
- квадрат 1:1, от 512×512 px;
- для карточек слов: прозрачный или однотонный светлый фон `#FFF7EA`;
- предмет по центру, с отступом примерно 10% от краёв;
- без текста и букв на картинке (иначе ребёнок «читает» картинку, а не слово).

---

## 0. Общие «шапки» стиля

Вставляйте нужную шапку в начало каждого промпта.

**Стиль A: карточки слов**
```
Flat vector illustration for a children's English learning app, age 8–10. Simple bold shapes, thick dark navy outline (#2A2550), bright friendly palette: violet #6B4BD8, warm yellow #F6B92B, sky blue #3FA3F2, mint #2EC4A0, coral #FF6B6B, cream background #FFF7EA. One clear subject, centered, no text, no letters, no background clutter, soft flat shadow under the subject. Cute, readable at small size.
```

**Стиль B: сцены и истории**
```
Storybook illustration for a children's book, age 8–10, soft gouache and watercolor textures, warm magical light, gentle grain, cozy evening city with a hint of magic (floating sparkles, glowing street lamps). Same character designs as the reference sheet, same palette: violet #6B4BD8, warm yellow #F6B92B, sky blue #3FA3F2, mint #2EC4A0, coral #FF6B6B, deep navy #2A2550. No text, no letters.
```

---

## 1. Лист персонажей (делать первым)

Сначала сделайте лист персонажей, потом используйте его как референс для всех сцен. Это нужно, чтобы герои везде были одинаковыми.

**char_blackcat**: Black Cat, парень-полицейский
```
[Стиль A] Character design sheet: "Black Cat", a young man (about 20) who works as a police officer, nicknamed Black Cat. Slim and agile, messy black hair, bright green eyes, confident friendly smile. Navy-blue police uniform with a gold star badge, navy cap with a small black cat silhouette emblem. Kid-friendly proportions (slightly big head). Front view, 3/4 view, and three emotions: happy, thinking (hand on chin like a detective), surprised. Original character, not resembling any existing cartoon or movie character.
```

**char_reka**: Reka (Ре́ка), девочка-капибара
```
[Стиль A] Character design sheet: "Reka", a calm and funny girl capybara. Round barrel-shaped body, warm caramel-brown fur, small round ears, sleepy half-closed kind eyes, tiny smile. Wears a small mint-green scarf. Often has a little orange (fruit) on her head. Front view, 3/4 view, and three emotions: relaxed happy, hungry (licking lips, hand on tummy), sleepy. Original character.
```

**char_plus**: Doctor Plus, девушка-доктор, подруга Чёрной кошки
```
[Стиль A] Character design sheet: "Doctor Plus", a young woman (about 20) who is a kind, cheerful doctor and a friend of Black Cat. Warm smile, hair in a high ponytail, round glasses. White doctor's coat, a stethoscope around her neck, a big red plus sign as her symbol (on a hair clip and on the coat pocket). Kid-friendly proportions matching Black Cat. Front view, 3/4 view, and three emotions: smiling, listening carefully with a stethoscope, laughing. Original character.
```

**char_susan**: Susan, такси
```
[Стиль A] Character design sheet: "Susan", a cheerful yellow taxi car with a face. Rounded cute car body, warm yellow #F6B92B, a checkered stripe on the side, a "taxi" sign on the roof shown only as a light without letters, big friendly eyes as the windshield, a wide smile on the bumper, long eyelashes. Front view, side view, and three emotions: happy, winking, in a hurry (motion lines). Original character.
```

---

## 2. Урок 1: карточки слов (стиль A)

| Файл | Промпт после шапки A |
|---|---|
| `w_hello.png` | A smiling child waving one hand high to say hello, simple pose, upper body |
| `w_goodbye.png` | A smiling child walking away and waving goodbye over the shoulder, a door in the background as a simple shape |
| `w_boy.png` | A cheerful boy, about 9 years old, short hair, t-shirt, full body, standing, neutral friendly pose |
| `w_girl.png` | A cheerful girl, about 9 years old, two ponytails, dress or t-shirt, full body, standing, neutral friendly pose |
| `w_cat.png` | A cute ordinary ginger cat sitting on four legs, no clothes |
| `w_capybara.png` | An ordinary capybara standing on four legs, side view, realistic proportions but simplified, no clothes |
| `w_policeman.png` | A friendly police officer (adult human), navy uniform and cap, gold badge, thumbs up |
| `w_doctor.png` | A friendly doctor (adult human), white coat, stethoscope around neck, holding a clipboard |
| `w_taxi.png` | An ordinary yellow taxi car without a face, side view, checkered stripe, roof light without letters |
| `w_happy.png` | A child's face with a big happy smile, eyes closed in joy, rosy cheeks, close-up |
| `w_sad.png` | A child's face looking sad, a single tear, mouth turned down, close-up |
| `w_tired.png` | A child yawning with a hand over the mouth, droopy eyes, close-up, a small "zzz" shape (no letters, just wavy lines) |
| `w_hungry.png` | A child holding their tummy, looking at an imaginary plate, mouth watering, close-up |
| `w_fine.png` | A child's hand showing thumbs up with a calm smiling face behind it |

Детские лица делайте **одним и тем же ребёнком**: для этого в промпты лиц добавьте «same child character as in w_boy/w_girl».

---

## 3. Урок 1: сцены (стиль B), по желанию

Сцены в курсе пока нигде не показываются. Их можно сделать позже, движок под них расширим.

**scene_L01_intro**: знакомство
```
[Стиль B] Susan the yellow taxi car arrives at a cozy police station in the evening. Black Cat, the young police officer with black hair, Reka the capybara with a mint scarf and Doctor Plus stand in a row in front of the station, waving hello. Warm, welcoming, everyone smiling. Wide 16:9.
```

**scene_L01_story**: Black Cat и Reka
```
[Стиль B] Black Cat, the young police officer with black hair, meets Reka the capybara by a small pond in a park. Reka is holding her tummy and looking hungry, dreaming of a big orange (shown as a thought bubble with an orange, no text). Black Cat smiles and waves. Wide 16:9.
```

---

## 4. Карта (по желанию)

**map_bg.png**: фон карты
```
[Стиль A] Top-down cute map of a small magical town for a kids game, soft green parks, a pond, trees, little houses, a winding grey road that snakes in three horizontal rows across the map (left to right, then right to left, then left to right). No text, no letters. Wide 16:10.
```
_(Для фона карты понадобится маленькая правка в коде, напишите, когда он будет готов.)_

---

## 5. Урок 2: карточки слов (стиль A)

Члены семьи на всех карточках — **одна и та же семья**, нарисованная в одном стиле. Удобно сделать сначала общий лист семьи («family character sheet: mum, dad, brother, sister, grandma, grandpa, baby»), а потом вырезать каждого.

| Файл | Промпт после шапки A |
|---|---|
| `w_family.png` | A happy family standing together: mum, dad, a girl and a boy, a baby in mum's arms, everyone smiling, full bodies |
| `w_mum.png` | A friendly mum, about 35, warm smile, casual clothes, upper body, waving |
| `w_dad.png` | A friendly dad, about 38, short beard, casual sweater, upper body, smiling |
| `w_brother.png` | A boy about 12, the older brother, hoodie, playful grin, full body (different from w_boy: older, hoodie) |
| `w_sister.png` | A girl about 6, the little sister, pigtails, holding a teddy bear, full body (different from w_girl: younger) |
| `w_grandma.png` | A kind grandma with grey hair in a bun, round glasses, knitted cardigan, gentle smile, upper body |
| `w_grandpa.png` | A cheerful grandpa with a white moustache, flat cap, vest, holding a walking stick, upper body |
| `w_baby.png` | A cute baby sitting, holding a rattle, big eyes, happy |
| `w_friend.png` | Two kids (a boy and a girl) hugging shoulder to shoulder and laughing, best friends |
| `w_dog.png` | A friendly fluffy dog sitting, tongue out, wagging tail, simple |
| `w_big.png` | A huge friendly elephant next to a tiny flower for scale, the elephant fills the frame |
| `w_small.png` | A tiny cute mouse next to a big piece of cheese for scale, the mouse is very small in the frame |

**scene_L02_album** (стиль B, по желанию)
```
[Стиль B] Cozy living room in the evening. Black Cat, the young police officer with black hair, shows a big family photo album to Doctor Plus, a young woman doctor with a ponytail and round glasses. In the album: his mum, his dad, his little sister and a big fluffy dog. Warm lamp light. Wide 16:9.
```

---

## 6. Как формулировался промпт при генерации

Шапка, которая реально использовалась для всех карточек (короче, чем шапка A, и с жёстким фоном):
```
Flat vector illustration for a children's English learning app, age 8–10. Simple bold shapes, thick dark navy outline (#2A2550), bright friendly palette: violet #6B4BD8, warm yellow #F6B92B, sky blue #3FA3F2, mint #2EC4A0, coral #FF6B6B, plain solid cream background #FFF7EA. One clear subject, centered, generous margin around it, no text, no letters, no background clutter, soft flat shadow under the subject. Cute, readable at small size. Subject: …
```
Дети в карточках чувств (sad, tired, hungry, fine, happy) — один и тот же мальчик: «9-year-old boy with brown messy hair, blue t-shirt».

## 7. Уроки 3–5: что после «Subject:»

| Файл | Subject |
|---|---|
| `w_frog` | a cute green frog sitting, big round eyes, happy smile |
| `w_duck` | a cute white duck with an orange beak standing, side view |
| `w_bee` | a cute round bee with yellow and dark stripes and small wings, flying |
| `w_bird` | a cute small sky-blue bird sitting, round body |
| `w_tree` | a single round leafy green tree with a brown trunk |
| `w_flower` | a single coral-pink flower with a yellow center, green stem and two leaves |
| `w_sun` | a smiling warm yellow sun with simple rays and rosy cheeks |
| `w_boat` | a small wooden sailing boat with a white-and-coral sail on a little wave |
| `w_two` … `w_five` | «Counting card: exactly TWO red apples / THREE yellow stars / FOUR blue balloons 2×2 / FIVE violet buttons like a dice face», no digits |
| `w_box` | a closed brown cardboard box with tape on top, no labels |
| `w_bag` | a violet handbag with a handle and a gold clasp |
| `w_key` | a single golden old-fashioned key with a round bow, a tiny sparkle |
| `w_hat` | a navy top hat with a coral ribbon band |
| `w_clock` | a round coral alarm clock with two bells, face with tick marks only (no numbers) |
| `w_lamp` | a mint-green desk lamp, switched on, warm light |
| `w_cup` | a sky-blue cup with a handle on a saucer, a little steam |
| `w_chair` | a simple wooden chair with a yellow seat cushion, 3/4 view |
| `w_sock` | a single striped sock with coral and mint stripes |
| `w_shoe` | a single sky-blue children's sneaker with white laces, side view |
| `w_phone` | a violet smartphone, screen with a soft gradient only, no icons |
| `w_door` | a closed coral front door with a round yellow knob and a small round window |
| `w_letter` | a closed white envelope with a small red heart seal |
| `w_parcel` | a parcel in brown paper tied with string and a bow |
| `w_stamp` | a large postage stamp with wavy edges and a tiny flower picture, no numbers |
| `w_postbox` | a classic round red street postbox, no words |
| `w_red` … `w_purple` | «Colour card from a series: one big round cute paint splash blob with a small happy face. The blob is pure bright RED / BLUE / …». Для white фон светло-серо-голубой #DDE3EE |

Портреты героев (`char_*`) сделаны по описаниям из раздела 1, но одним кадром (портрет до пояса), а не листом с ракурсами.
