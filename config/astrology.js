/**************星座和星体的颜色*************/
let astrolabeBaseColor = ['#FD6220', '#FCCA65', '#31AE9D', '#239FCC'];
// let astrolabeBaseColor = ['rgb(253,98,32)', 'rgb(252,202,101)', 'rgb(49,174,157)', 'rgb(35,159,204)'];
export function setAstrolabeColor(baseColor = astrolabeBaseColor){//设置星体、宫位、星座颜色(基准是基色baseColor)
	let signColorList = [];
	let palaceColorList = [];
  for(var i = 0; i < 12; i++){
    signColorList[i] = baseColor[i % 4];
    palaceColorList[i] = baseColor[i % 4];
  }
  var colorLittle = '#EC58E7';//小行星配色——粉色
  var colorNorth = '#57A8B0';//北交点配色——淡蓝色
  let planetColorList = [
    signColorList[0], signColorList[3], signColorList[2], signColorList[1],
    signColorList[0], signColorList[0], signColorList[1], signColorList[2],
    signColorList[3], signColorList[3], signColorList[0], signColorList[1],
    colorLittle, colorLittle, colorLittle, colorLittle, colorLittle, colorNorth];
  return {signColorList,palaceColorList,planetColorList};
}

//根据时间 计算 星座  时间格式 2018-2-2 
export function getSignInfo(time){
		let signInfo={};
		let month = time.split('-')[1],
				date = time.split('-')[2];
				if(month==1&date>=20||month == 2 && date <=18){
						signInfo.name="水瓶座";
						signInfo.index='10';    //0开始编号
						signInfo.date="01.20-02.18";
					}
				if(month==2&date>=19||month == 3 && date <=20){
						signInfo.name="双鱼座";
						signInfo.index='11';    
						signInfo.date="02.19-03.20";
						
					}
				if(month==3&date>=21||month == 4 && date <=19){
						signInfo.name="白羊座";
						signInfo.index='0';    
						signInfo.date="03.21-04.19";
						
					}
				if(month==4&date>=20||month == 5 && date <=20){
						signInfo.name="金牛座";
						signInfo.index='1';    
						signInfo.date="04.20-05.20";
						
					}
				if(month==5&date>=21||month == 6 && date <=21){
						signInfo.name="双子座";
						signInfo.index='2';   
						signInfo.date="05.21-06.21";
						
					}
				if(month==6&date>=22||month == 7 && date <=22){
						signInfo.name="巨蟹座";
						signInfo.index='3';   
						signInfo.date="06.22-07.22";
						
					}
				if(month==7&date>=23||month == 8 && date <=22){
						signInfo.name="狮子座";
						signInfo.index='4';    
						signInfo.date="07.23-08.22";
						
					}
				if(month==8&date>=23||month == 9 && date <=22){
						signInfo.name="处女座";
						signInfo.index='5';    
						signInfo.date="08.23-09.22";
						
					}
				if(month==9&date>=23||month == 10 && date <=22){
						signInfo.name="天秤座";
						signInfo.index='6';    
						signInfo.date="09.23-10.23";
						
					}
				if(month==10&date>=23||month == 11 && date <=21){
						signInfo.name="天蝎座";
						signInfo.index='7';  
						signInfo.date="10.24-11.22";
						
					}
				if(month==11&date>=22||month == 12 && date <=21){
						signInfo.name="射手座";
						signInfo.index='8';  
						signInfo.date="11.23-12.21";
						
					}
				if(month==12&date>=22||month == 1 && date <=19){
						signInfo.name="摩羯座";
						signInfo.index='9';    
						signInfo.date="12,22-1.19";
						
					}
				return signInfo;
}
/**************星座和星体的名字*************/
export const phaseOrder = ['合', '刑', '拱', '冲', '六', '十二', '八', '五', '補八', '補五', '梅']
export const signNames = [
	['羊','牛','子','蟹','獅','女','秤','蠍','射','羯','瓶','魚'],
	['白羊','金牛','雙子','巨蟹','獅子','處女','天秤','天蠍','射手','摩羯','水瓶','雙魚'] ,
	['白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座'],
	];
	export const signIndex = {
	"白羊座":{index:1},"金牛座":{index:2},"雙子座":{index:3},"巨蟹座":{index:4},"獅子座":{index:5}, "處女座":{index:6},"天秤座":{index:7},"天蠍座":{index:8},"射手座":{index:9},"摩羯座":{index:10 },"水瓶座":{index:11},"雙魚座":{index:12},
	}
	export const signColor = {
	"白羊座":{color:"#da538b"},"金牛座":{color:"#9e00dd"},"雙子座":{color:"#ce4741"},"巨蟹座":{color:"#008800" },"獅子座":{color:"#00ae93"},"處女座":{color:"#689b00"},"天秤座":{color:"#cea300"},"天蠍座":{color:" #0093bb"},"射手座":{color:"#7e39ba"},"摩羯座":{color:"#0194ca"},"水瓶座":{color:"#d85a10"},"雙魚座": {color:"#008800"},
	}
	export const newSignColor = [
	"#da538b", "#9e00dd", "#ce4741", "#008800", "#00ae93", "#689b00", "#cea300", "#0093bb", "#7e39ba", "#0194ca", "#d85a10", "#008800"
	]
	export const planetList = ['太陽','月亮','水星','金星','火星','木星','土星','天王','海王','冥王','上升','天頂','凱龍','穀神','智神','婚神','灶神','北交']
	export const planetNames = [
	['日', '月', '水', '金', '火', '木', '土', '天', '海', '冥', '升', '頂', '凱', '谷', '智', '婚', '灶', '北', '南', '莉', '福', '宿', '東', '降', '底' ],
	['太陽','月亮','水星','金星','火星','木星','土星','天王','海王','冥王','上升','天頂', '凱龍','穀神','智神','婚神','灶神','北交', '南交', '莉莉斯', '福點', '宿命', '東方', '下降', '天底'],
];
//根据星座下标 获取星座介绍信息  add 2018-3-22 星座介绍页面需求新增 星座排序0开始 
export const signIntro = {
	"0":{
		name:'白羊座',
		mode:'开创',
		element:'火',
		side:'阳',
		date: '03.21-04.19',
		bgColor:'#ff77ad',
		title:'热血真实的孩子王',
		intro:'热血是白羊座代名词，个性坦率，说话办事都很直接。怕麻烦，不喜欢拖沓；其次就是固执，不到黄河心不死。但不管怎样，白羊座都保有那颗赤子之心，活得真实，没有心机。对朋友真诚又仗义，是当之无愧的孩子王。',
		good:'白羊座大方明朗，全身充满活力。做事不拘小节，和任何人都能很快打成一片；仗义，对朋友两肋插刀也无所谓。喜欢帮助弱者，具有亲切又勇敢的领导能力。拥有野心又敢冒险，还有目标确定就全力以赴的坚毅',
		bad:'以自我为中心的率性而为，经常我行我素，没心没肺的肆意妄为，说话耿直到让人下不了台。吵架绝对要赢，打架一定不认输，绝对不吃亏。性急爱犯傻，同一个坑里跌倒也不长记性，不喜欢规则到会屡屡犯规。',
		match:'4',
		friend:'2'
	},
	"1":{
		name: '金牛座',
		mode:'固定',
		element:'土',
		side:'阴',
		date: '04.20-05.20',
		bgColor:'#be01fb',
		title:'沉稳爱金的守旧派',
		intro:'金牛座不善言辞，不会表现自己，也不愿意做出头鸟。平时温顺温和，但也会有牛脾气，生气起来破坏力十足。爱财是金牛座最突出特点，但不是抠门，他们也舍得为自己花钱。只是相比奢侈品，他们更喜欢实在的东西。',
		good:'好学、知识丰富，更重要的是懂得发挥优秀的头脑。个性温和顺从，又肯勤奋、踏踏实实地努力获得更好的生活，拒绝不劳而获。理性思维，稳重做事，将生活打理得有序而充实。',
		bad:'顽固的死硬派，爱钻牛角尖，错了也死不承认。生气起来要么冷战，要么就世界大战。贪吃又爱钱，对物质有极强的欲望，甚至抠门到一毛不拔。在乎的东西，会有强烈的嫉妒心与占有欲，到手决不放弃。',
		match:'9',
		friend:'3'
	},
	"2":{
		name: '双子座',
		mode:'变动',
		element:'风',
		side:'阳',
		date: '05.21-06.21',
		bgColor:'#ea6256',
		title:'善变爱唠的鬼精灵',
		intro:'反应灵敏、口才一流，双子座天生就是鬼精灵，能胡编瞎凑而不留一点痕迹。好玩好动好奇，再加上不专一，被人误以为花心，其实白羊座只是贪新鲜。内心阳光是真的，毒舌也是真的，不在乎对方想法，开心最重要。',
		good:'好奇心很强的智慧星，八面玲珑，善于交际，又懂得随机应变，可见其足智多谋。多才多艺，再加上灵活的头脑、优异的口才能力，人缘相当不错。风趣幽默的个性，良好的适应力，在哪都能成为焦点。',
		bad:'精神分裂症患者，善变到24小时360°，随时转变心情状态。活在自己世界中，只要自己开心就好。喋喋不休说闲话，只要打开话匣就停不下来。做事三分钟热度，消极放弃多于坚持到底。',
		match:'10',
		friend:'0'
	},
	"3":{
		name: '巨蟹座',
		mode:'开创',
		element:'水',
		side:'阴',
		date: '06.22-07.22',
		bgColor:'#01a300',
		title:'温柔念旧的宅星人',
		intro:'巨蟹座将母性发挥到极致，对他们来说，家庭是最重要。执拗的巨蟹座，对朋友、对家人非常忠实，也愿意给予他们无微不至的关心。个性想蟹子，外壳坚硬，其实内心柔软无比，敏感到脆弱，没有安全感到多疑。',
		good:'想象力丰富，还有很强的理解力与领悟力。有一种母性的防卫能力，以及不挑剔朋友的顺应性，强大的包容力与适应力。忠于爱情，重视家的温暖与安定，是最有家庭观念的人。',
		bad:'天性多疑又情绪化，让人难以取悦；嫉妒心强，又多度敏感，而常常自艾自怜。对感情控制欲强，没有安全观感，拿不起、放不下、忘不掉。有时候很作，爱装还八卦，喜欢被哄，却不懂得去争取。',
		match:'7',
		friend:'1'
	},
	"4":{
		name: '狮子座',
		mode:'固定',
		element:'火',
		side:'阳',
		date: '07.23-08.22',
		bgColor:'#00cfb4',
		title:'骄傲霸气的大哥大',
		intro:'狮子座的人热情、骄傲，把生活的每个角落都当成自己表演的舞台。自尊心强，天生就有成为人生人、王中王的野心。成为万众焦点使他们快乐，但也常常会因为过于在乎别人对自己的看法，而使自己陷入死胡同。',
		good:'个性明朗干脆，还有火焰般的热情。天生的领导者，组织力强，还有激励人心的气质。为人博爱又热心，慷慨又大方，能吸引到众多追随者。强大的野心，从不认输也不低头，就算受伤表面也云淡风轻。',
		bad:'不管是生活还是爱情，都想成为胜利者。有高人一等的优越感，不把任何人看在眼中，认为自己的想法、做法才是正确的，不接受反驳。死要面子，爱出风头、爱听好话；虚荣心强，能伸不能屈。',
		match:'8',
		friend:'6'
	},
	"5":{
		name: '处女座',
		mode:'变动',
		element:'土',
		side:'阴',
		date: '08.23-09.22',
		bgColor:'#95c72a',
		title:'完美洁癖的苦行僧',
		intro:'处女座追求完美，吹毛求疵是他们的特性。大多数处女座都很谦虚，拒绝臣服于权威，却又敬畏不可掌握的智者。高智商并不是与生就来，而是对自我、他人的苛刻形成的。自律到令人无法理解，生活得像苦行僧一样严谨。',
		good:'生来就有的艺术家气质，注重细节又手巧，善于整顿事物，用手将脑袋里的构思一一实现。重视秩序，对善恶、正邪有敏锐的批判力。脚踏实地地追求完美，洁癖观念不只是身体，更在意精神。',
		bad:'无可救药完美主义者，喜欢鸡蛋里挑骨头，要求太高到吹毛求疵。爱挑剔还毒舌，更重要是双标，实在很难有朋友。爱唠叨还爱小题大做，一件事说N遍，自己不做指挥别人却也得心应手。',
		match:'1',
		friend:'7'
	},
	"6":{
		name: '天秤座',
		mode:'开创',
		element:'风',
		side:'阳',
		date: '09.23-10.23',
		bgColor:'#facb01',
		title:'优雅平衡的纠结帝',
		intro:'性格温和，与人为善，不喜争执，天秤座能很自然地融入到环境中。喜欢追求平衡的感觉，乐于分享，却难免会将自己的想法加诸于他人。天生优雅，喜欢倾听也善于沟通，偏偏就是爱纠结，最后只能逃避了事。',
		good:'天生的优雅风采，懂得体贴别人，刻意追求美与正义，不喜欢争执。天秤座有正义感，逻辑强、善分析，在人群中起到很好的调和作用。均衡的人生观，因事制宜，能屈能伸，适应力超强。',
		bad:'天秤座时外貌协会钻石级会员，抗拒丑陋。处事经常优柔寡断，犹豫不决，是选择困难症晚期患者。害怕得罪人，也不懂得拒绝人，只会息事宁人，没有担当。在意平衡却没有坚定立场，容易受人影响而左右摇摆。',
		match:'11',
		friend:'4'
	},
	"7":{
		name: '天蝎座',
		mode:'固定',
		element:'水',
		side:'阴',
		date: '10.24-11.22',
		bgColor:'#00bfeb',
		title:'高冷腹黑的诡神探',
		intro:'天蝎座的世界充满了秘密，外人是很难探个究竟的。明明情商智商超高，却因不善于交际，少言寡语，被人评价过低。天蝎座低调但绝不好惹，记仇再加上洞若观火的观察、推理能力，一旦反击，力量足以让人胆寒。',
		good:'天蝎座看起来安静，其实有很棒的头脑，对任何事都有热心。敏锐的洞察力，无聊时就喜欢偷偷摸观察别人乐于追求真相。天生有魅力，对朋友又仗义，恩怨分明。对决定的事有执行力，能坚持到底。',
		bad:'忠实的“秘密主义”者，天蝎座喜欢隐蔽自己的内心，却爱窥探别人心声。太过感情用事，爱恨情绪太过强烈。对爱情，占有欲强，善妒还爱吃醋。个性腹黑到阴险，很强的报复心，得理不饶人。',
		match:'3',
		friend:'5'
	},
	"8":{
		name: '射手座',
		mode:'变动',
		element:'火',
		side:'阳',
		date: '11.23-12.21',
		bgColor:'#a75fe5',
		title:'乐观自由的小顽童',
		intro:'射手座天生幽默乐观，会很大方地哗众取宠，不介意扮丑博人一笑。可以说他们是小顽童，也可以说是开心果，浑身散发着正能量，总能带给人欢乐。贪玩是射手座天性，喜欢旅行，喜欢冒险，同时也喜欢赌博。',
		good:'射手座坚信：天生我材必有用，条条大路通罗马。乐观活泼，有很高的智慧，这样的射手座，有鼓舞他人、振奋士气的力量。正直坦率，经受得住打击，也有救世救人的热情，有自己的处世哲学。',
		bad:'常常粗心大意到丢三落四，没有耐性。爱好自由随性，却也不考虑他人感受，缺乏计划性与责任感。不懂人情世故，心直口快，容易得罪人。无远虑，过于理想化，不信邪不听劝，赌性坚强。',
		match:'4',
		friend:'10'
	},
	"9":{
		name: '摩羯座',
		mode:'开创',
		element:'土',
		side:'阴',
		date: '12.22-01.19',
		bgColor:'#00b3eb',
		title:'沉稳可靠的老干部',
		intro:'看似沉静，实则是隐藏攻击的利刃，这就是摩羯座。他们在乎自己的声誉，喜欢用传统的道德观来教育别人；对自己也有很高的标准，有坚持不懈的精神。不苟言笑，兢兢业业，摩羯座会是可靠的老干部，正统但也有点乏味。',
		good:'摩羯保守而谦逊，崇尚整洁以及秩序。而且摩羯有诚实的责任感以及强烈的耐力，确认目标后就不放弃的坚韧。有远大抱负，但也能脚踏实地办事。重视纪律，坚守原则，是最值得信赖的搭档。',
		bad:'典型的个人利己主义，不善于沟通，也不懂得随机应变，固执己见。会专注于个人目标，但因有点消极悲观，又将自己欲望狠狠压抑。缺乏对人群的关怀与热情，不会哄人，也没有浪漫细胞。',
		match:'1',
		friend:'11'
	},
	"10":{
		name: '水瓶座',
		mode:'固定',
		element:'风',
		side:'阳',
		date: '01.20-02.18',
		bgColor:'#fa7c3f',
		title:'奇葩前卫的傲娇瓶',
		intro:'水瓶座的个人主义很重，追求属于自己的独一无二。想要活出最真的自己，不愿意过得平庸，却是很傲娇。水瓶座很睿智，很知性，同时也有点内向，不轻易向人敞开心扉；是很容易走进，但也不容易走进星座。',
		good:'兴趣广、创意足，优异的推理能力与理性的智慧，组成了水瓶敏锐的眼光、流畅的辩驳能力，是有向未知以及黑暗奋战的人。水瓶座独立，有个人风格，也充满了人道精神，乐于助人与交友。',
		bad:'水瓶座过于强调生活的自主权，太相信自己的判断，是“让往东偏往西”的那类人。喜欢打破砂锅问到底，也喜欢多管闲事。思想多变，却都过于理想化；太过理智也就显得情趣不足。交友广却停留在泛泛，很难推心置腹。',
		match:'2',
		friend:'8'
	},
	"11":{
		name: '双鱼座',
		mode:'变动',
		element:'水',
		side:'阴',
		date: '02.19-03.20',
		bgColor:'#09a82a',
		title:'浪漫善良的多情鱼',
		intro:'多重矛盾的双鱼座，神经质、健忘、多愁善感、想象力丰富等，都是他们的一部分。双鱼座爱做梦，虽然大多数都是不切实际的梦想，很美却遥不可及。但至少那颗善良的心是真实的，为了别人愿意牺牲自己。',
		good:'强大同理心作用下，双鱼座对于人性有敏锐的观察力。对人和善又肯舍己为人，会耐心听人倾诉，是让人感觉舒心的存在。想象力丰富，但对于现状也能全然接受，包容其他人的本来面目。',
		bad:'缺乏理想，太过感情，结果也就造成了双鱼座的情绪化，意志不坚定，感情用事。太过浪漫，幻想太多，缺乏面对现实的勇气，容易陷入沮丧而不可自拔。在矛盾犹豫中，没有足够的危机意识，而被人利用。',
		match:'6',
		friend:'9'
	},
}
//十二星座年度字  2018.3.27 zjk 新增  暂定
export const signYearWord =["狠","新","变","晴","精","敢","善","顺","换","猛","减","升"]

/**************星盘含义*****************/
export const palaceMeans = ['命宫','财富宫','兄弟宫','家庭宫','恋爱宫','工作宫','婚姻宫','疾厄宫','迁移宫','事业宫','交际宫','玄秘宫',];

/**************星座和星体的iconfont*************/
let planetIcons1 = [
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
]
let signIcons1 = [
	['', '', '', '', '', '', '', '', '', '', '', ''],
]
//2017-1-3 10:19:55更新 末尾新增 宫主星，命主星
let planetIcons2 = [
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','']
]
//2017-12-15 18:09:55更新
let signIcons2 = [
	['', '', '', '', '', '', '', '', '', '', '', '']
]
let newSignIcons = ['','','','','','','','','','','',''];
export const planetIcons = planetIcons2;
export const signIcons = signIcons2;
export const newSignIcon = newSignIcons;

/***************星盘相关文案****************/
//星盘解读[planetIndex]-目前支持日、月、水、金、火、升
export const planetMeanSum = [
	{
		name: '太阳',
		title: '本我体现，原始的你',
		body: '太阳星座描述的是你真正的想法，在各样的决策前，最后拍板定案的自我。',
	},
	{
		name: '月亮',
		title: '内心世界，内在的你',
		body: '月亮星座描绘出内心的情感，金星星座是爱好、是审美。共同演绎出丰富的情绪和美好的感受。',
	},
	{
		name: '水星',
		title: '智力与精神，思想起源',
		body: '水星星座代表的是一切形式的沟通和交流，至少代表非感性的言语沟通。水星的多面性，让我们能从不同的面相，去检视和思考自己的精神和心理状态。',
	},
	{
		name: '金星',
		title: '审美与喜好，美好的标尺',
		body: '月亮星座描绘出内心的情感，金星星座是爱好、是审美。共同演绎出丰富的情绪和美好的感受。',
	},
	{
		name: '火星',
		title: '能量中心，动力源泉',
		body: '火星星座代表的是行动和勇气，同时也象征着一切形式的竞争。火星能量在各个层面上帮助我们生存下去。',
	},
	{},
	{},
	{},
	{},
	{},
	{
		name: '上升',
		// title: '生活方式、别人对你的印象',
		title: '社会印象，现实的你',
		body: '上升星座描述你的生活方式，你给别人留下的印象，以及你在人际交往中所佩戴的面具。是大部分人对你的表面印象，像是你穿着什么样的演出服，扮演什么角色。',
	},
	{},
]

/***************星座标签文案*****************/
//星座标签[planetIndex][signIndex]——目前仅支持日月水金火升
export const signTags = [
	['活力四射','沉稳踏实','灵活多变','温暖顾家','自信自强','谨慎保守',
		'优雅和谐','神秘冷静','乐观开朗','成熟稳重','创新时尚','感性多情'],
	['善恶分明','喜欢享受','八面玲珑','敏锐感性','高贵重情','智慧稳重',
		'得体和善','情感浓烈','自由独立','朴实勤奋','博爱智慧','细腻浪漫'],
	['行动果决','深思熟虑','巧舌如簧','敏感多情','热情阳光','务实求真',
		'温和友好','精明能干','直接坦率','雄心壮志','开明真诚','敏锐直觉'],
	['积极主动','稳定忠实','多姿多彩','温柔体贴','火热直接','理性真实',
		'温柔多情','爱憎分明','明朗开放','保守内敛','理智独特','浪漫幻想'],
	['好胜奔放','务实内敛','灵敏机巧','付出奉献','光明磊落','按部就班',
		'与人为善','斗志昂扬','信念强烈','吃苦耐劳','特立独行','温顺牺牲'],
	[],
	[],
	[],
	[],
	[],
	['热情活跃','淡泊从容','多才多艺','母性关怀','大方领导','完美细腻',
		'公平客观','坚定自制','外放快活','坚毅勤奋','与众不同','善解人意'],
	[],
]