import type { AppLocale } from "@/lib/whatsapp";

export type MeasurementSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type MeasurementPage = {
  title: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  sections: MeasurementSection[];
  checklistHeading: string;
  checklist: string[];
  kmaHeading: string;
  kmaParagraphs: string[];
  kmaBullets: string[];
  linksHeading: string;
  links: Array<{ label: string; href: string }>;
};

const metaLinks = [
  {
    label: "About standard and custom website events",
    href: "https://www.facebook.com/business/help/402791146561655",
  },
  {
    label: "About deduplication for Meta Pixel and Conversions API events",
    href: "https://www.facebook.com/business/help/823677331451951",
  },
  {
    label: "About Meta Events Manager",
    href: "https://www.facebook.com/business/help/236004767064292",
  },
  {
    label: "Conversions API parameters (developers)",
    href: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameters",
  },
];

const en: MeasurementPage = {
  title: "Meta event tracking & deduplication",
  lead:
    "Meta’s event tracking ecosystem helps measure, optimize, and understand actions on websites and apps. This page explains how KMA PolyClinic uses the Meta Pixel (browser) and the Conversions API (server) together — and how event deduplication keeps reporting accurate.",
  seoTitle: "Meta Pixel & Conversions API Deduplication | KMA PolyClinic",
  seoDescription:
    "How KMA PolyClinic deduplicates Meta Pixel and Conversions API events with event_name and event_id for accurate conversion measurement.",
  sections: [
    {
      id: "journey",
      heading: "Event setup: guided journey",
      paragraphs: [
        "Meta documents a typical path for website measurement: understand standard and custom events, implement Pixel and/or Conversions API, configure deduplication when both fire the same event, then monitor quality in Meta Events Manager.",
      ],
      bullets: [
        "About standard and custom website events — which actions you can measure",
        "About deduplication for Meta Pixel and Conversions API — this topic",
        "About Meta Events Manager — testing, debugging, and quality",
      ],
    },
    {
      id: "why",
      heading: "Why deduplication matters",
      paragraphs: [
        "Deduplication ensures that the same real-world action, when sent from both the browser Pixel and the server Conversions API, is counted only once. That accuracy supports conversion rate, return on ad spend (ROAS), and attribution.",
        "Without deduplication, conversion numbers can look artificially high, which misleads optimization and budget decisions.",
      ],
    },
    {
      id: "sources",
      heading: "Meta Pixel vs Conversions API",
      paragraphs: [
        "Meta Pixel is a browser-based tool that tracks actions on the website (for example page views, content views, or form submissions).",
        "The Conversions API is a server-side method that sends web events from your server to Meta, improving reliability and completeness when browsers block or drop Pixel data.",
      ],
      bullets: [
        "Pixel depends on the browser and can be limited by settings, connectivity, or blockers.",
        "Conversions API sends from the server and is more resilient to those browser limits.",
      ],
    },
    {
      id: "when",
      heading: "When to deduplicate",
      paragraphs: [
        "Deduplication is required when the same event (for example Purchase or Schedule) is shared from both browser and server so lost browser events can be recovered without double counting.",
        "Deduplication is not required when you intentionally send different events from each source (for example AddToCart only in the browser and Purchase only on the server).",
      ],
    },
    {
      id: "logic",
      heading: "Deduplication conditions and logic",
      paragraphs: [
        "For Meta to deduplicate matching browser and server events, these conditions apply:",
      ],
      bullets: [
        "event_name must match (e.g. ViewContent, Schedule).",
        "event_id must be identical on Pixel and Conversions API for that action.",
        "Alternatively, matching can use event_name with external_id or fbp when applicable.",
        "If similar server and Pixel events arrive, Meta prefers the event received first.",
        "Deduplication also applies to redundant Pixel-only or server-only duplicates with the same identifiers.",
      ],
    },
    {
      id: "strategy",
      heading: "Event sharing strategies",
      paragraphs: [
        "Option 1 — Different events from browser and server: no deduplication needed.",
        "Option 2 — Same events from browser and server (recommended for recovery of blocked Pixel hits): implement deduplication with shared event_name and event_id.",
        "Decision: if you send the same event from both sources, implement deduplication; otherwise it is not required.",
      ],
    },
    {
      id: "technical",
      heading: "Technical setup parameters",
      paragraphs: [
        "Add event_name for every event instance. Add a unique event_id per real user action and pass the same value to Pixel and Conversions API. Optionally include external_id and fbp for additional matching.",
        "Website Conversions API events also require action_source (website), event_source_url, and client_user_agent for quality. Customer information such as hashed email and phone can improve Event Match Quality when lawfully available.",
      ],
    },
    {
      id: "monitor",
      heading: "Monitoring in Meta Events Manager",
      paragraphs: [
        "Events Manager shows received events, sources (browser vs server), and deduplication status. Use Test Events to verify which events are received, deduplicated, or dropped.",
        "Common issues include mismatched or missing event_id, delays between browser and server delivery, and incorrect parameter names or values. Pixel Helper and Events Manager tools help diagnose firing and parameters.",
      ],
    },
  ],
  checklistHeading: "Summary checklist",
  checklist: [
    "Decide strategy: different events vs same events from Pixel and CAPI",
    "Add event_name and event_id to all dual-sent events",
    "Add external_id and/or fbp when available",
    "Implement via partner integration or manual code",
    "Test with Meta Events Manager Test Events",
    "Monitor deduplication and troubleshoot regularly",
  ],
  kmaHeading: "How KMA PolyClinic implements this",
  kmaParagraphs: [
    "We use Option 2 for key website actions: the same standard event is sent from the Meta Pixel and the Conversions API with a shared event_id so Meta can deduplicate and keep reporting accurate.",
    "Customer information used for match quality (for example email or phone after an appointment request) is hashed on the server where required by Meta. Facebook Login ID is sent unhashed only when available.",
  ],
  kmaBullets: [
    "PageView — browser Pixel + server CAPI with the same event_id",
    "ViewContent — service and department pages (Pixel + CAPI, shared event_id)",
    "Schedule / Lead — appointment form (Pixel + server CAPI; Schedule uses the form event_id on both sides)",
    "Contact / FindLocation — phone, email, and map interactions when tracked",
    "Meta Parameter Builder (client JS + Node) manages fbc/fbp cookies, client IP, and single-pass PII normalize+hash for EMQ",
    "fbp / fbc cookies and optional external_id support additional matching",
  ],
  linksHeading: "Meta documentation",
  links: metaLinks,
};

const tr: MeasurementPage = {
  title: "Meta olay takibi ve tekilleştirme (deduplication)",
  lead:
    "Meta’nın olay takip ekosistemi web sitesi ve uygulamalardaki eylemleri ölçmeye, optimize etmeye ve anlamaya yardımcı olur. Bu sayfa KMA PolyClinic’in Meta Pixel (tarayıcı) ile Conversions API (sunucu) kullanımını ve aynı olayın yalnızca bir kez sayılmasını sağlayan tekilleştirmeyi açıklar.",
  seoTitle: "Meta Pixel ve Conversions API Tekilleştirme | KMA PolyClinic",
  seoDescription:
    "KMA PolyClinic’te Meta Pixel ve Conversions API olaylarının event_name ve event_id ile tekilleştirilmesi ve doğru dönüşüm ölçümü.",
  sections: [
    {
      id: "journey",
      heading: "Olay kurulumu: yol haritası",
      paragraphs: [
        "Meta’nın önerdiği yol: standart ve özel olayları anlamak, Pixel ve/veya Conversions API kurmak, aynı olay her iki kaynaktan gidiyorsa tekilleştirme yapmak, ardından Events Manager ile kaliteyi izlemektir.",
      ],
      bullets: [
        "Standart ve özel web olayları hakkında",
        "Meta Pixel ve Conversions API için tekilleştirme (bu konu)",
        "Meta Events Manager hakkında — test ve hata ayıklama",
      ],
    },
    {
      id: "why",
      heading: "Tekilleştirme neden önemli?",
      paragraphs: [
        "Tekilleştirme, aynı gerçek eylemin hem tarayıcıdan hem sunucudan gönderildiğinde raporlamada yalnızca bir kez sayılmasını sağlar. Bu; dönüşüm oranı, ROAS ve atıf doğruluğunu korur.",
        "Tekilleştirme olmadan dönüşüm sayıları şişebilir; optimizasyon ve bütçe kararları yanıltıcı hale gelebilir.",
      ],
    },
    {
      id: "sources",
      heading: "Meta Pixel ve Conversions API",
      paragraphs: [
        "Meta Pixel tarayıcıda çalışır ve sitedeki eylemleri izler (sayfa görüntüleme, içerik görüntüleme, form gönderimi vb.).",
        "Conversions API olayları sunucudan Meta’ya iletir; tarayıcı engellerine karşı daha dayanıklıdır.",
      ],
      bullets: [
        "Pixel tarayıcı ayarları veya engelleyicilerden etkilenebilir.",
        "Conversions API sunucu kaynaklıdır ve veri bütünlüğünü artırır.",
      ],
    },
    {
      id: "when",
      heading: "Ne zaman tekilleştirme gerekir?",
      paragraphs: [
        "Aynı olay hem tarayıcıdan hem sunucudan gönderiliyorsa (ör. Schedule) tekilleştirme gerekir.",
        "Kaynaklar farklı olaylar gönderiyorsa (ör. yalnızca tarayıcıda bir olay, sunucuda başka bir olay) tekilleştirme gerekmez.",
      ],
    },
    {
      id: "logic",
      heading: "Tekilleştirme koşulları",
      paragraphs: ["Meta’nın olayları tekilleştirmesi için:"],
      bullets: [
        "event_name her iki kaynakta aynı olmalı",
        "event_id aynı kullanıcı eylemi için birebir aynı olmalı",
        "Alternatif olarak event_name ile external_id veya fbp eşleşmesi de kullanılabilir",
        "Benzer olaylarda Meta genelde ilk gelen olayı tercih eder",
      ],
    },
    {
      id: "strategy",
      heading: "Olay paylaşım stratejileri",
      paragraphs: [
        "Seçenek 1: Tarayıcı ve sunucudan farklı olaylar — tekilleştirme gerekmez.",
        "Seçenek 2: Aynı olaylar her iki kaynaktan (kayıp Pixel verisini telafi için) — event_id ile tekilleştirme zorunlu.",
      ],
    },
    {
      id: "technical",
      heading: "Teknik parametreler",
      paragraphs: [
        "Her olaya event_name ekleyin. Her gerçek eylem için benzersiz event_id üretin ve Pixel ile CAPI’ye aynı değeri verin. Gerekirse external_id ve fbp ekleyin.",
        "Web CAPI olaylarında action_source=website, event_source_url ve client_user_agent kalite için önemlidir. Yasaya uygun şekilde e-posta ve telefon (hash’lenmiş) Event Match Quality’yi iyileştirebilir.",
      ],
    },
    {
      id: "monitor",
      heading: "Events Manager ile izleme",
      paragraphs: [
        "Events Manager alınan olayları, kaynakları ve tekilleştirme durumunu gösterir. Test Olayları aracı ile hangi olayların alındığını, tekilleştirildiğini veya düşürüldüğünü doğrulayın.",
        "Yaygın sorunlar: eksik/uyumsuz event_id, tarayıcı–sunucu gecikmesi, hatalı parametre adları.",
      ],
    },
  ],
  checklistHeading: "Özet kontrol listesi",
  checklist: [
    "Stratejiyi seçin: farklı olaylar mı, aynı olaylar mı?",
    "Çift gönderilen tüm olaylara event_name ve event_id ekleyin",
    "Mümkünse external_id ve fbp ekleyin",
    "Partner entegrasyonu veya manuel kod ile uygulayın",
    "Meta Events Manager Test Olayları ile test edin",
    "Tekilleştirmeyi düzenli izleyin ve sorun giderin",
  ],
  kmaHeading: "KMA PolyClinic uygulaması",
  kmaParagraphs: [
    "Kritik web eylemlerinde Seçenek 2’yi kullanıyoruz: aynı standart olay Meta Pixel ve Conversions API’ye ortak event_id ile gider; Meta tekilleştirerek raporu doğru tutar.",
    "Eşleşme kalitesi için randevu sonrası e-posta/telefon gibi alanlar sunucuda Meta kurallarına göre hash’lenir. Facebook Login ID yalnızca mevcutsa ve hash’siz gönderilir.",
  ],
  kmaBullets: [
    "PageView — Pixel + CAPI, aynı event_id",
    "ViewContent — hizmet/bölüm sayfaları, ortak event_id",
    "Schedule / Lead — randevu formu; Schedule form event_id’si ile",
    "Contact / FindLocation — izlenen etkileşimler",
    "fbp / fbc ve isteğe bağlı external_id ek eşleşme için",
  ],
  linksHeading: "Meta dokümantasyonu",
  links: metaLinks,
};

const fa: MeasurementPage = {
  title: "ردیابی رویداد متا و حذف تکرار (deduplication)",
  lead:
    "اکوسیستم ردیابی رویداد متا به اندازه‌گیری، بهینه‌سازی و درک اقدامات کاربران در وب‌سایت و اپ کمک می‌کند. این صفحه توضیح می‌دهد که KMA PolyClinic چگونه Meta Pixel (مرورگر) و Conversions API (سرور) را با هم به‌کار می‌برد و حذف تکرار چگونه از شمارش دوباره جلوگیری می‌کند.",
  seoTitle: "حذف تکرار Meta Pixel و Conversions API | KMA PolyClinic",
  seoDescription:
    "نحوه حذف تکرار رویدادهای Meta Pixel و Conversions API در KMA PolyClinic با event_name و event_id برای گزارش تبدیل دقیق.",
  sections: [
    {
      id: "journey",
      heading: "مسیر راه‌اندازی رویداد",
      paragraphs: [
        "مسیر پیشنهادی متا: شناخت رویدادهای استاندارد و سفارشی، پیاده‌سازی Pixel و/یا Conversions API، حذف تکرار هنگام ارسال همان رویداد از هر دو منبع، و پایش در Events Manager.",
      ],
    },
    {
      id: "why",
      heading: "چرا حذف تکرار مهم است؟",
      paragraphs: [
        "حذف تکرار تضمین می‌کند همان اقدام واقعی فقط یک‌بار در گزارش شمرده شود. این موضوع روی نرخ تبدیل، ROAS و attribution اثر مستقیم دارد.",
        "بدون حذف تکرار، اعداد تبدیل ممکن است مصنوعی بالا برود و تصمیم‌های بودجه را منحرف کند.",
      ],
    },
    {
      id: "sources",
      heading: "Pixel در برابر Conversions API",
      paragraphs: [
        "Meta Pixel مبتنی بر مرورگر است. Conversions API رویداد را از سرور به متا می‌فرستد و در برابر محدودیت‌های مرورگر مقاوم‌تر است.",
      ],
    },
    {
      id: "logic",
      heading: "شرایط حذف تکرار",
      paragraphs: ["برای حذف تکرار باید:"],
      bullets: [
        "event_name یکسان باشد",
        "event_id برای همان اقدام یکسان باشد",
        "در صورت نیاز event_name همراه external_id یا fbp",
      ],
    },
    {
      id: "strategy",
      heading: "استراتژی اشتراک رویداد",
      paragraphs: [
        "گزینه ۱: رویدادهای متفاوت از مرورگر و سرور — حذف تکرار لازم نیست.",
        "گزینه ۲: همان رویداد از هر دو منبع — حذف تکرار با event_id لازم است.",
      ],
    },
    {
      id: "monitor",
      heading: "پایش در Events Manager",
      paragraphs: [
        "Events Manager منبع رویداد و وضعیت حذف تکرار را نشان می‌دهد. با ابزار Test Events صحت دریافت و dedupe را بررسی کنید.",
      ],
    },
  ],
  checklistHeading: "چک‌لیست خلاصه",
  checklist: [
    "استراتژی را مشخص کنید",
    "event_name و event_id را اضافه کنید",
    "در صورت امکان external_id و fbp",
    "با Test Events آزمایش کنید",
    "به‌طور منظم پایش کنید",
  ],
  kmaHeading: "پیاده‌سازی در KMA PolyClinic",
  kmaParagraphs: [
    "برای اقدامات کلیدی وب گزینه ۲ را به‌کار می‌بریم: همان رویداد استاندارد با event_id مشترک از Pixel و CAPI ارسال می‌شود.",
  ],
  kmaBullets: [
    "PageView، ViewContent، Schedule/Lead با event_id مشترک",
    "fbp/fbc و external_id در صورت وجود",
    "ایمیل/تلفن هش‌شده برای کیفیت تطبیق پس از فرم نوبت",
  ],
  linksHeading: "مستندات متا",
  links: metaLinks,
};

const ar: MeasurementPage = {
  title: "تتبع أحداث Meta وإزالة التكرار (deduplication)",
  lead:
    "يساعد نظام تتبع الأحداث من Meta على قياس إجراءات المستخدمين وتحسينها. توضح هذه الصفحة كيف تستخدم KMA PolyClinic Meta Pixel (المتصفح) وConversions API (الخادم) معًا، وكيف تمنع إزالة التكرار العدّ المزدوج.",
  seoTitle: "إزالة تكرار Meta Pixel وConversions API | KMA PolyClinic",
  seoDescription:
    "كيف تزيل KMA PolyClinic تكرار أحداث Meta Pixel وConversions API باستخدام event_name وevent_id لقياس تحويلات أدق.",
  sections: [
    {
      id: "journey",
      heading: "مسار إعداد الأحداث",
      paragraphs: [
        "يشمل المسار فهم الأحداث القياسية والمخصصة، وتنفيذ Pixel و/أو Conversions API، وإزالة التكرار عند إرسال نفس الحدث من المصدرين، ثم المراقبة في Events Manager.",
      ],
    },
    {
      id: "why",
      heading: "لماذا تهم إزالة التكرار؟",
      paragraphs: [
        "تضمن إزالة التكرار احتساب الإجراء الحقيقي مرة واحدة فقط. يؤثر ذلك على معدل التحويل وROAS والإسناد.",
        "بدونها قد ترتفع أرقام التحويل بشكل مصطنع وتضلل قرارات الميزانية.",
      ],
    },
    {
      id: "sources",
      heading: "Pixel مقابل Conversions API",
      paragraphs: [
        "Pixel يعمل في المتصفح. Conversions API يرسل من الخادم ويكون أكثر مقاومة لقيود المتصفح وحاصرات الإعلانات.",
      ],
    },
    {
      id: "logic",
      heading: "شروط إزالة التكرار",
      paragraphs: ["لكي يزيل Meta التكرار:"],
      bullets: [
        "يجب تطابق event_name",
        "يجب تطابق event_id لنفس الإجراء",
        "أو event_name مع external_id أو fbp عند الحاجة",
      ],
    },
    {
      id: "strategy",
      heading: "استراتيجيات مشاركة الأحداث",
      paragraphs: [
        "الخيار 1: أحداث مختلفة من المتصفح والخادم — لا حاجة لإزالة التكرار.",
        "الخيار 2: نفس الأحداث من المصدرين — إزالة التكرار بـ event_id مطلوبة.",
      ],
    },
    {
      id: "monitor",
      heading: "المراقبة في Events Manager",
      paragraphs: [
        "يعرض Events Manager المصادر وحالة إزالة التكرار. استخدم Test Events للتحقق من الاستلام والـ dedupe.",
      ],
    },
  ],
  checklistHeading: "قائمة تحقق",
  checklist: [
    "اختر الاستراتيجية",
    "أضف event_name وevent_id",
    "أضف external_id وfbp إن أمكن",
    "اختبر عبر Test Events",
    "راقب بانتظام",
  ],
  kmaHeading: "تطبيق KMA PolyClinic",
  kmaParagraphs: [
    "نستخدم الخيار 2 للإجراءات الرئيسية: نفس الحدث القياسي يُرسل من Pixel وCAPI بـ event_id مشترك.",
  ],
  kmaBullets: [
    "PageView وViewContent وSchedule/Lead بـ event_id مشترك",
    "fbp/fbc وexternal_id عند التوفر",
    "بريد/هاتف مُجزّأ (hash) لجودة المطابقة بعد نموذج الموعد",
  ],
  linksHeading: "وثائق Meta",
  links: metaLinks,
};

const pages: Record<AppLocale, MeasurementPage> = { en, tr, fa, ar };

export function getMeasurementPage(locale: string): MeasurementPage {
  if (locale === "tr" || locale === "en" || locale === "fa" || locale === "ar") {
    return pages[locale];
  }
  return pages.en;
}
