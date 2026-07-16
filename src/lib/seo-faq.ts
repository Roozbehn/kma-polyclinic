import type { AppLocale } from "@/lib/whatsapp";

export type FaqItem = { question: string; answer: string };

/** GEO-friendly FAQ blocks: self-contained answers AI systems can cite. */
export const serviceFaqs: Record<
  AppLocale,
  Record<string, FaqItem[]>
> = {
  en: {
    "eyebrow-transplant": [
      {
        question: "What is an eyebrow transplant?",
        answer:
          "An eyebrow transplant is a medical hair restoration procedure that moves permanent grafts from a donor area to the brows to rebuild density, shape, and symmetry. At KMA PolyClinic in Torun Center, Istanbul, design follows your facial proportions before placement.",
      },
      {
        question: "Who is a good candidate for eyebrow transplant in Istanbul?",
        answer:
          "Candidates often include people with genetic thinning, over-plucking, scars, or shape loss. Final suitability is confirmed after clinical assessment of donor hair, skin, and medical history at KMA PolyClinic.",
      },
      {
        question: "How long does eyebrow transplant recovery take?",
        answer:
          "Mild redness, sensitivity, or scabbing is common in the first days. Visible improvement develops over weeks to months as grafts settle. Aftercare instructions and optional follow-up are part of the KMA care pathway.",
      },
    ],
    "hair-transplant": [
      {
        question: "What is a hair transplant at KMA PolyClinic?",
        answer:
          "A hair transplant moves grafts from a donor zone to thinning or balding areas for lasting density. KMA PolyClinic in Istanbul personalises hairline design, graft planning, and session structure after clinical evaluation.",
      },
      {
        question: "When will I see hair transplant results?",
        answer:
          "Early shedding can occur; new growth typically appears over several months, with fuller results often assessed around 9–12 months depending on individual biology and aftercare adherence.",
      },
      {
        question: "Is hair transplant suitable for international patients?",
        answer:
          "Yes. KMA PolyClinic serves multi-language patients (TR, EN, FA, AR) at Torun Center, Istanbul, with consultation, procedure planning, and aftercare guidance for medical tourism pathways.",
      },
    ],
    botox: [
      {
        question: "What does botox treat at KMA PolyClinic?",
        answer:
          "Medical botox softens expression lines such as forehead lines, frown lines, and crow’s feet by carefully relaxing selected facial muscles while aiming to preserve a natural expression.",
      },
      {
        question: "How long does botox last?",
        answer:
          "Effects usually appear within days and often last several months, depending on metabolism, dose, and treatment area. Suitability and dosing are decided by a physician after assessment.",
      },
      {
        question: "Is botox a surgical procedure?",
        answer:
          "No. Botox is a non-surgical injectable treatment. Sessions are typically short, and many patients return to daily activities the same day when clinically appropriate.",
      },
    ],
    filler: [
      {
        question: "What are dermal fillers used for?",
        answer:
          "Medical hyaluronic acid fillers support volume and balance in areas such as lips, cheeks, chin, nose, and under-eyes. At KMA PolyClinic the goal is refined contour that remains natural to your face.",
      },
      {
        question: "How long do fillers last?",
        answer:
          "Longevity varies by product, area, and individual metabolism—often several months. Temporary swelling or bruising can occur; your clinician explains expected recovery during consultation.",
      },
      {
        question: "Are fillers reversible?",
        answer:
          "Many hyaluronic acid fillers can be dissolved with hyaluronidase when clinically indicated. Product choice and contingency plans are discussed during your medical consultation.",
      },
    ],
    laser: [
      {
        question: "What laser treatments does KMA PolyClinic offer?",
        answer:
          "Clinical laser protocols may address skin renewal, pigmentation support, acne-mark care, and hair reduction. Plans are adapted to skin type, indication, and seasonal considerations.",
      },
      {
        question: "How many laser sessions will I need?",
        answer:
          "Most laser programmes need multiple sessions. Spacing depends on the indication and device protocol; improvement is typically gradual rather than single-session.",
      },
      {
        question: "What should I avoid before laser treatment?",
        answer:
          "Fresh tanning, active skin infection, and certain medications can require postponement. Your clinician reviews contraindications and sun-protection guidance before treatment.",
      },
    ],
  },
  tr: {
    "eyebrow-transplant": [
      {
        question: "Kaş ekimi nedir?",
        answer:
          "Kaş ekimi, donör bölgeden alınan kalıcı greftlerin kaşlara taşınarak yoğunluk, şekil ve simetriyi yeniden oluşturduğu medikal bir işlemdir. KMA PolyClinic Torun Center’da tasarım yüz oranlarınıza göre planlanır.",
      },
      {
        question: "Kimler kaş ekimi için uygun adaydır?",
        answer:
          "Genetik seyrelme, aşırı alım, yara izi veya şekil kaybı yaşayanlar aday olabilir. Uygunluk; donör saç, cilt ve tıbbi öykü değerlendirmesi sonrası klinik olarak netleşir.",
      },
      {
        question: "Kaş ekimi sonrası iyileşme nasıl ilerler?",
        answer:
          "İlk günlerde hafif kızarıklık, hassasiyet veya kabuklanma görülebilir. Greftler oturdukça sonuçlar haftalar–aylar içinde belirginleşir. Bakım talimatları ve kontrol süreci planın parçasıdır.",
      },
    ],
    "hair-transplant": [
      {
        question: "KMA PolyClinic’te saç ekimi nedir?",
        answer:
          "Saç ekimi, donör bölgeden greftlerin seyrek alanlara taşınmasıyla kalıcı yoğunluk hedefler. İstanbul Torun Center’daki polikliniğimizde saç çizgisi ve greft planı klinik değerlendirme sonrası kişiselleştirilir.",
      },
      {
        question: "Saç ekimi sonuçları ne zaman görülür?",
        answer:
          "Erken dönemde dökülme olabilir; yeni uzama genelde aylar içinde başlar. Tam görünüm çoğu kişide 9–12 ay civarında değerlendirilir ve bakım uyumuna bağlıdır.",
      },
      {
        question: "Yurt dışından hastalar saç ekimi yaptırabilir mi?",
        answer:
          "Evet. KMA PolyClinic TR, EN, FA ve AR dillerinde hizmet verir; danışmanlık, planlama ve bakım yönlendirmesi medikal turizm süreçlerine uygundur.",
      },
    ],
    botox: [
      {
        question: "Botoks hangi bölgeleri hedefler?",
        answer:
          "Medikal botoks alın çizgileri, kaş arası ve göz kenarı gibi mimik kırışıklıklarını yumuşatmaya yardımcı olur; doğal ifadeyi koruyacak doz ve noktalar planlanır.",
      },
      {
        question: "Botoks etkisi ne kadar sürer?",
        answer:
          "Etki genelde birkaç gün içinde başlar ve metabolizma ile doza bağlı olarak aylarca sürebilir. Uygunluk hekim değerlendirmesi ile belirlenir.",
      },
      {
        question: "Botoks cerrahi midir?",
        answer:
          "Hayır. Botoks cerrahi olmayan enjeksiyonel bir uygulamadır. Seanslar kısa sürer; klinik uygunlukta aynı gün günlük yaşama dönülebilir.",
      },
    ],
    filler: [
      {
        question: "Dolgu hangi amaçla uygulanır?",
        answer:
          "Hyaluronik asit dolguları dudak, yanak, çene, burun ve göz altı gibi bölgelerde hacim ve oran dengesini destekler. Amaç abartısız, yüze uyumlu bir sonuçtur.",
      },
      {
        question: "Dolgu ne kadar kalıcıdır?",
        answer:
          "Kalıcılık ürün, bölge ve metabolizmaya göre değişir; genelde aylarca sürebilir. Geçici şişlik veya morarma olabilir; süreç danışmanlıkta anlatılır.",
      },
      {
        question: "Dolgular eritilebilir mi?",
        answer:
          "Birçok hyaluronik asit dolgu, klinik endikasyonda hiyalüronidaz ile eritilebilir. Ürün seçimi ve plan hekimle birlikte yapılır.",
      },
    ],
    laser: [
      {
        question: "KMA PolyClinic hangi lazer tedavilerini sunar?",
        answer:
          "Klinik lazer protokolleri cilt yenileme, leke desteği, akne izi bakımı ve istenmeyen tüy azaltma gibi endikasyonları kapsayabilir; cilt tipine göre planlanır.",
      },
      {
        question: "Kaç seans lazer gerekir?",
        answer:
          "Çoğu lazer programı birden fazla seans ister. Aralık endikasyon ve protokole göre değişir; sonuçlar genelde kademeli gelişir.",
      },
      {
        question: "Lazer öncesi nelere dikkat edilmeli?",
        answer:
          "Taze bronzluk, aktif enfeksiyon veya bazı ilaçlar erteleme nedeni olabilir. Kontrendikasyonlar ve güneş koruması hekim tarafından değerlendirilir.",
      },
    ],
  },
  fa: {
    "eyebrow-transplant": [
      {
        question: "کاشت ابرو چیست؟",
        answer:
          "کاشت ابرو روشی پزشکی برای بازسازی تراکم و فرم ابرو با انتقال گرافت‌های ماندگار از ناحیه دهنده است. در KMA PolyClinic تورون سنتر استانبول، طراحی بر اساس تناسبات صورت انجام می‌شود.",
      },
      {
        question: "چه کسانی برای کاشت ابرو مناسب‌اند؟",
        answer:
          "کم‌پشتی ژنتیکی، برداشت بیش از حد، اسکار یا از دست رفتن فرم از دلایل شایع است. تناسب نهایی پس از ارزیابی بالینی مو، پوست و سابقه پزشکی مشخص می‌شود.",
      },
      {
        question: "بهبودی پس از کاشت ابرو چگونه است؟",
        answer:
          "در روزهای نخست قرمزی یا پوسته‌ریزی خفیف شایع است. نتیجه طی هفته‌ها و ماه‌ها با تثبیت گرافت‌ها آشکارتر می‌شود و مراقبت پس از درمان بخشی از مسیر است.",
      },
    ],
    "hair-transplant": [
      {
        question: "کاشت مو در KMA PolyClinic چیست؟",
        answer:
          "کاشت مو گرافت‌ها را از ناحیه دهنده به نواحی کم‌پشت منتقل می‌کند تا تراکم ماندگار ایجاد شود. در استانبول، طراحی خط مو و برنامه گرافت پس از ارزیابی بالینی شخصی‌سازی می‌شود.",
      },
      {
        question: "نتایج کاشت مو چه زمانی دیده می‌شود؟",
        answer:
          "ریزش اولیه ممکن است رخ دهد؛ رشد جدید معمولاً طی چند ماه آغاز می‌شود و ارزیابی کامل‌تر اغلب حدود ۹ تا ۱۲ ماه انجام می‌شود.",
      },
      {
        question: "آیا بیماران بین‌المللی می‌توانند کاشت مو انجام دهند؟",
        answer:
          "بله. KMA PolyClinic با پشتیبانی زبان‌های ترکی، انگلیسی، فارسی و عربی در تورون سنتر، مسیر مشاوره، برنامه‌ریزی و مراقبت پس از درمان را ارائه می‌دهد.",
      },
    ],
    botox: [
      {
        question: "بوتاکس در KMA چه مواردی را هدف می‌گیرد؟",
        answer:
          "بوتاکس پزشکی خطوط بیان مانند پیشانی، بین ابرو و گوشه چشم را با شل کردن کنترل‌شده عضلات منتخب نرم می‌کند و هدف حفظ حالت طبیعی چهره است.",
      },
      {
        question: "اثر بوتاکس چقدر دوام دارد؟",
        answer:
          "اثر معمولاً طی چند روز ظاهر می‌شود و بسته به متابولیسم و دوز چند ماه دوام دارد. تناسب و دوز پس از ارزیابی پزشک تعیین می‌شود.",
      },
      {
        question: "آیا بوتاکس جراحی است؟",
        answer:
          "خیر. بوتاکس درمان تزریقی غیرجراحی است. جلسه کوتاه است و در صورت مناسب بودن بالینی اغلب همان روز به فعالیت روزانه بازمی‌گردید.",
      },
    ],
    filler: [
      {
        question: "فیلر برای چه استفاده می‌شود؟",
        answer:
          "فیلرهای هیالورونیک اسید پزشکی حجم و تعادل را در لب، گونه، چانه، بینی و زیر چشم پشتیبانی می‌کنند. هدف KMA نتیجه ظریف و طبیعی است.",
      },
      {
        question: "ماندگاری فیلر چقدر است؟",
        answer:
          "ماندگاری بسته به محصول، ناحیه و متابولیسم متفاوت است و اغلب چند ماه طول می‌کشد. تورم یا کبودی موقت ممکن است رخ دهد.",
      },
      {
        question: "آیا فیلر قابل حل شدن است؟",
        answer:
          "بسیاری از فیلرهای هیالورونیک اسید در صورت اندیکاسیون بالینی با هیالورونیداز قابل حل هستند. انتخاب محصول در مشاوره پزشکی بررسی می‌شود.",
      },
    ],
    laser: [
      {
        question: "درمان‌های لیزر KMA شامل چیست؟",
        answer:
          "پروتکل‌های لیزر ممکن است نوزایی پوست، حمایت از لک، مراقبت آثار آکنه و کاهش موهای زائد را پوشش دهد و بر اساس نوع پوست تنظیم می‌شود.",
      },
      {
        question: "چند جلسه لیزر لازم است؟",
        answer:
          "اغلب چند جلسه لازم است. فاصله جلسات به اندیکاسیون و پروتکل دستگاه بستگی دارد و پیشرفت معمولاً تدریجی است.",
      },
      {
        question: "قبل از لیزر از چه چیزهایی پرهیز کنم؟",
        answer:
          "برنزه تازه، عفونت فعال پوست و برخی داروها ممکن است نیاز به تعویق داشته باشد. ضدآفتاب و منع‌ها در ارزیابی بالینی بررسی می‌شود.",
      },
    ],
  },
  ar: {
    "eyebrow-transplant": [
      {
        question: "ما هي زراعة الحواجب؟",
        answer:
          "زراعة الحواجب إجراء طبي ينقل طعومًا دائمة من منطقة مانحة إلى الحواجب لإعادة الكثافة والشكل والتناسق. في KMA PolyClinic بتورون سنتر إسطنبول يُصمَّم الشكل وفق نسب الوجه قبل الزرع.",
      },
      {
        question: "من المرشح المناسب لزراعة الحواجب؟",
        answer:
          "يشمل المرشحون غالبًا من يعانون ترققًا وراثيًا أو نتفًا مفرطًا أو ندوبًا أو فقدان الشكل. تُؤكَّد الملاءمة بعد تقييم سريري للشعر والجلد والتاريخ الطبي.",
      },
      {
        question: "كيف يكون التعافي بعد زراعة الحواجب؟",
        answer:
          "احمرار أو حساسية أو تقشر خفيف شائع في الأيام الأولى. يتحسن المظهر على مدى أسابيع وأشهر مع ثبات الطعوم، والرعاية اللاحقة جزء من المسار.",
      },
    ],
    "hair-transplant": [
      {
        question: "ما زراعة الشعر في KMA PolyClinic؟",
        answer:
          "تنقل زراعة الشعر الطعوم من المنطقة المانحة إلى مناطق الترقق لكثافة تدوم. في إسطنبول يُخصَّص تصميم خط الشعر وخطة الطعوم بعد تقييم سريري.",
      },
      {
        question: "متى تظهر نتائج زراعة الشعر؟",
        answer:
          "قد يحدث تساقط مبكر؛ يظهر النمو الجديد عادة خلال أشهر، ويُقيَّم المظهر الأكمل غالبًا خلال 9–12 شهرًا بحسب الفرد والالتزام بالرعاية.",
      },
      {
        question: "هل تناسب زراعة الشعر المرضى الدوليين؟",
        answer:
          "نعم. تقدّم KMA PolyClinic خدمات متعددة اللغات (TR, EN, FA, AR) في تورون سنتر مع استشارة وتخطيط ورعاية لاحقة لمسارات السياحة العلاجية.",
      },
    ],
    botox: [
      {
        question: "ماذا يعالج البوتوكس في KMA؟",
        answer:
          "يساعد البوتوكس الطبي على تليين خطوط التعبير مثل الجبهة وبين الحاجبين وخطوط العين عبر إرخاء عضلات محددة مع الحفاظ على تعبير طبيعي قدر الإمكان.",
      },
      {
        question: "كم يدوم مفعول البوتوكس؟",
        answer:
          "تظهر الآثار عادة خلال أيام وتدوم أشهرًا بحسب الأيض والجرعة والمنطقة. يحدد الطبيب الملاءمة والجرعة بعد التقييم.",
      },
      {
        question: "هل البوتوكس جراحة؟",
        answer:
          "لا. البوتوكس علاج حقني غير جراحي. الجلسة قصيرة وكثير من المرضى يعودون لنشاطهم اليومي في اليوم نفسه عند الملاءمة السريرية.",
      },
    ],
    filler: [
      {
        question: "فيمَ يُستخدم الفيلر؟",
        answer:
          "يدعم فيلر حمض الهيالورونيك الطبي الحجم والتوازن في الشفاه والخدود والذقن والأنف وتحت العين بهدف مظهر متقن وطبيعي.",
      },
      {
        question: "كم تدوم نتائج الفيلر؟",
        answer:
          "تختلف المدة حسب المنتج والمنطقة والأيض وغالبًا تمتد لأشهر. قد يحدث تورم أو كدمات مؤقتة تُشرح أثناء الاستشارة.",
      },
      {
        question: "هل يمكن إذابة الفيلر؟",
        answer:
          "يمكن إذابة كثير من فيلر حمض الهيالورونيك بالهيالورونيداز عند وجود استطباب سريري. يُناقش اختيار المنتج في الاستشارة الطبية.",
      },
    ],
    laser: [
      {
        question: "ما علاجات الليزر في KMA PolyClinic؟",
        answer:
          "قد تشمل بروتوكولات الليزر تجديد البشرة ودعم التصبغ وآثار حب الشباب وتقليل الشعر غير المرغوب، وتُكيَّف حسب نوع البشرة.",
      },
      {
        question: "كم جلسة ليزر أحتاج؟",
        answer:
          "غالبًا يلزم عدة جلسات. يعتمد التباعد على الاستطباب والبروتوكول، والتحسّن عادة تدريجي.",
      },
      {
        question: "ما الذي يجب تجنبه قبل الليزر؟",
        answer:
          "السمرة الحديثة والعدوى النشطة وبعض الأدوية قد تستدعي التأجيل. تُراجع موانع الاستعمال والحماية من الشمس قبل العلاج.",
      },
    ],
  },
};

export function getServiceFaqs(locale: string, slug: string): FaqItem[] {
  const key =
    locale === "tr" || locale === "en" || locale === "fa" || locale === "ar"
      ? locale
      : "en";
  return serviceFaqs[key][slug] ?? serviceFaqs.en[slug] ?? [];
}

export const departmentFaqs: Record<AppLocale, FaqItem[]> = {
  en: [
    {
      question: "Which departments does KMA PolyClinic offer?",
      answer:
        "KMA PolyClinic in Torun Center, Istanbul offers aesthetics, dermatology, dentistry, plastic surgery, hair transplant, and eyebrow transplant. Persian-language check-up and laboratory services are available on the FA locale.",
    },
    {
      question: "Do you treat international patients?",
      answer:
        "Yes. The clinic communicates in Turkish, English, Persian, and Arabic, with WhatsApp and appointment pathways designed for multi-country guests visiting Istanbul.",
    },
    {
      question: "Where is KMA PolyClinic located?",
      answer:
        "KMA PolyClinic is at Fulya Mah. Büyükdere Cad. Torun Center A Blok No:74A — İç Kapı No:10, Istanbul, Turkey. Hours are Monday–Saturday 11:00–19:00.",
    },
  ],
  tr: [
    {
      question: "KMA PolyClinic hangi bölümleri sunar?",
      answer:
        "Torun Center, İstanbul’daki KMA PolyClinic; estetik, dermatoloji, diş hekimliği, plastik cerrahi, saç ekimi ve kaş ekimi sunar. Farsça dilinde check-up ve laboratuvar hizmeti FA yerelinde yer alır.",
    },
    {
      question: "Yurt dışından hastaları kabul ediyor musunuz?",
      answer:
        "Evet. Klinik Türkçe, İngilizce, Farsça ve Arapça iletişim kurar; WhatsApp ve randevu akışları İstanbul’a gelen uluslararası misafirler için tasarlanmıştır.",
    },
    {
      question: "KMA PolyClinic nerede?",
      answer:
        "Adres: Fulya Mah. Büyükdere Cad. Torun Center A Blok No:74A — İç Kapı No:10, İstanbul. Çalışma saatleri Pazartesi–Cumartesi 11:00–19:00.",
    },
  ],
  fa: [
    {
      question: "KMA PolyClinic چه بخش‌هایی دارد؟",
      answer:
        "در تورون سنتر استانبول، بخش‌های زیبایی، پوست، دندانپزشکی، جراحی پلاستیک، کاشت مو و کاشت ابرو ارائه می‌شود. خدمات چکاپ و آزمایشگاه با تمرکز زبان فارسی در نسخه FA در دسترس است.",
    },
    {
      question: "آیا بیماران بین‌المللی پذیرش می‌شوند؟",
      answer:
        "بله. کلینیک به زبان‌های ترکی، انگلیسی، فارسی و عربی ارتباط برقرار می‌کند و مسیر واتساپ و نوبت برای مهمانان چندکشوری طراحی شده است.",
    },
    {
      question: "آدرس KMA PolyClinic کجاست؟",
      answer:
        "نشانی: Fulya Mah. Büyükdere Cad. Torun Center A Blok No:74A — İç Kapı No:10، استانبول. ساعات کاری دوشنبه تا شنبه ۱۱:۰۰–۱۹:۰۰.",
    },
  ],
  ar: [
    {
      question: "ما الأقسام المتوفرة في KMA PolyClinic؟",
      answer:
        "في تورون سنتر بإسطنبول نقدّم التجميل والجلدية وطب الأسنان والجراحة التجميلية وزراعة الشعر وزراعة الحواجب. خدمات الفحص والمختبر متاحة أساسًا عبر واجهة اللغة الفارسية.",
    },
    {
      question: "هل تستقبلون مرضى دوليين؟",
      answer:
        "نعم. تتواصل العيادة بالتركية والإنجليزية والفارسية والعربية مع مسارات واتساب ومواعيد مصممة للضيوف من عدة دول.",
    },
    {
      question: "أين تقع KMA PolyClinic؟",
      answer:
        "العنوان: Fulya Mah. Büyükdere Cad. Torun Center A Blok No:74A — İç Kapı No:10، إسطنبول. ساعات العمل الإثنين–السبت 11:00–19:00.",
    },
  ],
};

export function getDepartmentHubFaqs(locale: string): FaqItem[] {
  const key =
    locale === "tr" || locale === "en" || locale === "fa" || locale === "ar"
      ? locale
      : "en";
  return departmentFaqs[key];
}
