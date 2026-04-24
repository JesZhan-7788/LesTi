import { Question } from "../types";

// Helper for agree/disagree scale mapping to a specific dimension
const createAgreeOptions = (dimension: "burn" | "boundary" | "give" | "speak", invert = false) => [
  { text: "非常同意", effects: { [dimension]: invert ? -2 : 2 } },
  { text: "同意", effects: { [dimension]: invert ? -1 : 1 } },
  { text: "不同意", effects: { [dimension]: invert ? 1 : -1 } },
  { text: "非常不同意", effects: { [dimension]: invert ? 2 : -2 } },
];

export const questions: Question[] = [
  {
    id: "q1",
    text: "你在某个地方认识了一个让你心动的女生。你第一件事是？",
    options: [
      { text: "默默翻她所有能找到的社交媒体，一条一条地看", effects: { give: -1, speak: -1 } },
      { text: "截图发给闺蜜，一起分析她是不是同类", effects: { speak: 1, boundary: 1 } },
      { text: "直接找借口给她发消息，没跟任何人说", effects: { give: 1, speak: 1 } },
      { text: "什么都不做，先观察，等她给信号", effects: { give: -1, speak: -1 } },
    ]
  },
  {
    id: "q2",
    text: "发现她关注了某个拉拉博主。你——",
    options: [
      { text: "截图发给闺蜜：“我觉得有戏”", effects: { speak: 1 } },
      { text: "直接发给她：“哎你也关注这个？”", effects: { speak: 1, give: 1 } },
      { text: "默默记在心里，但什么都没说", effects: { speak: -1 } },
      { text: "默默把那个博主也关注了", effects: { speak: -1, boundary: -1 } }
    ]
  },
  {
    id: "q3",
    text: "比起直接说“我喜欢你”，我更习惯用行动让她感受到。",
    options: createAgreeOptions("speak", true) // Different: Agree means silent (-1)
  },
  {
    id: "q4",
    text: "网上聊了很久，终于约好第一次线下见面。见面前你——",
    options: [
      { text: "紧张到不知道穿什么，换了好几套", effects: { burn: 1 } },
      { text: "提前研究了她提过的一家店，想带她去", effects: { burn: 1, give: 1 } },
      { text: "一边让闺蜜帮你支招，一边提醒自己别想太多", effects: { burn: -1 } },
      { text: "跟平时一样，但认真挑了一款香水", effects: { burn: -1 } }
    ]
  },
  {
    id: "q5",
    text: "我宁愿爱得用力过猛，也不愿意因为害怕受伤而保留自己。",
    options: createAgreeOptions("burn")
  },
  {
    id: "q6",
    text: "第一次在她家过夜。早上你先醒了，她还在睡。房间很安静，光从窗帘缝里透进来。",
    options: [
      { text: "你看着她，想把这个画面记住", effects: { burn: 1, boundary: -1 } },
      { text: "你靠近了一点，希望她醒来继续昨晚的温存", effects: { burn: 1, boundary: -1 } },
      { text: "你心里很安稳，觉得你们之间近了一大步", effects: { burn: -1, boundary: -1 } },
      { text: "你瞥了一眼手机，脑子里已经开始转今天的安排", effects: { burn: -1, boundary: 1 } }
    ]
  },
  {
    id: "q7",
    text: "喜欢上一个人之后，身边的人通常最后才知道。",
    options: createAgreeOptions("speak", true)
  },
  {
    id: "q8",
    text: "在感情里，你更享受的是——",
    options: [
      { text: "爱人——付出的时候我更有安全感", effects: { give: 1 } },
      { text: "被爱——被她选择、被她珍惜的感觉让我踏实", effects: { give: -1 } },
      { text: "说不清，状态好的时候喜欢付出，脆弱的时候需要被接住", effects: { give: 0 } },
      { text: "我没想过这个问题，感情里我不太计较这些", effects: { boundary: 1 } }
    ]
  },
  {
    id: "q9",
    text: "在一起之后，你发现自己悄悄变了一些。最像你的是哪个？",
    options: [
      { text: "开始不自觉地用她的口头禅，连朋友都发现了", effects: { boundary: -1 } },
      { text: "发现自己有些话还是只写在日记里，没有跟她说", effects: { boundary: 1 } },
      { text: "有时候不知道某个想法是自己的，还是被她影响的", effects: { boundary: -1 } },
      { text: "还是那个自己，只是多了一个人知道真实的你", effects: { boundary: 1 } }
    ]
  },
  {
    id: "q10",
    text: "喜欢上一个人之后，我很难同时对别人产生感情。",
    options: createAgreeOptions("burn")
  },
  {
    id: "q11",
    text: "在感情里，我更害怕的是“给得不够”，而不是“要得太多”。",
    options: createAgreeOptions("give")
  },
  {
    id: "q12",
    text: "在一起一段时间了，她提出想跟你同居。你的第一反应是——",
    options: [
      { text: "心跳加速，脑子里已经开始想把哪些东西搬过去", effects: { boundary: -1 } },
      { text: "很想答应，但脑子里开始转现实问题：房子怎么租、怎么说", effects: { boundary: 1 } },
      { text: "很心动，但也有点犹豫，喜欢她但也喜欢一个人待着", effects: { boundary: 1 } },
      { text: "第一个念头是：如果我们吵架了，我还有自己的地方吗", effects: { boundary: 1 } }
    ]
  },
  {
    id: "q13",
    text: "我可以喜欢一个人很久，不需要结果。",
    options: createAgreeOptions("burn")
  },
  {
    id: "q14",
    text: "在一起之后，她开始慢慢认识你的朋友圈。你发现自己——",
    options: [
      { text: "很自然地把她介绍给每一个人，希望她融入", effects: { boundary: -1 } },
      { text: "介绍了几个最亲近的朋友，其他的还没想好", effects: { boundary: 1 } },
      { text: "有些朋友你还没想好怎么解释你们关系，先放着", effects: { boundary: 1 } },
      { text: "朋友是朋友，她是她，你不太习惯把两个世界混在一起", effects: { boundary: 1 } }
    ]
  },
  {
    id: "q15",
    text: "她最近压力很大，但每次你问她都说“没事”。你——",
    options: [
      { text: "不再问了，但默默帮她把家务都做了", effects: { give: 1, speak: -1 } },
      { text: "继续问，你觉得说出来会好受一些", effects: { give: 1, speak: 1 } },
      { text: "给她留着空间，等她准备好了自然会说", effects: { give: -1, boundary: 1 } },
      { text: "想办法约她出去散心，转移一下注意力", effects: { give: 1, speak: -1 } }
    ]
  },
  {
    id: "q16",
    text: "她跟你说她最近跟一个新朋友走得很近，两个人聊得很来。你——",
    options: [
      { text: "心里有点不舒服，但告诉自己这很正常", effects: { boundary: 1, speak: -1 } },
      { text: "没什么特别的感觉，她有自己的朋友是好事", effects: { boundary: 1 } },
      { text: "笑着说：“听起来挺合得来的，改天介绍给我认识”", effects: { boundary: -1, speak: 1 } },
      { text: "开始留意她跟那个人的互动，但没有说出口", effects: { boundary: -1, speak: -1 } }
    ]
  },
  {
    id: "q17",
    text: "吵架了。你当时最想做的是——",
    options: [
      { text: "把话说清楚，哪怕要吵很久", effects: { speak: 1 } },
      { text: "发一条长消息，把想说的都整理好再发给她", effects: { speak: 1 } },
      { text: "先去照顾她的情绪，等她好受一点再说别的", effects: { speak: -1, give: 1 } },
      { text: "什么都没说，但睡前还是给她发了晚安", effects: { speak: -1, give: 1 } }
    ]
  },
  {
    id: "q18",
    text: "过年回家，亲戚问你：“你什么时候找男朋友啊？”你——",
    options: [
      { text: "笑着说“随缘吧”，然后把话题转走", effects: { speak: -1 } },
      { text: "说“我现在不想谈恋爱”，简短但清楚", effects: { speak: 1 } },
      { text: "假装没听见，低头夹了一筷子菜", effects: { speak: -1 } },
      { text: "心里翻了个白眼，嘴上还是应付了两句", effects: { speak: -1 } }
    ]
  },
  {
    id: "q19",
    text: "你妈说给你安排了一个相亲，问你这周末有没有空。你——",
    options: [
      { text: "直接说不去，跟她说你现在不想谈这些", effects: { speak: 1 } },
      { text: "敷衍过去，说最近很忙，下次吧", effects: { speak: -1 } },
      { text: "答应了，反正去一次也无所谓", effects: { speak: -1, boundary: 1 } },
      { text: "没有正面回答，但私下开始认真想形婚的可能性", effects: { speak: -1, boundary: 1 } }
    ]
  },
  {
    id: "q20",
    text: "最近对你若即若离，有时候秒回，有时候消失半天。你——",
    options: [
      { text: "直接问她：“你最近怎么了，是不是有什么事”", effects: { give: 1, speak: 1 } },
      { text: "主动找话题，多发消息，试图把她拉回来", effects: { give: 1, boundary: -1 } },
      { text: "等她，告诉自己她可能只是最近比较忙", effects: { give: -1, speak: -1 } },
      { text: "减少主动，看她什么时候会先联系你", effects: { give: -1, boundary: 1 } }
    ]
  },
  {
    id: "q21",
    text: "她跟你说起自己之前谈过一段很长的感情。你——",
    options: [
      { text: "认真听，但心里开始悄悄拿自己跟她前任比", effects: { boundary: -1 } },
      { text: "想多了解她，问她那段感情里她学到了什么", effects: { boundary: 1, give: 1 } },
      { text: "听着，但没有追问，那是她的事", effects: { boundary: 1 } },
      { text: "有点吃醋，但忍住了没说", effects: { boundary: -1, speak: -1 } }
    ]
  },
  {
    id: "q22",
    text: "你们异地了。她突然说想来你的城市找工作。你的第一反应是——",
    options: [
      { text: "当天晚上就开始帮她搜岗位", effects: { burn: 1, give: 1 } },
      { text: "开心，但默默担心这会影响她的发展", effects: { burn: -1, boundary: 1 } },
      { text: "开口第一句是：“你想好了吗，别一时冲动”", effects: { burn: -1, speak: 1 } },
      { text: "没说太多，但脑子里已经开始想房间怎么重新布置", effects: { burn: 1, boundary: -1 } }
    ]
  },
  {
    id: "q23",
    text: "你跟对象吵架冲出门。遇到暗恋你的人骑着机车找你，递来头盔，你会上吗？",
    options: [
      { text: "坐上去了，管他呢", effects: { burn: 1, boundary: -1 } },
      { text: "兜了一圈，让她在离家不远的地方停下来", effects: { burn: -1, boundary: 1 } },
      { text: "犹豫了很久，最后还是没上去", effects: { burn: -1, boundary: 1 } },
      { text: "对她说了声谢谢，然后自己走了", effects: { burn: -1, boundary: 1 } }
    ]
  },
  {
    id: "q24",
    text: "你们吵架她冲出门。你下楼看见她坐上了一个追求者的机车。你——",
    options: [
      { text: "追上去拦住她", effects: { burn: 1, boundary: -1 } },
      { text: "接连打电话发消息", effects: { burn: 1, speak: 1 } },
      { text: "站在原地看她消失，最后还是回到楼上", effects: { burn: -1, speak: -1 } },
      { text: "越想越气，直接联系师傅换锁", effects: { burn: 1, boundary: 1 } }
    ]
  },
  {
    id: "q25",
    text: "你们分手了。你开始整理她留在你这里的东西。你——",
    options: [
      { text: "装进袋子，约好时间还给她，顺手把房间重新布置", effects: { boundary: 1 } },
      { text: "整理得很快，但最后留下了一件她送的东西", effects: { boundary: -1 } },
      { text: "整理到一半停下来，坐在地上发了很久的呆", effects: { boundary: -1 } },
      { text: "把东西都装好了，但一直没有约时间还她", effects: { boundary: -1, speak: -1 } }
    ]
  },
  // Key Questions for tie-breaking the identical coordinates segment (Tina, Yimin, Wil)
  {
    id: "kq_tina",
    isKeyQuestion: true,
    keyTarget: "tina",
    text: "在感情里，我最害怕的是有一天她发现她不需要我了。",
    options: createAgreeOptions("boundary", true)
  },
  {
    id: "kq_pie",
    isKeyQuestion: true,
    keyTarget: "pie",
    text: "我喜欢她，但我偶尔不确定这算不算爱情（或曾有过这种疑惑）。",
    options: createAgreeOptions("burn", true)
  },
  {
    id: "kq_yimin",
    isKeyQuestion: true,
    keyTarget: "yimin",
    text: "比起义无反顾地奔向她，我更容易先想到现实的限制。",
    options: createAgreeOptions("burn", true)
  },
  {
    id: "kq_wil",
    isKeyQuestion: true,
    keyTarget: "wil",
    text: "一旦我想清楚了，外界的声音就很难再动摇我。",
    options: createAgreeOptions("boundary") // Wil has strong internal boundaries once decided
  }
];
