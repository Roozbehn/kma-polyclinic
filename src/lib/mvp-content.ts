/**
 * Static MVP fallback when Sanity returns empty.
 * Prefer CMS docs in production; keep this file in sync with Studio seed checklist.
 *
 * Seed rules:
 * - Create translated department + priority service docs for tr / en / fa / ar
 * - Department `checkup-laboratory` must set `faOnly: true` (visible only on `/fa`)
 * - Legal pages fall back via `getMvpLegal` in `@/lib/mvp-legal`
 */
import {
  getDepartmentBySlug,
  getDepartments,
  getPriorityServices,
  getServiceBySlug,
} from "@/lib/sanity";
import type { AppLocale } from "@/lib/whatsapp";

export interface MvpDepartment {
  slug: string;
  title: string;
  summary: string;
  /** Portable-text style blocks or plain paragraphs rendered on detail pages. */
  body?: unknown;
  faOnly?: boolean;
  navPriority: number;
  heroImage?: {
    asset?: { _ref?: string; _type?: string };
    [key: string]: unknown;
  } | null;
}

export interface MvpService {
  slug: string;
  title: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  body?: unknown;
}

interface LocaleBundle {
  departments: MvpDepartment[];
  priorityServices: MvpService[];
}

/** Department slugs editors should create in Sanity (with locale translations). */
export const MVP_DEPARTMENT_SLUGS = [
  "aesthetics",
  "dermatology",
  "dentistry",
  "plastic-surgery",
  "hair-transplant",
  "eyebrow-transplant",
  "checkup-laboratory",
] as const;

/** Priority service slugs for home + service routes. */
export const MVP_PRIORITY_SERVICE_SLUGS = [
  "eyebrow-transplant",
  "hair-transplant",
  "botox",
  "filler",
  "laser",
] as const;

const DEPARTMENT_SLUGS = MVP_DEPARTMENT_SLUGS;

/** Build Sanity-compatible block content from plain paragraphs. */
function body(...paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block" as const,
    children: [{ text }],
  }));
}

function dept(
  slug: (typeof DEPARTMENT_SLUGS)[number],
  title: string,
  summary: string,
  navPriority: number,
  paragraphs: string[],
  faOnly?: boolean,
): MvpDepartment {
  const base: MvpDepartment = {
    slug,
    title,
    summary,
    navPriority,
    body: body(...paragraphs),
  };
  return faOnly ? { ...base, faOnly: true } : base;
}

function svc(
  slug: string,
  title: string,
  summary: string,
  paragraphs: string[],
  seo?: { title?: string; description?: string },
): MvpService {
  return {
    slug,
    title,
    summary,
    body: body(...paragraphs),
    seoTitle: seo?.title,
    seoDescription: seo?.description,
  };
}

export const mvpContent: Record<AppLocale, LocaleBundle> = {
  tr: {
    departments: [
      dept(
        "aesthetics",
        "Estetik",
        "Torun Center’da yüz ve vücut için ölçülü, medikal estetik yaklaşımlar.",
        1,
        [
          "KMA PolyClinic estetik bölümü; botoks, dolgu, lazer ve cilt bakımı gibi non-invaziv ve minimal invaziv uygulamaları sakin, klinik bir ortamda sunar.",
          "Her plan yüz analizi ve beklenti görüşmesiyle başlar. Amaç trendi kopyalamak değil; oranları koruyan, doğal duran sonuçlar elde etmektir.",
          "Tedavi sonrası bakım ve takip randevuları sürecin parçasıdır. Randevu ve danışmanlık için iletişim formumuzu veya WhatsApp hattımızı kullanabilirsiniz.",
        ],
      ),
      dept(
        "dermatology",
        "Dermatoloji",
        "Cilt sağlığı, medikal dermatoloji ve estetik cilt tedavileri.",
        2,
        [
          "Dermatoloji birimimiz akne, leke, hassasiyet, yaşlanma belirtileri ve cilt bariyeri sorunlarına klinik odaklı çözümler sunar.",
          "Tanı ve tedavi planı muayene sonrası kişiselleştirilir; gerekirse lazer, soyma, enjeksiyonel destek veya topikal protokollere yönlendirilirsiniz.",
          "Estetik hedefler ile cilt sağlığını birlikte ele alırız — sağlıklı cilt, kalıcı güzelliğin temelidir.",
        ],
      ),
      dept(
        "dentistry",
        "Diş Hekimliği",
        "Estetik ve restoratif diş hekimliği; gülüş tasarımı ve ağız sağlığı.",
        3,
        [
          "Diş hekimliği birimimiz estetik gülüş tasarımı, beyazlatma, dolgu ve restoratif bakımı modern standartlarda sunar.",
          "İlk görüşmede ağız sağlığı ve estetik hedefleriniz değerlendirilir; tedavi adımları şeffaf biçimde planlanır.",
          "Konfor ve hijyen protokollerimiz, polikliniğimizin Quiet Luxury yaklaşımıyla uyumludur.",
        ],
      ),
      dept(
        "plastic-surgery",
        "Plastik Cerrahi",
        "Cerrahi estetik ve rekonstrüktif yaklaşımlar için danışmanlık ve planlama.",
        4,
        [
          "Plastik cerrahi birimimiz yüz ve vücut cerrahisi ile rekonstrüktif ihtiyaçlar için değerlendirme ve yönlendirme sağlar.",
          "Cerrahi kararlar yalnızca yüz yüze muayene, uygunluk analizi ve gerçekçi beklenti yönetimi sonrası alınır.",
          "Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır; bireysel tedavi önerisi yerine geçmez.",
        ],
      ),
      dept(
        "hair-transplant",
        "Saç Ekimi",
        "Doğal hat ve yoğunluk odaklı, kişiye özel saç ekimi çözümleri.",
        5,
        [
          "Saç ekimi birimimiz dökülme tipi, donör kapasitesi ve yüz oranlarına göre kişiselleştirilmiş ekim planları hazırlar.",
          "Doğal saç çizgisi, uygun greft dağılımı ve iyileşme süreci hakkında net bilgilendirme yapılır.",
          "Detaylı hizmet içeriği için Saç Ekimi tedavi sayfamızı inceleyebilir veya randevu talep edebilirsiniz.",
        ],
      ),
      dept(
        "eyebrow-transplant",
        "Kaş Ekimi",
        "Yoğun, dengeli ve yüze uyumlu kaş tasarımı ile kalıcı kaş restorasyonu.",
        6,
        [
          "Kaş ekimi, seyrelme, yara izi veya şekil bozukluklarında kalıcı bir çözüm sunar. Tasarım yüz hatlarınız ve mimiklerinizle uyumlu planlanır.",
          "İşlem öncesi çizim, greft seçimi ve yoğunluk hedefleri birlikte netleştirilir.",
          "Öncelikli tedavi olarak öne çıkardığımız kaş ekimi hakkında daha fazla bilgi için ilgili hizmet sayfasını ziyaret edin.",
        ],
      ),
      dept(
        "checkup-laboratory",
        "Check-up & Laboratuvar",
        "Kapsamlı check-up paketleri ve laboratuvar destekli sağlık taramaları.",
        7,
        [
          "Check-up ve laboratuvar birimimiz genel sağlık taraması, kan tetkikleri ve hekim değerlendirmesini bir araya getirir.",
          "Paketler yaş, şikâyet ve risk faktörlerine göre uyarlanabilir; sonuçlar sade ve anlaşılır biçimde paylaşılır.",
          "Bu birim öncelikle Farsça dil desteğiyle sunulur. Randevu için iletişim formunu kullanabilirsiniz.",
        ],
        true,
      ),
    ],
    priorityServices: [
      svc(
        "eyebrow-transplant",
        "Kaş Ekimi",
        "Doğal yoğunluk ve yüzü çerçeveleyen, kişiye özel kaş ekimi.",
        [
          "Kaş ekimi, seyrek veya asimetrik kaşları kalıcı greftlerle güçlendirir. KMA’da önce yüz oranlarınıza uygun bir kaş tasarımı çizilir; ardından greft yerleşimi bu plana göre yapılır.",
          "Süreç: danışmanlık ve çizim, lokal anestezi altında greft alımı ve ekim, ardından bakım talimatları ve kontrol. İyileşme süreci kişiden kişiye değişir; ilk günlerde hassasiyet ve kabuklanma normal olabilir.",
          "Kimler için uygundur: genetik seyrelme, aşırı alım sonrası seyreklik, travma veya skar kaynaklı kayıplar. Uygunluk muayene ile belirlenir.",
          "Sonuçlar doğal bir çerçeve ve dengeli yoğunluk hedefler. Nihai görünüm greft tutumuna ve bakım uyumuna bağlıdır. Randevu için iletişime geçin.",
        ],
        {
          title: "Kaş Ekimi İstanbul | KMA PolyClinic",
          description:
            "Torun Center’da doğal yoğunluk ve yüze uyumlu tasarımla kaş ekimi. Kişisel plan, sakin klinik ortam.",
        },
      ),
      svc(
        "hair-transplant",
        "Saç Ekimi",
        "Doğal saç çizgisi ve kalıcı yoğunluk için kişiselleştirilmiş saç ekimi.",
        [
          "Saç ekimi, donör bölgeden alınan greftlerin seyrek alanlara taşınmasıyla kalıcı bir çözüm sunar. Planlama dökülme paterni, yaş ve yüz hatlarına göre yapılır.",
          "Danışmanlıkta greft ihtiyacı, saç çizgisi tasarımı ve seans planı konuşulur. İşlem günü lokal anestezi altında greft alımı ve ekim gerçekleştirilir; sonrasında yıkama ve bakım protokolü verilir.",
          "Gerçekçi beklenti esastır: sonuçlar kademeli gelişir ve tam görünüm aylar içinde oturur. Sigara, ilaç kullanımı ve sistemik hastalıklar uygunluğu etkileyebilir.",
          "İstanbul Torun Center’daki polikliniğimizde sakin bir ortamda değerlendirme ve planlama sunuyoruz. Randevu için formu doldurun veya WhatsApp’tan yazın.",
        ],
        {
          title: "Saç Ekimi İstanbul | KMA PolyClinic",
          description:
            "Kişiye özel saç ekimi planı: doğal hat, greft planlaması ve klinik takip. KMA PolyClinic, Torun Center.",
        },
      ),
      svc(
        "botox",
        "Botoks",
        "İnce çizgi ve mimik kırışıklıklarını yumuşatan medikal botoks uygulamaları.",
        [
          "Botoks, mimik kaslarını kontrollü biçimde gevşeterek alın çizgileri, kaş arası ve göz kenarı kırışıklıklarının görünümünü azaltmaya yardımcı olur.",
          "Uygulama öncesi yüz analizi yapılır; doz ve noktalar doğal ifadeyi koruyacak şekilde planlanır. İşlem kısa sürer; günlük yaşama dönüş çoğu zaman aynı gün mümkündür.",
          "Etki genellikle birkaç gün içinde belirginleşir ve bireysel metabolizmaya bağlı olarak aylarca sürebilir. Hamilelik, emzirme veya belirli nöromüsküler durumlarda uygun olmayabilir.",
          "Medikal kararı hekim verir. Estetik botoks hakkında danışmak için randevu alın.",
        ],
        {
          title: "Botoks İstanbul | KMA PolyClinic",
          description:
            "Doğal ifade koruyan botoks uygulamaları. Ölçülü doz planı ve klinik takip — KMA PolyClinic.",
        },
      ),
      svc(
        "filler",
        "Dolgu",
        "Yüz hatlarını dengeleyen, medikal standartlarda hyaluronik asit dolguları.",
        [
          "Medikal dolgular dudak, yanak, çene ucu, burun ve göz altı gibi bölgelerde hacim ve oran dengesini destekler. KMA’da amaç abartısız, yüzle bütünleşen bir sonuçtur.",
          "Danışmanlıkta anatomi, cilt kalitesi ve beklentiniz değerlendirilir. Uygun ürün ve miktar hekim tarafından seçilir; işlem sonrası şişlik veya morarma geçici olabilir.",
          "Sonuçlar ürüne ve bölgeye göre değişen sürelerde kalıcılık gösterir. Dolgu, cerrahi alternatif arayan veya hafif–orta hacim ihtiyacı olan hastalarda tercih edilebilir.",
          "Bireysel uygunluk muayene ile netleşir. Dolgu danışmanlığı için iletişime geçin.",
        ],
        {
          title: "Dolgu Tedavisi İstanbul | KMA PolyClinic",
          description:
            "Yüz oranlarını dengeleyen medikal dolgu uygulamaları. Kişisel plan, sakin poliklinik ortamı.",
        },
      ),
      svc(
        "laser",
        "Lazer",
        "Cilt yenileme, leke yönetimi ve lazer epilasyon için klinik lazer tedavileri.",
        [
          "Lazer birimimiz cilt yenileme, pigmentasyon, akne izi desteği ve istenmeyen tüy azaltma gibi endikasyonlarda cihaz temelli protokolleri kullanır.",
          "Cilt tipi, endikasyon ve sezon dikkate alınarak seans aralığı planlanır. Koruma (güneş, nemlendirme) tedavi başarısının önemli parçasıdır.",
          "Birden fazla seans gerekebilir; sonuçlar kademeli gelişir. Aktif enfeksiyon, taze bronzluk veya bazı ilaç kullanımları erteleme nedeni olabilir.",
          "Lazer için cilt değerlendirmesi ve kişiselleştirilmiş protokol sunuyoruz. Randevu talebinizi iletin.",
        ],
        {
          title: "Lazer Tedavileri İstanbul | KMA PolyClinic",
          description:
            "Cilt yenileme ve lazer epilasyon. Klinik protokol, cilt tipine uygun plan — KMA PolyClinic.",
        },
      ),
    ],
  },

  en: {
    departments: [
      dept(
        "aesthetics",
        "Aesthetics",
        "Measured medical aesthetics for face and body at Torun Center, Istanbul.",
        1,
        [
          "Our aesthetics department offers non-invasive and minimally invasive care — botox, fillers, laser, and skin treatments — in a calm clinical setting.",
          "Every plan starts with facial analysis and a clear conversation about goals. We aim for balanced, natural-looking results rather than trend-driven extremes.",
          "Aftercare and follow-up are part of the journey. Book via our contact form or WhatsApp for a consultation.",
        ],
      ),
      dept(
        "dermatology",
        "Dermatology",
        "Skin health, medical dermatology, and aesthetic skin therapies.",
        2,
        [
          "Dermatology at KMA addresses acne, pigmentation, sensitivity, ageing signs, and barrier concerns with a clinical mindset.",
          "Plans are personalised after examination and may include laser, peels, injectables, or medical skincare protocols.",
          "We treat aesthetic goals and skin health together — healthy skin underpins lasting refinement.",
        ],
      ),
      dept(
        "dentistry",
        "Dentistry",
        "Aesthetic and restorative dentistry for smile design and oral health.",
        3,
        [
          "Our dental unit provides smile design, whitening, restorative care, and hygiene-focused treatment to modern clinical standards.",
          "The first visit reviews oral health and aesthetic aims so steps are planned transparently.",
          "Comfort and hygiene protocols align with our Quiet Luxury polyclinic approach.",
        ],
      ),
      dept(
        "plastic-surgery",
        "Plastic Surgery",
        "Consultation and planning for surgical aesthetics and reconstructive needs.",
        4,
        [
          "Plastic surgery at KMA covers evaluation and guidance for facial and body surgery as well as reconstructive considerations.",
          "Surgical decisions follow in-person assessment, suitability review, and realistic expectation setting.",
          "Website content is informational only and does not replace individual medical advice.",
        ],
      ),
      dept(
        "hair-transplant",
        "Hair Transplant",
        "Personalised hair restoration focused on natural lines and density.",
        5,
        [
          "Our hair unit designs transplant plans around pattern of loss, donor capacity, and facial proportions.",
          "We explain hairline design, graft distribution, and recovery in clear language before any procedure.",
          "See the Hair Transplant service page for fuller detail, or request an appointment.",
        ],
      ),
      dept(
        "eyebrow-transplant",
        "Eyebrow Transplant",
        "Fuller, balanced brows designed to frame the face with lasting density.",
        6,
        [
          "Eyebrow transplant offers a lasting option for thinning, scars, or shape loss. Design follows your features and expression.",
          "Drawing, graft choice, and density goals are agreed before treatment.",
          "As a priority service, eyebrow transplant has a dedicated treatment page with more detail.",
        ],
      ),
      dept(
        "checkup-laboratory",
        "Check-up & Laboratory",
        "Comprehensive check-up packages and laboratory-supported health screening.",
        7,
        [
          "Check-up & laboratory combines screening panels, blood work, and physician review.",
          "Packages can be adapted by age, symptoms, and risk factors; results are explained clearly.",
          "This department is published primarily with Persian-language support. Use the contact form to book.",
        ],
        true,
      ),
    ],
    priorityServices: [
      svc(
        "eyebrow-transplant",
        "Eyebrow Transplant",
        "Natural density and refined brow framing tailored to your face.",
        [
          "Eyebrow transplant restores sparse or asymmetric brows with permanent grafts. At KMA we design a brow shape that suits your proportions, then place grafts according to that plan.",
          "The journey typically includes consultation and design, local anaesthesia, graft harvest and placement, then aftercare and review. Mild sensitivity and scabbing in the early days are common.",
          "Suitable candidates may include genetic thinning, over-plucking, trauma, or scar-related loss. Final suitability is decided after examination.",
          "Results aim for balanced density and a natural frame. Outcome depends on graft take and aftercare. Contact us to book a consultation.",
        ],
        {
          title: "Eyebrow Transplant Istanbul | KMA PolyClinic",
          description:
            "Natural brow density and face-led design at Torun Center. Personalised plans in a calm polyclinic setting.",
        },
      ),
      svc(
        "hair-transplant",
        "Hair Transplant",
        "Personalised hair restoration for a natural hairline and lasting density.",
        [
          "Hair transplant moves grafts from a donor area to thinning zones for a lasting solution. Planning considers pattern of loss, age, and facial structure.",
          "Consultation covers graft needs, hairline design, and session plan. On treatment day, harvest and placement are performed under local anaesthesia, followed by washing and care guidance.",
          "Results develop gradually over months. Smoking, medications, and systemic conditions may affect suitability.",
          "We offer assessment and planning at our Torun Center polyclinic in Istanbul. Use the form or WhatsApp to request an appointment.",
        ],
        {
          title: "Hair Transplant Istanbul | KMA PolyClinic",
          description:
            "Personalised hair transplant planning: natural hairline, graft strategy, and clinical follow-up at KMA PolyClinic.",
        },
      ),
      svc(
        "botox",
        "Botox",
        "Medical botox to soften fine lines and expression wrinkles.",
        [
          "Botox gently relaxes selected facial muscles to soften forehead lines, frown lines, and crow’s feet while preserving a natural expression.",
          "We map your face before treatment and plan dose and injection points carefully. Sessions are brief; many people return to daily activity the same day.",
          "Effects usually appear within days and last for months depending on metabolism. Pregnancy, breastfeeding, or certain neuromuscular conditions may contraindicate treatment.",
          "A physician decides medical suitability. Book a consultation to discuss aesthetic botox.",
        ],
        {
          title: "Botox Istanbul | KMA PolyClinic",
          description:
            "Expression-preserving botox with measured dosing and clinical follow-up at KMA PolyClinic, Istanbul.",
        },
      ),
      svc(
        "filler",
        "Filler",
        "Medical hyaluronic acid fillers that balance facial contours.",
        [
          "Medical fillers support volume and proportion in areas such as lips, cheeks, chin, nose, and under-eyes. At KMA the goal is refinement that still looks like you.",
          "Consultation reviews anatomy, skin quality, and expectations. Product and volume are chosen by the physician; temporary swelling or bruising can occur.",
          "Longevity varies by product and area. Fillers may suit patients seeking non-surgical contour support.",
          "Suitability is confirmed in person. Reach out for a filler consultation.",
        ],
        {
          title: "Dermal Fillers Istanbul | KMA PolyClinic",
          description:
            "Medical fillers for balanced facial contours. Personalised plans in a discreet Istanbul polyclinic.",
        },
      ),
      svc(
        "laser",
        "Laser",
        "Clinical laser for skin renewal, pigmentation support, and hair reduction.",
        [
          "Our laser protocols address skin renewal, pigmentation, acne-mark support, and unwanted hair reduction using device-based care.",
          "Session spacing considers skin type, indication, and season. Sun protection and moisturising are essential to results.",
          "Multiple sessions are often needed; improvement is gradual. Active infection, fresh tan, or certain medications may require postponement.",
          "We provide skin assessment and personalised laser protocols. Send an appointment request to begin.",
        ],
        {
          title: "Laser Treatments Istanbul | KMA PolyClinic",
          description:
            "Skin renewal and laser hair reduction with clinical protocols tailored to your skin type.",
        },
      ),
    ],
  },

  fa: {
    departments: [
      dept(
        "aesthetics",
        "زیبایی",
        "زیبایی پزشکی سنجیده برای صورت و بدن در تورون سنتر استانبول.",
        1,
        [
          "بخش زیبایی KMA مراقبت‌های غیرتهاجمی و کم‌تهاجمی — بوتاکس، فیلر، لیزر و مراقبت پوست — را در فضایی آرام و کلینیکی ارائه می‌دهد.",
          "هر برنامه با تحلیل صورت و گفت‌وگوی شفاف درباره اهداف آغاز می‌شود. هدف، نتیجه متعادل و طبیعی است نه افراط مدروز.",
          "مراقبت پس از درمان و پیگیری بخشی از مسیر است. برای مشاوره از فرم تماس یا واتساپ استفاده کنید.",
        ],
      ),
      dept(
        "dermatology",
        "پوست",
        "سلامت پوست، درماتولوژی پزشکی و درمان‌های زیبایی پوست.",
        2,
        [
          "بخش پوست به آکنه، لک، حساسیت، نشانه‌های پیری و اختلال سد پوستی با رویکرد پزشکی می‌پردازد.",
          "پس از معاینه، برنامه شخصی‌سازی می‌شود و ممکن است لیزر، لایه‌برداری، تزریق یا پروتکل مراقبت پزشکی را شامل شود.",
          "اهداف زیبایی و سلامت پوست را با هم می‌بینیم — پوست سالم پایه ظرافت ماندگار است.",
        ],
      ),
      dept(
        "dentistry",
        "دندانپزشکی",
        "دندانپزشکی زیبایی و ترمیمی برای طراحی لبخند و سلامت دهان.",
        3,
        [
          "واحد دندانپزشکی طراحی لبخند، سفیدکردن، ترمیم و مراقبت بهداشتی را با استانداردهای مدرن ارائه می‌کند.",
          "در جلسه نخست سلامت دهان و اهداف زیبایی بررسی می‌شود تا مراحل درمان شفاف برنامه‌ریزی شود.",
          "پروتکل‌های راحتی و بهداشت با رویکرد Quiet Luxury پلی‌کلینیک هم‌راستاست.",
        ],
      ),
      dept(
        "plastic-surgery",
        "جراحی پلاستیک",
        "مشاوره و برنامه‌ریزی برای زیبایی جراحی و نیازهای بازسازی.",
        4,
        [
          "جراحی پلاستیک در KMA ارزیابی و راهنمایی برای جراحی صورت و بدن و ملاحظات بازسازی را پوشش می‌دهد.",
          "تصمیم جراحی فقط پس از معاینه حضوری، بررسی تناسب و مدیریت انتظار واقع‌بینانه گرفته می‌شود.",
          "محتوای وب‌سایت صرفاً اطلاع‌رسانی است و جایگزین توصیه پزشکی فردی نیست.",
        ],
      ),
      dept(
        "hair-transplant",
        "کاشت مو",
        "بازسازی مو با تمرکز بر خط طبیعی و تراکم شخصی‌سازی‌شده.",
        5,
        [
          "واحد کاشت مو برنامه را بر اساس الگوی ریزش، ظرفیت دهنده و تناسبات صورت طراحی می‌کند.",
          "طراحی خط مو، توزیع گرافت و روند بهبودی پیش از هر اقدام به‌روشنی توضیح داده می‌شود.",
          "برای جزئیات بیشتر صفحه خدمت کاشت مو را ببینید یا درخواست نوبت دهید.",
        ],
      ),
      dept(
        "eyebrow-transplant",
        "کاشت ابرو",
        "ابروهای پر و متعادل با طراحی هماهنگ با صورت و تراکم ماندگار.",
        6,
        [
          "کاشت ابرو گزینه‌ای ماندگار برای کم‌پشتی، اسکار یا از دست رفتن فرم است. طراحی با ویژگی‌های چهره و حالت بیان هماهنگ می‌شود.",
          "طراحی اولیه، انتخاب گرافت و هدف تراکم پیش از درمان توافق می‌شود.",
          "به‌عنوان درمان اولویت‌دار، صفحه اختصاصی کاشت ابرو جزئیات بیشتری دارد.",
        ],
      ),
      dept(
        "checkup-laboratory",
        "چکاپ و آزمایشگاه",
        "پکیج‌های چکاپ جامع و غربالگری سلامت با پشتیبانی آزمایشگاه.",
        7,
        [
          "واحد چکاپ و آزمایشگاه آزمایش‌های غربالگری، آزمایش خون و ارزیابی پزشک را کنار هم قرار می‌دهد.",
          "پکیج‌ها بر اساس سن، علائم و عوامل خطر قابل تنظیم‌اند؛ نتایج به‌صورت شفاف توضیح داده می‌شوند.",
          "این بخش با پشتیبانی زبان فارسی در اولویت ارائه می‌شود. برای نوبت از فرم تماس استفاده کنید.",
        ],
        true,
      ),
    ],
    priorityServices: [
      svc(
        "eyebrow-transplant",
        "کاشت ابرو",
        "تراکم طبیعی و قاب‌بندی ظریف ابرو متناسب با چهره شما.",
        [
          "کاشت ابرو ابروهای کم‌پشت یا نامتقارن را با گرافت‌های ماندگار تقویت می‌کند. در KMA ابتدا فرم مناسب صورت شما طراحی و سپس گرافت‌ها بر اساس همان طرح کاشته می‌شوند.",
          "مسیر معمولاً شامل مشاوره و طراحی، بی‌حسی موضعی، برداشت و کاشت گرافت، سپس مراقبت و پیگیری است. حساسیت و پوسته‌ریزی خفیف در روزهای نخست شایع است.",
          "نامزدهای مناسب: کم‌پشتی ژنتیکی، برداشت بیش از حد، آسیب یا اسکار. تناسب نهایی پس از معاینه مشخص می‌شود.",
          "هدف، تراکم متعادل و قابی طبیعی است. نتیجه به پذیرش گرافت و رعایت مراقبت بستگی دارد. برای مشاوره تماس بگیرید.",
        ],
        {
          title: "کاشت ابرو استانبول | KMA PolyClinic",
          description:
            "تراکم طبیعی ابرو و طراحی متناسب با صورت در تورون سنتر. برنامه شخصی در فضای آرام پلی‌کلینیک.",
        },
      ),
      svc(
        "hair-transplant",
        "کاشت مو",
        "بازسازی شخصی مو برای خط طبیعی و تراکم ماندگار.",
        [
          "کاشت مو گرافت‌ها را از ناحیه دهنده به نواحی کم‌پشت منتقل می‌کند. برنامه‌ریزی بر اساس الگوی ریزش، سن و ساختار صورت انجام می‌شود.",
          "در مشاوره نیاز گرافت، طراحی خط مو و برنامه جلسه بررسی می‌شود. روز درمان برداشت و کاشت با بی‌حسی موضعی انجام و راهنمای شست‌وشو ارائه می‌گردد.",
          "نتایج طی ماه‌ها به‌تدریج ظاهر می‌شود. سیگار، دارو و بیماری‌های سیستمیک ممکن است تناسب را تحت تأثیر قرار دهد.",
          "ارزیابی و برنامه‌ریزی در پلی‌کلینیک تورون سنتر استانبول. از فرم یا واتساپ نوبت بخواهید.",
        ],
        {
          title: "کاشت مو استانبول | KMA PolyClinic",
          description:
            "برنامه شخصی کاشت مو: خط طبیعی، استراتژی گرافت و پیگیری کلینیکی در KMA PolyClinic.",
        },
      ),
      svc(
        "botox",
        "بوتاکس",
        "بوتاکس پزشکی برای نرم کردن خطوط ظریف و چین‌های بیانی.",
        [
          "بوتاکس عضلات منتخب صورت را به‌صورت کنترل‌شده شل می‌کند تا خطوط پیشانی، بین ابرو و گوشه چشم نرم‌تر دیده شوند و حالت طبیعی حفظ شود.",
          "پیش از درمان صورت نقشه‌برداری می‌شود و دوز و نقاط تزریق با دقت انتخاب می‌گردند. جلسه کوتاه است و اغلب همان روز به فعالیت روزانه بازمی‌گردید.",
          "اثر معمولاً طی چند روز دیده می‌شود و بسته به متابولیسم ماه‌ها دوام دارد. بارداری، شیردهی یا برخی بیماری‌های عصبی‌عضلانی ممکن است منع باشد.",
          "تناسب پزشکی را پزشک تعیین می‌کند. برای مشاوره بوتاکس زیبایی نوبت بگیرید.",
        ],
        {
          title: "بوتاکس استانبول | KMA PolyClinic",
          description:
            "بوتاکس با حفظ حالت بیان، دوز سنجیده و پیگیری کلینیکی در KMA PolyClinic.",
        },
      ),
      svc(
        "filler",
        "فیلر",
        "فیلرهای هیالورونیک اسید پزشکی برای تعادل فرم صورت.",
        [
          "فیلر پزشکی حجم و تناسب را در لب، گونه، چانه، بینی و زیر چشم پشتیبانی می‌کند. هدف KMA ظرافتی است که همچنان شبیه خودتان باشد.",
          "در مشاوره آناتومی، کیفیت پوست و انتظارات بررسی می‌شود. نوع و مقدار را پزشک انتخاب می‌کند؛ تورم یا کبودی موقت ممکن است.",
          "ماندگاری بسته به محصول و ناحیه متفاوت است. فیلر می‌تواند گزینه غیرجراحی برای حمایت از کانتور باشد.",
          "تناسب حضوری تأیید می‌شود. برای مشاوره فیلر با ما در تماس باشید.",
        ],
        {
          title: "فیلر صورت استانبول | KMA PolyClinic",
          description:
            "فیلر پزشکی برای تعادل کانتور صورت. برنامه شخصی در پلی‌کلینیک آرام استانبول.",
        },
      ),
      svc(
        "laser",
        "لیزر",
        "لیزر کلینیکی برای نوزایی پوست، مدیریت لک و کاهش موهای زائد.",
        [
          "پروتکل‌های لیزر ما نوزایی پوست، لک، حمایت از آثار آکنه و کاهش موهای ناخواسته را پوشش می‌دهد.",
          "فاصله جلسات با توجه به نوع پوست، اندیکاسیون و فصل تنظیم می‌شود. ضدآفتاب و رطوبت‌رسانی برای نتیجه ضروری است.",
          "اغلب چند جلسه لازم است؛ پیشرفت تدریجی است. عفونت فعال، برنزه تازه یا برخی داروها ممکن است زمان‌بندی را به تعویق بیندازد.",
          "ارزیابی پوست و پروتکل شخصی لیزر ارائه می‌دهیم. درخواست نوبت ارسال کنید.",
        ],
        {
          title: "درمان لیزر استانبول | KMA PolyClinic",
          description:
            "نوزایی پوست و اپیلاسیون لیزری با پروتکل کلینیکی متناسب با نوع پوست شما.",
        },
      ),
    ],
  },

  ar: {
    departments: [
      dept(
        "aesthetics",
        "التجميل",
        "تجميل طبي متّزن للوجه والجسم في تورون سنتر بإسطنبول.",
        1,
        [
          "يقدّم قسم التجميل رعاية غير جراحية وقليلة التوغل — بوتوكس وفيلر وليزر وعلاجات البشرة — في بيئة سريرية هادئة.",
          "تبدأ كل خطة بتحليل الوجه وحوار واضح حول الأهداف. نسعى لنتائج متوازنة وطبيعية المظهر لا لمبالغات الموضة.",
          "الرعاية اللاحقة والمتابعة جزء من الرحلة. احجز عبر نموذج التواصل أو واتساب للاستشارة.",
        ],
      ),
      dept(
        "dermatology",
        "الأمراض الجلدية",
        "صحة الجلد والجلدية الطبية وعلاجات البشرة التجميلية.",
        2,
        [
          "يعالج قسم الجلدية حب الشباب والتصبغ والحساسية وعلامات التقدم في السن واضطرابات حاجز الجلد بمنظور طبي.",
          "تُخصَّص الخطة بعد الفحص وقد تشمل الليزر أو التقشير أو الحقن أو بروتوكولات العناية الطبية.",
          "نجمع بين الأهداف التجميلية وصحة الجلد — البشرة الصحية أساس الجمال الدائم.",
        ],
      ),
      dept(
        "dentistry",
        "طب الأسنان",
        "طب أسنان تجميلي وترميمي لتصميم الابتسامة وصحة الفم.",
        3,
        [
          "تقدّم وحدة طب الأسنان تصميم الابتسامة والتبييض والترميم والرعاية الوقائية بمعايير حديثة.",
          "تراجع الزيارة الأولى صحة الفم والأهداف التجميلية لتخطيط الخطوات بشفافية.",
          "بروتوكولات الراحة والتعقيم تنسجم مع نهج Quiet Luxury في العيادة متعددة التخصصات.",
        ],
      ),
      dept(
        "plastic-surgery",
        "الجراحة التجميلية",
        "استشارة وتخطيط للتجميل الجراحي واحتياجات إعادة البناء.",
        4,
        [
          "تغطي الجراحة التجميلية في KMA التقييم والإرشاد لجراحة الوجه والجسم والاعتبارات الترميمية.",
          "تُتَّخذ القرارات الجراحية بعد تقييم حضوري ومراجعة الملاءمة ووضع توقعات واقعية.",
          "محتوى الموقع إعلامي فقط ولا يغني عن المشورة الطبية الفردية.",
        ],
      ),
      dept(
        "hair-transplant",
        "زراعة الشعر",
        "استعادة شعر مخصصة تركز على الخط الطبيعي والكثافة.",
        5,
        [
          "تصمّم وحدة زراعة الشعر الخطط وفق نمط التساقط وسعة المنطقة المانحة وتناسبات الوجه.",
          "نوضح تصميم خط الشعر وتوزيع الطعوم والتعافي بلغة واضحة قبل أي إجراء.",
          "اطلع على صفحة خدمة زراعة الشعر لمزيد من التفاصيل أو اطلب موعدًا.",
        ],
      ),
      dept(
        "eyebrow-transplant",
        "زراعة الحواجب",
        "حواجب ممتلئة ومتوازنة بتصميم يُؤطّر الوجه وكثافة تدوم.",
        6,
        [
          "تقدّم زراعة الحواجب خيارًا دائمًا للترقق أو الندوب أو فقدان الشكل. يتبع التصميم ملامحك وتعبيرك.",
          "يُتَّفق على الرسم واختيار الطعوم وأهداف الكثافة قبل العلاج.",
          "كخدمة ذات أولوية، لزراعة الحواجب صفحة علاج مخصصة بمزيد من التفاصيل.",
        ],
      ),
      dept(
        "checkup-laboratory",
        "الفحص المخبري",
        "باقات فحص شامل وفحوصات مخبرية لدعم الصحة.",
        7,
        [
          "يجمع قسم الفحص والمختبر لوحات الفحص وتحاليل الدم ومراجعة الطبيب.",
          "يمكن تكييف الباقات حسب العمر والأعراض وعوامل الخطر؛ وتُشرح النتائج بوضوح.",
          "يُنشر هذا القسم أساسًا مع دعم اللغة الفارسية. استخدم نموذج التواصل للحجز.",
        ],
        true,
      ),
    ],
    priorityServices: [
      svc(
        "eyebrow-transplant",
        "زراعة الحواجب",
        "كثافة طبيعية وإطار دقيق للحواجب يناسب وجهك.",
        [
          "تعيد زراعة الحواجب الكثافة للحواجب المتفرقة أو غير المتناسقة بطعوم دائمة. في KMA نصمّم شكلًا يناسب نسب وجهك ثم نزرع وفق ذلك المخطط.",
          "تشمل الرحلة عادة الاستشارة والتصميم، والتخدير الموضعي، وحصاد الطعوم وزرعها، ثم الرعاية والمتابعة. الحساسية الخفيفة والتقشّر في الأيام الأولى شائعان.",
          "قد يناسب الترقق الوراثي أو النتف المفرط أو الإصابات أو الندوب. تُحدَّد الملاءمة بعد الفحص.",
          "الهدف كثافة متوازنة وإطار طبيعي. تعتمد النتيجة على ثبات الطعوم والالتزام بالرعاية. تواصل معنا للحجز.",
        ],
        {
          title: "زراعة الحواجب إسطنبول | KMA PolyClinic",
          description:
            "كثافة طبيعية للحواجب وتصميم موجه بالوجه في تورون سنتر. خطط شخصية في عيادة هادئة.",
        },
      ),
      svc(
        "hair-transplant",
        "زراعة الشعر",
        "استعادة شعر مخصصة لخط طبيعي وكثافة تدوم.",
        [
          "تنقل زراعة الشعر الطعوم من المنطقة المانحة إلى مناطق الترقق كحل دائم. يراعي التخطيط نمط التساقط والعمر وبنية الوجه.",
          "تغطي الاستشارة احتياج الطعوم وتصميم خط الشعر وخطة الجلسة. في يوم العلاج يتم الحصاد والزرع تحت تخدير موضعي مع إرشادات الغسيل والرعاية.",
          "تتطور النتائج تدريجيًا على مدى أشهر. قد يؤثر التدخين والأدوية والحالات الجهازية على الملاءمة.",
          "نقدّم التقييم والتخطيط في عيادة تورون سنتر بإسطنبول. اطلب موعدًا عبر النموذج أو واتساب.",
        ],
        {
          title: "زراعة الشعر إسطنبول | KMA PolyClinic",
          description:
            "تخطيط شخصي لزراعة الشعر: خط طبيعي واستراتيجية طعوم ومتابعة سريرية في KMA PolyClinic.",
        },
      ),
      svc(
        "botox",
        "البوتوكس",
        "بوتوكس طبي لتخفيف الخطوط الدقيقة وتجاعيد التعبير.",
        [
          "يرخي البوتوكس عضلات محددة بلطف لتخفيف خطوط الجبهة وبين الحاجبين وخطوط العين مع الحفاظ على تعبير طبيعي.",
          "نرسم خريطة الوجه قبل العلاج ونخطط الجرعة ونقاط الحقن بعناية. الجلسة قصيرة وكثيرون يعودون لنشاطهم في اليوم نفسه.",
          "تظهر الآثار عادة خلال أيام وتدوم أشهرًا بحسب الأيض. قد تُمنع أثناء الحمل أو الرضاعة أو بعض الحالات العصبية العضلية.",
          "يقرر الطبيب الملاءمة الطبية. احجز استشارة لمناقشة البوتوكس التجميلي.",
        ],
        {
          title: "البوتوكس إسطنبول | KMA PolyClinic",
          description:
            "بوتوكس يحافظ على التعبير بجرعات مدروسة ومتابعة سريرية في KMA PolyClinic.",
        },
      ),
      svc(
        "filler",
        "الفيلر",
        "فيلر حمض الهيالورونيك الطبي لموازنة ملامح الوجه.",
        [
          "يدعم الفيلر الطبي الحجم والتناسب في الشفاه والخدود والذقن والأنف وتحت العين. الهدف في KMA تحسين يبدو كأنه أنت.",
          "تراجع الاستشارة التشريح وجودة الجلد والتوقعات. يختار الطبيب المنتج والحجم؛ قد يحدث تورم أو كدمات مؤقتة.",
          "تختلف مدة النتيجة حسب المنتج والمنطقة. قد يناسب الفيلر من يبحث عن دعم كفاف دون جراحة.",
          "تُؤكَّد الملاءمة حضوريًا. تواصل لاستشارة الفيلر.",
        ],
        {
          title: "فيلر الوجه إسطنبول | KMA PolyClinic",
          description:
            "فيلر طبي لتوازن ملامح الوجه. خطط شخصية في عيادة متعددة التخصصات بإسطنبول.",
        },
      ),
      svc(
        "laser",
        "الليزر",
        "ليزر سريري لتجديد البشرة ودعم التصبغ وتقليل الشعر غير المرغوب.",
        [
          "تغطي بروتوكولات الليزر تجديد البشرة والتصبغ ودعم آثار حب الشباب وتقليل الشعر غير المرغوب.",
          "يراعي تباعد الجلسات نوع البشرة والاستطباب والموسم. الحماية من الشمس والترطيب أساسيان للنتيجة.",
          "غالبًا يلزم عدة جلسات؛ التحسن تدريجي. قد يؤجَّل العلاج عند العدوى النشطة أو السمرة الحديثة أو بعض الأدوية.",
          "نقدّم تقييم البشرة وبروتوكول ليزر مخصص. أرسل طلب موعد للبدء.",
        ],
        {
          title: "علاجات الليزر إسطنبول | KMA PolyClinic",
          description:
            "تجديد البشرة وإزالة الشعر بالليزر ببروتوكولات سريرية مناسبة لنوع بشرتك.",
        },
      ),
    ],
  },
};

function isAppLocale(locale: string): locale is AppLocale {
  return locale === "tr" || locale === "en" || locale === "fa" || locale === "ar";
}

function mvpDepartmentsFor(locale: string): MvpDepartment[] {
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].departments.filter((d) => !d.faOnly || locale === "fa");
}

function mvpServicesFor(locale: string): MvpService[] {
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].priorityServices;
}

export async function getDepartmentsForLocale(locale: string) {
  const fromSanity = await getDepartments(locale);
  if (fromSanity.length > 0) return fromSanity;
  return mvpDepartmentsFor(locale);
}

export async function getPriorityServicesForLocale(locale: string) {
  const fromSanity = await getPriorityServices(locale);
  if (fromSanity.length > 0) return fromSanity;
  return mvpServicesFor(locale);
}

export async function getDepartmentBySlugForLocale(locale: string, slug: string) {
  const fromSanity = await getDepartmentBySlug(locale, slug);
  if (fromSanity) {
    const cms = fromSanity as MvpDepartment;
    // Prefer CMS body when present; otherwise fill from MVP so detail pages stay complete.
    if (cms.body && blocksHasText(cms.body)) return cms;
    const key = isAppLocale(locale) ? locale : "tr";
    const mvp = mvpContent[key].departments.find((d) => d.slug === slug);
    return mvp ? { ...cms, body: mvp.body, summary: cms.summary || mvp.summary } : cms;
  }
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].departments.find((d) => d.slug === slug) ?? null;
}

export async function getServiceBySlugForLocale(locale: string, slug: string) {
  const fromSanity = await getServiceBySlug(locale, slug);
  if (fromSanity) {
    const cms = fromSanity as MvpService;
    if (cms.body && blocksHasText(cms.body)) return cms;
    const key = isAppLocale(locale) ? locale : "tr";
    const mvp = mvpContent[key].priorityServices.find((s) => s.slug === slug);
    return mvp
      ? {
          ...cms,
          body: mvp.body,
          summary: cms.summary || mvp.summary,
          seoTitle: cms.seoTitle || mvp.seoTitle,
          seoDescription: cms.seoDescription || mvp.seoDescription,
        }
      : cms;
  }
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].priorityServices.find((s) => s.slug === slug) ?? null;
}

function blocksHasText(body: unknown): boolean {
  if (!Array.isArray(body) || body.length === 0) return false;
  return body.some((block) => {
    if (!block || typeof block !== "object") return false;
    const children = (block as { children?: { text?: string }[] }).children;
    if (!Array.isArray(children)) return false;
    return children.some((c) => (c?.text ?? "").trim().length > 0);
  });
}

export { getMvpLegal } from "@/lib/mvp-legal";
export type { LegalKey, MvpLegalPage, MvpLegalSection } from "@/lib/mvp-legal";
