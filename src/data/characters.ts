import { Character } from "../types";

export const characters: Character[] = [
  {
    id: "bette",
    name: "Bette Porter",
    work: "The L Word",
    tags: ["强势主导", "野心家", "渴望深切连接"],
    description: "你用强势和掌控感武装自己，但那层坚硬的铠甲下，是一个极其渴望被真正看见的灵魂。你爱得很深，只是习惯用行动、成就和压倒性的存在感来证明自己值得被爱。你有着极高的边界感，但在你认定的关系里，你愿意倾注绝对的热情。你最大的困境往往是你自己——太清楚自己要什么，却又在脆弱时习惯性地推开别人。",
    whisper: "你不需要时刻赢，才能在这个世界上获得爱。",
    coords: { burn: 0.55, boundary: 0.7, give: 0.6, speak: 0.8 }
  },
  {
    id: "tina",
    name: "Tina Kennard",
    work: "The L Word",
    tags: ["温和包容", "习惯退让", "重新觉醒"],
    description: "你温柔、包容，在关系里总是习惯性地退让和承接。你有着极低的心理防线，愿意为了爱人不断妥协。但你最深的困境是：你太擅长适应别人，久而久之却忘了自己原本的模样。你并非没有力量，只是你的力量一直都在撑着别人。当你终于学会把边界拉回，开始找回自我时，那才是你最强大、最动人的时刻。",
    whisper: "当你开始把边界拉回，看见自己，你才拥有了真正的力量。",
    quote: {
      original: "First, last and forever.",
      translation: "你是我的最初，最终和永恒。",
    },
    coords: { burn: -0.6, boundary: -1.0, give: -0.7, speak: -0.8 }
  },
  {
    id: "shane",
    name: "Shane McCutcheon",
    work: "The L Word",
    tags: ["漫不经心", "防卫性游离", "天生吸引力"],
    description: "你天生带有一种吸引力，不需要刻意努力，别人就会不由自主地靠近你。但你比谁都清楚，高筑的心理围墙让你在亲密关系中下意识地想要逃离。你不是不在乎，你只是不知道如果留下来，到底该如何面对那份沉重。你的洒脱是真的，游离是真的，那份因为害怕受伤而选择的孤独，也是真的。",
    whisper: "不用急着逃离，这一次，你可以试着留下来看看。",
    quote: {
      original: "I don't do relationships.",
      translation: "我不维系稳定恋爱关系。",
    },
    coords: { burn: -0.9, boundary: 0.9, give: 0.3, speak: -0.8 }
  },
  {
    id: "alice",
    name: "Alice Pieszecki",
    work: "The L Word",
    tags: ["幽默外延", "高表达欲", "敏感不安"],
    description: "你拥有极强的表达欲，习惯用话语填满每一个沉默，用幽默化解每一个尴尬。你是人群中最活跃的那一个，但只有你自己知道，那些外放的情绪里藏着多少不确定和敏感。你对感情极度认真，只是往往被自己过于直率的嘴巴掩盖——说了那么多，却很难让人看透你真正深藏的那份脆弱。",
    whisper: "如果偶尔沉默，那个对的人也能听懂你没有说出口的话。",
    quote: {
      original: "Lesbians think friendship is another word for foreplay!",
      translation: "女同性恋总把友谊当成前戏的代名词！",
    },
    coords: { burn: -0.5, boundary: 0.5, give: -0.6, speak: 1.0 }
  },
  {
    id: "dana",
    name: "Dana Fairbanks",
    work: "The L Word",
    tags: ["压抑克制", "循规蹈矩", "潜藏勇气"],
    description: "你习惯用自律和外界的成就把自己包裹起来，但在那扇紧闭的门后，是一个极度渴望爱却又难以开口的灵魂。你的内心其实有一团火，防线也没想象中那么无坚不摧。你并非不知道自己真正想要什么，只是在勇敢面对前，经历了漫长而真实的挣扎。一旦你决定破茧，那份迟来的勇气将无比耀眼。",
    whisper: "承认自己想要什么并不可耻，你的勇敢比你想象的更迷人。",
    quote: {
      original: "Every time I'm attracted to somebody she's either unavailable or straight.",
      translation: "每次我爱上一个人，她不是名花有主，就是直的。",
    },
    coords: { burn: 0.6, boundary: -0.5, give: -0.3, speak: -0.7 }
  },
  {
    id: "helena",
    name: "Helena Peabody",
    work: "The L Word",
    tags: ["优越外壳", "强势姿态", "渴望纯粹"],
    description: "你曾习惯用优越的条件和强势的姿态来定义自己，但真正卸下防备后，你会发现自己内心深处想要的，不过是被纯粹地选择。你渴望爱，并且愿意在关系中真诚地付出和表达。当你跌落神坛、失去世俗的铠甲后，那个略带笨拙却毫无保留的你，反而比从前任何时候都更加真实可爱。",
    whisper: "失去所谓的铠甲也无妨，你最纯粹的那颗心，才是最宝贵的礼物。",
    quote: {
      original: "Does it make any difference if I'm fucking a beautiful woman for money?",
      translation: "那又有什么区别？我为了钱跟漂亮女人上床，还不都是一回事？",
    },
    coords: { burn: 0.3, boundary: -0.4, give: 0.5, speak: 0.7 }
  },
  {
    id: "jenny",
    name: "Jenny Schecter",
    work: "The L Word",
    tags: ["极度敏感", "自我沉溺", "艺术人格"],
    description: "你极度敏感，爱起来像是一场自我燃烧的剧本，热烈、神经质且不留余地。你几乎没有防备心理，随时准备将自己完全沉浸在情感的风暴中。但同时，你也极度渴望索取，爱得用力，伤人也往往很深。你用锋利的感知去碰撞世界，有时连你自己都分不清，究竟是你在经历生活，还是在为自己撰写剧情。",
    whisper: "不要被自己写下的悲伤剧本困住，生活还可以有别的结局。",
    coords: { burn: 0.9, boundary: -0.9, give: -1.0, speak: 0.9 }
  },
  {
    id: "carmen",
    name: "Carmen de la Pica Morales",
    work: "The L Word",
    tags: ["热情奔放", "直截了当", "不畏世俗"],
    description: "你热情、奔放，爱起来直截了当、毫不掩饰。即便面对外界的重重压力，你也从未因此变得胆怯。你有着极高的燃烧度，愿意为爱付出，也敢于大声宣告自己的心意。你坚信真实的爱值得去冒险，并总是用果敢的行动去证明这一点。你最迷人的地方，就在于那份永不妥协的坦荡。",
    whisper: "保持你的坦荡，那份毫不掩饰的爱意，值得被完全接纳。",
    coords: { burn: 0.9, boundary: -0.2, give: 0.8, speak: 0.9 }
  },
  {
    id: "jodi",
    name: "Jodi Lerner",
    work: "The L Word",
    tags: ["独立清醒", "不逾边界", "赤诚深情"],
    description: "你有着极其强烈的自我，强大到有时会让人觉得难以妥协。你绝不为任何越界的行为让步，内心的边界清晰到近乎锋利。但在你坚硬的外壳下，其实藏着真挚的深情。你爱得纯粹而清醒，不轻易给出承诺，但一旦认定，哪怕只用行动去倾诉，也是最赤诚的全部。你的世界里，爱是从不将就的底线。",
    whisper: "坚守自我的同时，不妨偶尔允许自己柔软地落下。",
    quote: {
      original: "Maybe she's a spaghetti girl. Straight until wet.",
    },
    coords: { burn: 0.6, boundary: 1.0, give: 0.2, speak: 0.5 }
  },
  {
    id: "marina",
    name: "Marina Ferrer",
    work: "The L Word",
    tags: ["神秘诱惑", "深度游离", "内心孤独"],
    description: "你是人群中最神秘的那一个，习惯用眼神和氛围去勾住别人，却又在对方彻底沉沦前游离。这并不是因为你无情，而是高耸的边界感让你太清楚这种魅力背后的孤独。你渴望主动去爱，却又极其讳莫如深，把真实的软弱藏得滴水不漏。你的一生，其实都在寻找一个能真正透过迷雾、留住你的人。",
    whisper: "其实别人并不是无法走近你，只要你愿意留下一扇半开的门。",
    coords: { burn: 0.3, boundary: 0.7, give: 0.6, speak: -0.5 }
  },
  {
    id: "carol",
    name: "Carol Aird",
    work: "《卡罗尔》",
    tags: ["成熟笃定", "克制深沉", "极重分寸"],
    description: "你成熟、清醒，深知自己在这个复杂世界中的位置。你有着极高的边界感，绝不轻易让别人看透你的脆弱。你爱得克制而深沉，不是因为不爱，而是你把感情当作一件极其郑重的事。你不善于把爱挂在嘴边，所有的波澜都被压抑在平静的外表下。但当你看向她时，那个深邃的眼神里其实已经说明了一切。",
    whisper: "那些压抑在平静之下的波澜，终会遇到能够温柔接住它们的人。",
    coords: { burn: -0.7, boundary: 0.8, give: -0.6, speak: -0.9 }
  },
  {
    id: "adele",
    name: "Adèle",
    work: "《蓝色是最温暖的颜色》",
    tags: ["感性本能", "全盘托出", "毫无防线"],
    description: "你爱起来就像一场无法阻挡的洪水，没有防线，也没有保留，心甘情愿地将自己彻底融化在对方的世界里。你极度感性，甚至会为了这份热烈而失去自我。面对感情的复杂，你往往不知如何为自己辩解，只能用最原始的直觉去索取和挽留。那份坐在人群中依然会不由自主流下的眼泪，是你爱得最诚实的证明。",
    whisper: "爱如洪水般热烈很美，但记得在奔涌中，留下属于自己的孤岛。",
    quote: {
      original: "Je t’aime. Je n’ai jamais aimé personne d’autre que toi. Je ne veux que toi.",
      translation: "我爱你。我从来只爱过你一个人。我只要你。",
    },
    coords: { burn: 0.9, boundary: -0.9, give: -0.4, speak: -0.7 }
  },
  {
    id: "emma",
    name: "Emma",
    work: "《蓝色是最温暖的颜色》",
    tags: ["理智清醒", "坚守核心", "自我保护"],
    description: "你清醒自知，知道自己要走向哪里，也知道什么时候该保持距离。这并非冷血，而是一种历经成长后形成的自我保护。你拥有极高的边界感，虽然愿意在关系中给予，但绝不会为了爱而彻底迷失自己的方向和核心。你真的爱过，只是在燃烧与自我之间，你始终理智地紧握着最后的方向盘。",
    whisper: "掌控方向盘固然安全，但偶尔的失控，也是爱情里迷人的风景。",
    quote: {
      original: "Je suis avec quelqu'un maintenant. Mais j'ai une tendresse infinie pour toi. Je l'aurai toujours. Toute ma vie.",
      translation: "我已经和别人在一起了，但我对你有着无限的温柔，永远如此，一生一世。",
    },
    coords: { burn: -0.4, boundary: 0.9, give: 0.2, speak: -0.4 }
  },
  {
    id: "hideko",
    name: "和泉秀子",
    work: "《小姐》",
    tags: ["深藏不露", "精心伪装", "极度渴望"],
    description: "你习惯于深藏不露，在周遭的审视和险恶中筑起高墙。别人以为他们了解你，但很少有人能看透你精致的伪装。表面上你被动、克制，甚至难以被触碰，但你的内心其实燃烧着极其炽烈的情感。直到那份意料之外的闯入打破了你的防线。你动了真情，不是因为软弱，而是你的心一直在等一个能真正交付底牌的人。",
    whisper: "卸下伪装需要极大的勇气，但为了那颗对的心，这一切都值得。",
    coords: { burn: 0.8, boundary: 0.4, give: -0.5, speak: -0.8 }
  },
  {
    id: "namsook",
    name: "南珠",
    work: "《小姐》",
    tags: ["聪明狡黠", "主动谋划", "真情流露"],
    description: "你聪明、狡黠，习惯了主动出击和默默盘算。你保持着谨慎的边界，但在那些理性的谋划之外，你遇到了一个没能算准的意外：你彻底沦陷了。你以为可以控制一切，结果却发现自己倾尽所有地付出了真心。虽然你不擅长直白地说爱，但你那笨拙却奋不顾身的行动，是你这一生最勇敢的底色。",
    whisper: "算错一次又何妨？那些计划之外的心动，往往才是最深刻的答案。",
    coords: { burn: 0.6, boundary: 0.6, give: 0.7, speak: -0.6 }
  },
  {
    id: "marianne",
    name: "Marianne",
    work: "《燃烧女子的肖像》",
    tags: ["沉默凝视", "深沉内敛", "记忆长存"],
    description: "你习惯做一个安静的凝视者，用心记住对方的所有细节。你有着极强的自我边界，情感虽然内敛，却有着持久的余温。其实你在关系中较为被动，也极少用语言剖白内心，但你的爱深沉且带有某种命运般的从容。纵使这注定是一场短暂的交集，你依然选择全力以赴地去铭记，因为有些瞬间，值得用一生来珍藏。",
    whisper: "用眼睛凝视、去铭记很好，但有机会的话，也闭上眼去体会当下的温度。",
    quote: {
      original: "Il choisit le souvenir d'Eurydice, c'est pour ça qu'il se retourne. Il ne fait pas le choix de l'amoureux, mais le choix du poète.",
      translation: "他选择记住欧律狄刻，所以他才回头的。他做的不是爱人的选择，而是诗人的选择。",
    },
    coords: { burn: 0.3, boundary: 0.8, give: -0.2, speak: -0.9 }
  },
  {
    id: "heloise",
    name: "Héloïse",
    work: "《燃烧女子的肖像》",
    tags: ["刚烈倔强", "决绝反抗", "炽热燃烧"],
    description: "你性情刚烈、倔强，骨子里拒绝一切被安排好的规训。你的反抗不是喧嚣的，而是沉默的、坚定的、不可动摇的。在极高边界感的保护下，你一旦选择敞开心扉，那将是极度炽热的燃烧。你爱得决绝，恨也决绝。哪怕知道一切终将结束，你也会用尽全力去燃烧那份自由，绝不浪费哪怕一秒钟的真实。",
    whisper: "即使结局注定，痛快地燃烧过一次，便再也没有遗憾。",
    quote: {
      original: "Si vous me regardez, qui je regarde moi?",
      translation: "当您注视画中人，我又注视谁呢？",
    },
    coords: { burn: 0.8, boundary: 0.9, give: 0.4, speak: -0.7 }
  },
  {
    id: "tala",
    name: "Tala",
    work: "《同心难改》",
    tags: ["背负期待", "内在挣扎", "最终释放"],
    description: "你肩负着许多外在的期待，在世俗的轨道上走得看似顺遂。但你的内心始终有一团火，提醒着你那不是你真正想要的。你有着清晰的边界，但在感情里你愿意主动付出、也敢于表达。哪怕犹豫过、害怕过，你最终还是选择忠于内心的渴望，勇敢挣脱束缚。因为你终于决定，要为那份热烈的爱和真实的自己活一次。",
    whisper: "忠于自己永远是最难的决定，但迈出那一步后，天空会无比广阔。",
    quote: {
      original: "I wanna be with someone who, ten years from now, makes my heart jump when I hear her key in the door. The someone is you.",
      translation: "我想和一个人在一起，十年后，听到她钥匙开门的声音，我依然会心跳加速。而那个人，就是你。",
    },
    coords: { burn: 0.8, boundary: 0.5, give: 0.6, speak: 0.5 }
  },
  {
    id: "leyla",
    name: "Leyla",
    work: "《同心难改》",
    tags: ["内敛细腻", "细水长流", "逐渐勇敢"],
    description: "你内敛、细腻，习惯把所有的感情藏在暗处，藏在每一个小心翼翼的细节里。你的爱不是那种轰轰烈烈的燃烧，而是缓慢渗透的，等对方察觉时，已经无处不在。你有着温柔的边界，比起主动索取，你更愿意在安静中等待和被引导。在那份细水长流的爱意中，你不仅找到了依靠，更找到了真正勇敢的自己。",
    whisper: "不需要轰轰烈烈，你的温柔本就有着穿透岁月的力量。",
    coords: { burn: 0.4, boundary: 0.6, give: -0.5, speak: -0.6 }
  },
  {
    id: "kim",
    name: "Kim",
    work: "《Yes or No》",
    tags: ["直接果敢", "无畏真诚", "坚定等待"],
    description: "你直接、果敢，十分清楚自己喜欢谁，也坚定向往真实的自我。你没什么复杂的心理防线，爱起来不绕弯子，也不玩心机，觉得喜欢就应该用行动让对方知道。在这段关系中，你不仅是热烈的追求者，更是持续付出的那一方。你最大的温柔，就是以最无畏的姿态，耐心等待对方准备好走向你。",
    whisper: "用最无畏的姿态去爱，你本身就是一道坚定的光。",
    coords: { burn: 0.8, boundary: -0.4, give: 0.8, speak: 0.4 }
  },
  {
    id: "yimin",
    name: "怡敏",
    work: "《第一次遇见花香的那刻》",
    tags: ["重重羁绊", "压抑自我", "冰封渴望"],
    description: "你被社会身份和责任剥夺了太多的自我，甚至快要忘记自己其实还有选择的权利。面对感情，你有着极高的防御和深深的愧疚感，既不敢燃烧，也不敢轻易去索取和诉说。你并非真的冷场，只是在满身羁绊中苦苦支撑。当你终于允许自己去面对那份爱时，那深锁在冰封之下的，是积压了无数个日夜的心碎与渴望。",
    whisper: "所有的坚强不过是在苦撑，请允许自己偶尔自私一次去拥抱光芒。",
    quote: {
      original: "其实每一次，我都非常、非常珍惜和你在一起的时光，因为我觉得每一次都好像是最后一次。",
    },
    coords: { burn: -1.0, boundary: 0.9, give: -0.8, speak: -1.0 }
  },
  {
    id: "tingting",
    name: "亭亭",
    work: "《第一次遇见花香的那刻》",
    tags: ["直球温柔", "无私守候", "坚定底气"],
    description: "你的内心始终有一团温热的火，无论被拒绝多少次，都没有因此变得冷漠。你对爱人的防备极低，几乎是全盘托出式的付出与包容。你的守候不是执念，而是一种温柔的、不打扰的、始终在场的底气。哪怕没有得到热烈的回应，你依然愿意用行动诉说你的存在。因为你相信，那个值得你等的人，终会明白。",
    whisper: "你的不打扰是最大的温柔，但别忘了，你也需要被同样热烈地爱着。",
    quote: {
      original: "有时候都在想，如果我第一个喜欢的人不是你，我可能会更有信心。",
    },
    coords: { burn: 0.7, boundary: -0.6, give: 0.9, speak: 0.2 }
  },
  {
    id: "yihuan",
    name: "意欢",
    work: "《自梳》",
    tags: ["隐忍坚韧", "被动承接", "一往无前"],
    description: "在厚重的高墙与防备下，你用沉默来对抗命运的不公。你本以为自己早已心如枯井，直到那份极致的纯粹彻底打动了你。你的爱是极度隐忍的，把所有的感情都藏在心底，甚至习惯了被动去承接。但那份无声的隐忍里，却有着钢铁般的意志——一旦从退缩中觉醒并认定了对方，便是一生不回头的坚贞。",
    whisper: "哪怕满身防备，一旦敞开心扉，你的爱比任何人都要深沉隽永。",
    coords: { burn: -0.7, boundary: 0.8, give: -0.4, speak: -0.8 }
  },
  {
    id: "yuhuan",
    name: "玉环",
    work: "《自梳》",
    tags: ["世故温情", "沧桑底色", "倾尽所有"],
    description: "你阅尽千帆，深知世间的薄情，但你对爱的信念从未被磨损。哪怕带着成年人该有的分寸与沧桑，一旦遇到值得的人，你依然愿意褪下防备，倾尽所有去成全与救赎。你那炽热而隐忍的深情，不求回报、不问结果，全都融化在漫长岁月的守护和不计代价的行动里，这是你最震撼人心的温柔。",
    whisper: "看懂了世事，却依然愿意给出所有的温柔，这是你最震撼人心的美丽。",
    quote: {
      original: "没有你，我是不会走的。如果一定要走，我会让你走。",
    },
    coords: { burn: 0.8, boundary: 0, give: 1.0, speak: 0.1 }
  },
  {
    id: "wil",
    name: "薇儿 (Wil)",
    work: "《面子》",
    tags: ["身份撕裂", "内在挣扎", "逐渐坚定"],
    description: "你夹在自我与传统的期待之间，哪边都想兼顾，却常常感到撕裂。你爱真实的自己，但也背负着沉重的压力，因此筑起了一道心墙。你在关系里往往表现得捉襟见肘，难以果断燃烧，更把无数想说的话咽进肚子里。你不是懦弱，你只是在学一件极难的事：如何在不伤害他人的情况下，也不背叛自己的心。",
    whisper: "你不必在两个世界中做选择，因为完整的你，本就是最珍贵的存在。",
    coords: { burn: -0.4, boundary: 0.6, give: 0.1, speak: -0.6 }
  },
  {
    id: "vivian",
    name: "Vivian",
    work: "《面子》",
    tags: ["独立从容", "内心笃定", "温和包容"],
    description: "你坦然、自在，内心笃定而清晰，不需要任何人的许可来做自己。你在感情中有边界，但并不拒人于千里之外。你愿意主动表达爱意，也愿意包容和给出足够的空间。你等待那个人，不是因为没有选择，而是看到了对方值得被等待的灵魂。你的爱从容而不强迫——你知道，时间本身颠倒，本身就是你能给出的最好礼物。",
    whisper: "你的从容是强大的底气，而时间会证明，等待也是一种美好的爱意。",
    quote: {
      original: "Kiss me. Right here. In front of all these people.",
      translation: "吻我，就在这里，在所有人面前。",
    },
    coords: { burn: 0.3, boundary: 0.5, give: 0.7, speak: 0.7 }
  },
  {
    id: "anne",
    name: "Anne Lister",
    work: "历史真实人物",
    tags: ["开拓先锋", "务实强悍", "绝对主导"],
    description: "你拥有极度强悍的内心和清晰的目标感，活得像一团永不熄灭的炽烈火焰。在关系中，你是绝对的主导者，带着不容置疑的热情和一点理直气壮的占有欲；你设下的精神边界让人难以侵犯。你极其善于表达与行动，从不怀疑自己的渴望，拒绝被任何世俗的标签所定义。你知道自己要什么，然后，你就会去拿到它。",
    whisper: "在这个世界上，你不必被任何人定义，去拿属于你的一切吧。",
    coords: { burn: 0.85, boundary: 0.7, give: 0.6, speak: 0.8 }
  }
];
