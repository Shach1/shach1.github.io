/* Данные теста. Тексты — из макета Figma, распределение типов — из файла «Типы студентов и вопросы». */
window.TEST_DATA = {
  total: 15,
  priority: ['explorer', 'creator', 'communicator', 'strategist', 'adventurer', 'chiller'],
  types: {
    explorer: {
      name: "Исследователь 🔎",
      desc: "Любознательный и наблюдательный. Любишь разбираться в теме, задавать вопросы и находить нестандартные решения.",
      superpower: "Глубоко погружаешься в тему и замечаешь то, что ускользает от других.",
      cardSuperpower: "Глубоко погружаюсь в тему и замечаю то, что ускользает от других.",
      image: 'assets/img/types/explorer.webp',
      imageCard: 'assets/img/types/explorer-card.webp',
      imgW: 262,
      imgH: 271,
      cardImgW: 214,
      cardImgH: 221
    },
    creator: {
      name: "Создатель 🎨",
      desc: "Творческий и креативный. Экспериментируешь, ценишь индивидуальность и превращаешь идеи в необычные решения.",
      superpower: "Видишь возможности там, где другие видят обычную задачу.",
      cardSuperpower: "Вижу возможности там, где другие видят обычную задачу.",
      image: 'assets/img/types/creator.webp',
      imageCard: 'assets/img/types/creator-card.webp',
      imgW: 262,
      imgH: 281,
      cardImgW: 214,
      cardImgH: 229
    },
    communicator: {
      name: "Коммуникатор 🎤",
      desc: "Открытый и социально активный. Легко знакомишься, умеешь договариваться и объединять людей.",
      superpower: "Создаёшь комфортную атмосферу и помогаешь команде стать частью целого.",
      cardSuperpower: "Создаю комфортную атмосферу и помогаю команде стать частью целого.",
      image: 'assets/img/types/communicator.webp',
      imageCard: 'assets/img/types/communicator-card.webp',
      imgW: 310,
      imgH: 249,
      cardImgW: 254,
      cardImgH: 205
    },
    strategist: {
      name: "Стратег 🧠",
      desc: "Организованный и последовательный. Планируешь подготовку, следишь за сроками и доводишь начатое до результата.",
      superpower: "Организуешь процесс и помогаешь идеям дойти до результата.",
      cardSuperpower: "Организую процесс и помогаю идеям дойти до результата.",
      image: 'assets/img/types/strategist.webp',
      imageCard: 'assets/img/types/strategist-card.webp',
      imgW: 262,
      imgH: 281,
      cardImgW: 214,
      cardImgH: 230
    },
    adventurer: {
      name: "Авантюрист 🚀",
      desc: "Энергичный и инициативный. Любишь новое, быстро адаптируешься и используешь неожиданные возможности.",
      superpower: "Не боишься перемен и умеешь превращать их в новые возможности.",
      cardSuperpower: "Не боюсь перемен и умею превращать их в новые возможности.",
      image: 'assets/img/types/adventurer.webp',
      imageCard: 'assets/img/types/adventurer-card.webp',
      imgW: 262,
      imgH: 271,
      cardImgW: 214,
      cardImgH: 221
    },
    chiller: {
      name: "На чиле 😎",
      desc: "Спокойный и невозмутимый. Ценишь баланс, не зацикливаешься на мелочах и не позволяешь учёбе занимать всю жизнь.",
      superpower: "Сохраняешь спокойствие в напряжённых ситуациях и умеешь вовремя выдохнуть.",
      cardSuperpower: "Сохраняю спокойствие в напряжённых ситуациях и умею вовремя выдохнуть.",
      image: 'assets/img/types/chiller.webp',
      imageCard: 'assets/img/types/chiller-card.webp',
      imgW: 306,
      imgH: 249,
      cardImgW: 252,
      cardImgH: 205
    }
  },
  questions: [
    {
      n: 1,
      title: "Представь: завтра тебе к первой паре. Начало в 8:45. Как выглядит твоё утро?",
      answers: [
      { letter: "A", text: "Заранее собираю всё необходимое и продумываю стильный образ.", image: 'assets/img/answers/q01a.webp', types: ["creator", "strategist"] },
      { letter: "B", text: "Спокойно изучаю расписание, проверяю, в какой аудитории пара, и без спешки собираюсь.", image: 'assets/img/answers/q01b.webp', types: ["explorer", "chiller"] },
      { letter: "C", text: "Пишу одногруппникам и предлагаю пойти вместе.", image: 'assets/img/answers/q01c.webp', types: ["communicator"] },
      { letter: "D", text: "Просыпаюсь почти перед выходом. Ничего страшного, по дороге разберусь, главное — успеть!", image: 'assets/img/answers/q01d.webp', types: ["adventurer"] }
      ]
    },
    {
      n: 2,
      title: "Преподаватель задаёт групповой проект. Какую роль ты займёшь?",
      answers: [
      { letter: "A", text: "Распределяю задачи и дедлайны, чтобы команда всё успела. Главное — без меня :D", image: 'assets/img/answers/q02a.webp', types: ["strategist", "chiller"] },
      { letter: "B", text: "Предлагаю необычную концепцию и сразу берусь за её реализацию, даже если это что-то новое.", image: 'assets/img/answers/q02b.webp', types: ["creator", "adventurer"] },
      { letter: "C", text: "Сначала изучаю тему проекта, ищу материалы, которые могут пригодиться команде.", image: 'assets/img/answers/q02c.webp', types: ["explorer"] },
      { letter: "D", text: "Слежу, чтобы все участники могли высказаться, и помогаю найти общий язык.", image: 'assets/img/answers/q02d.webp', types: ["communicator"] }
      ]
    },
    {
      n: 3,
      title: "Ты заходишь в аудиторию и видишь, что все уже сидят компаниями. Что сделаешь?",
      answers: [
      { letter: "A", text: "Выбираю удобное место и продумываю, как интересно начать разговор.", image: 'assets/img/answers/q03a.webp', types: ["creator", "chiller"] },
      { letter: "B", text: "Знакомлюсь первым(ой), не задумываясь к чему приведёт разговор.", image: 'assets/img/answers/q03b.webp', types: ["communicator", "adventurer"] },
      { letter: "C", text: "Сначала наблюдаю за людьми и пытаюсь понять, кто чем интересуется.", image: 'assets/img/answers/q03c.webp', types: ["explorer"] },
      { letter: "D", text: "Выбираю свободное место и заранее решаю, с кем можно познакомиться после пары.", image: 'assets/img/answers/q03d.webp', types: ["strategist"] }
      ]
    },
    {
      n: 4,
      title: "Предложили интересный проект, но он займёт всё свободное время. Твоя реакция?",
      answers: [
      { letter: "A", text: "Предложу пойти вместе с кем-нибудь из знакомых. Заодно проведу время в хорошей компании.", image: 'assets/img/answers/q04a.webp', types: ["communicator", "chiller"] },
      { letter: "B", text: "Сначала придумаю, как можно интересно подойти к проекту, а затем составлю план, чтобы всё успеть.", image: 'assets/img/answers/q04b.webp', types: ["creator", "strategist"] },
      { letter: "C", text: "Изучу условия участия, узнаю, чему можно научиться и насколько проект мне подходит.", image: 'assets/img/answers/q04c.webp', types: ["explorer"] },
      { letter: "D", text: "Конечно, попробую! Это отличный шанс получить новый опыт.", image: 'assets/img/answers/q04d.webp', types: ["adventurer"] }
      ]
    },
    {
      n: 5,
      title: "До сдачи проекта осталось 3 часа. Как обстоят дела?",
      answers: [
      { letter: "A", text: "Проверяю детали и улучшаю результат, чтобы он стал качественнее и интереснее.", image: 'assets/img/answers/q05a.webp', types: ["explorer", "creator"] },
      { letter: "B", text: "Не паникую, а быстро включаюсь в работу и разбираюсь по ходу дела.", image: 'assets/img/answers/q05b.webp', types: ["adventurer", "chiller"] },
      { letter: "C", text: "Проверяю, все ли сделали свою часть работы, и связываюсь с теми, кому нужна помощь.", image: 'assets/img/answers/q05c.webp', types: ["communicator"] },
      { letter: "D", text: "У меня уже всё готово. Я заранее распределил задачи и оставил время на проверку.", image: 'assets/img/answers/q05d.webp', types: ["strategist"] }
      ]
    },
    {
      n: 6,
      title: "У тебя появилось свободное окно между парами. Как проведёшь время?",
      answers: [
      { letter: "A", text: "Предложу одногруппникам сходить в новое место и провести время вместе.", image: 'assets/img/answers/q06a.webp', types: ["communicator", "adventurer"] },
      { letter: "B", text: "Сначала отдохну, а потом оценю оставшееся время и составлю план дел.", image: 'assets/img/answers/q06b.webp', types: ["strategist", "chiller"] },
      { letter: "C", text: "Использую это время, чтобы разобраться в теме, которая давно меня интересует.", image: 'assets/img/answers/q06c.webp', types: ["explorer"] },
      { letter: "D", text: "Попробую придумать идею для собственного проекта или заняться чем-нибудь творческим.", image: 'assets/img/answers/q06d.webp', types: ["creator"] }
      ]
    },
    {
      n: 7,
      title: "Преподаватель дал задание, в котором ты пока ничего не понимаешь. Твои действия?",
      answers: [
      { letter: "A", text: "Поищу доп. информацию и обсужу её с одногруппниками, чтобы ничего не упустить.", image: 'assets/img/answers/q07a.webp', types: ["explorer", "communicator"] },
      { letter: "B", text: "Попробую найти необычный способ решения и проверю его на практике.", image: 'assets/img/answers/q07b.webp', types: ["creator", "adventurer"] },
      { letter: "C", text: "Разделю задание на небольшие этапы и буду последовательно разбираться с каждым.", image: 'assets/img/answers/q07c.webp', types: ["strategist"] },
      { letter: "D", text: "Если сейчас не идёт, отложу дело и вернусь к нему позже, когда появится настроение.", image: 'assets/img/answers/q07d.webp', types: ["chiller"] }
      ]
    },
    {
      n: 8,
      title: "Тебе нужно выступить с докладом перед всей группой. Как ты к этому отнесёшься?",
      answers: [
      { letter: "A", text: "Сделаю выступление интересным, чтобы вовлечь аудиторию, а не просто читать слайды.", image: 'assets/img/answers/q08a.webp', types: ["creator", "communicator"] },
      { letter: "B", text: "Изучу тему, подготовлю аргументы и заранее отрепетирую выступление.", image: 'assets/img/answers/q08b.webp', types: ["explorer", "strategist"] },
      { letter: "C", text: "Воспринимаю это как шанс попробовать себя в новой роли и получить опыт.", image: 'assets/img/answers/q08c.webp', types: ["adventurer"] },
      { letter: "D", text: "Расскажу только самое главное и не буду переживать, если что-то пойдёт не идеально.", image: 'assets/img/answers/q08d.webp', types: ["chiller"] }
      ]
    },
    {
      n: 9,
      title: "Ты узнал о новом направлении — например, фотографии или истории искусства. Что дальше?",
      answers: [
      { letter: "A", text: "Начну изучать тему в своём темпе и разберусь, насколько она мне интересна.", image: 'assets/img/answers/q09a.webp', types: ["explorer", "chiller"] },
      { letter: "B", text: "Попробую себя в этом направлении и составлю план освоения нового занятия.", image: 'assets/img/answers/q09b.webp', types: ["strategist", "adventurer"] },
      { letter: "C", text: "Сразу захочется придумать что-нибудь своё на основе новой темы.", image: 'assets/img/answers/q09c.webp', types: ["creator"] },
      { letter: "D", text: "Спрошу знакомых об этом направлении и, возможно, найду единомышленников.", image: 'assets/img/answers/q09d.webp', types: ["communicator"] }
      ]
    },
    {
      n: 10,
      title: "Ты заблудился и не можешь найти нужную аудиторию. Как поступишь?",
      answers: [
      { letter: "A", text: "Буду искать дорогу сам(а), могу заодно изучить незнакомую часть корпуса.", image: 'assets/img/answers/q10a.webp', types: ["explorer", "adventurer"] },
      { letter: "B", text: "Спрошу у кого-нибудь дорогу, уточню детали и постараюсь запомнить маршрут на будущее.", image: 'assets/img/answers/q10b.webp', types: ["communicator", "strategist"] },
      { letter: "C", text: "Создам свою схему корпуса с необычными ориентирами.", image: 'assets/img/answers/q10c.webp', types: ["creator"] },
      { letter: "D", text: "Ничего страшного, опоздание на пять минут — не конец света. Главное, не нервничать.", image: 'assets/img/answers/q10d.webp', types: ["chiller"] }
      ]
    },
    {
      n: 11,
      title: "В РГГУ проходит большой фестиваль с мастер-классами и выступлениями. Ты скорее…",
      answers: [
      { letter: "A", text: "Буду пробовать разные активности и знакомиться с новыми людьми без строгого маршрута.", image: 'assets/img/answers/q11a.webp', types: ["adventurer", "chiller"] },
      { letter: "B", text: "Заранее посмотрю программу, выберу интересные площадки и предложу друзьям сходить вместе.", image: 'assets/img/answers/q11b.webp', types: ["communicator", "strategist"] },
      { letter: "C", text: "Посещу интересные лекции и выставки, чтобы узнать что-нибудь новое.", image: 'assets/img/answers/q11c.webp', types: ["explorer"] },
      { letter: "D", text: "Выберу самые необычные мастер-классы и попробую создать что-нибудь своими руками.", image: 'assets/img/answers/q11d.webp', types: ["creator"] }
      ]
    },
    {
      n: 12,
      title: "Планы пойти с друзьями в кафе после пар внезапно отменились. Твоя реакция?",
      answers: [
      { letter: "A", text: "Узнаю у друзей о других вариантах поблизости и предложу выбрать новое место.", image: 'assets/img/answers/q12a.webp', types: ["explorer", "communicator"] },
      { letter: "B", text: "Придумаю новый план и отправлюсь один туда, куда давно хотел.", image: 'assets/img/answers/q12b.webp', types: ["strategist", "adventurer"] },
      { letter: "C", text: "Отлично, появилось свободное время! Можно наконец-то ничего не делать :)", image: 'assets/img/answers/q12c.webp', types: ["chiller"] },
      { letter: "D", text: "Придумаю новый вариант досуга — необычное место или занятие, о котором раньше не думал.", image: 'assets/img/answers/q12d.webp', types: ["creator"] }
      ]
    },
    {
      n: 13,
      title: "Преподаватель предлагает выбрать тему для небольшого исследования. Что выберешь?",
      answers: [
      { letter: "A", text: "Ту, в которой можно найти малоизвестные факты и представить их в необычном формате.", image: 'assets/img/answers/q13a.webp', types: ["explorer", "creator"] },
      { letter: "B", text: "Ту, которую можно обсудить с другими, обменяться мнениями и узнать разные точки зрения без споров.", image: 'assets/img/answers/q13b.webp', types: ["communicator", "chiller"] },
      { letter: "C", text: "Выберу тему с понятными этапами и предсказуемым результатом.", image: 'assets/img/answers/q13c.webp', types: ["strategist"] },
      { letter: "D", text: "Ту, которая позволит попробовать себя в совершенно незнакомой области.", image: 'assets/img/answers/q13d.webp', types: ["adventurer"] }
      ]
    },
    {
      n: 14,
      title: "Нужно придумать новую активность для студентов РГГУ. Что ты предложишь?",
      answers: [
      { letter: "A", text: "Уютную зону для отдыха, творчества, настольных игр и общения между парами.", image: 'assets/img/answers/q14a.webp', types: ["creator", "chiller"] },
      { letter: "B", text: "Квест по университету с загадками, необычными заданиями и поиском новых мест.", image: 'assets/img/answers/q14b.webp', types: ["explorer", "adventurer"] },
      { letter: "C", text: "Клуб по интересам, где студенты смогут знакомиться, общаться и обмениваться опытом.", image: 'assets/img/answers/q14c.webp', types: ["communicator"] },
      { letter: "D", text: "Систему мероприятий с расписанием, регистрацией и удобной организацией.", image: 'assets/img/answers/q14d.webp', types: ["strategist"] }
      ]
    },
    {
      n: 15,
      title: "Представь: свободный день в университете без пар и заданий. Как его проведёшь?",
      answers: [
      { letter: "A", text: "Собрал бы друзей, придумал интересную активность и провёл день в хорошей компании.", image: 'assets/img/answers/q15a.webp', types: ["creator", "communicator"] },
      { letter: "B", text: "Изучал бы то, что давно хотел, и разобрался с накопившимися делами.", image: 'assets/img/answers/q15b.webp', types: ["explorer", "strategist"] },
      { letter: "C", text: "Посетил бы новое место, попробовал что-нибудь необычное и получил яркие впечатления.", image: 'assets/img/answers/q15c.webp', types: ["adventurer"] },
      { letter: "D", text: "Просто наслаждался бы свободным временем без расписания и планов.", image: 'assets/img/answers/q15d.webp', types: ["chiller"] }
      ]
    }
  ]
};
