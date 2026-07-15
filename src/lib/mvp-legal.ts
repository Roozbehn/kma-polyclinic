import type { AppLocale } from "@/lib/whatsapp";
import { NAP } from "@/lib/nap";

export type LegalKey = "privacy" | "terms";

export interface MvpLegalSection {
  heading: string;
  paragraphs: string[];
}

export interface MvpLegalPage {
  title: string;
  sections: MvpLegalSection[];
}

type LegalBundle = Record<LegalKey, MvpLegalPage>;

const controllerLine = {
  tr: `Veri sorumlusu: KMA PolyClinic. Adres: ${NAP.streetAddress}, ${NAP.addressLocality}, ${NAP.addressCountry}. E-posta: ${NAP.email}.`,
  en: `Data controller: KMA PolyClinic. Address: ${NAP.streetAddress}, ${NAP.addressLocality}, ${NAP.addressCountry}. Email: ${NAP.email}.`,
  fa: `کنترل‌کننده داده: KMA PolyClinic. نشانی: ${NAP.streetAddress}، ${NAP.addressLocality}، ${NAP.addressCountry}. ایمیل: ${NAP.email}.`,
  ar: `المتحكم بالبيانات: KMA PolyClinic. العنوان: ${NAP.streetAddress}، ${NAP.addressLocality}، ${NAP.addressCountry}. البريد: ${NAP.email}.`,
} as const;

const mvpLegal: Record<AppLocale, LegalBundle> = {
  tr: {
    privacy: {
      title: "Gizlilik Politikası",
      sections: [
        {
          heading: "Kapsam",
          paragraphs: [
            "Bu gizlilik politikası, KMA PolyClinic web sitesini ziyaret ettiğinizde veya randevu / iletişim formları üzerinden bizimle iletişime geçtiğinizde kişisel verilerinizin nasıl işlendiğini açıklar.",
            controllerLine.tr,
          ],
        },
        {
          heading: "Topladığımız veriler",
          paragraphs: [
            "Adınız, telefon numaranız, isteğe bağlı e-posta adresiniz, tercih ettiğiniz bölüm ve mesajınız gibi form alanlarında paylaştığınız bilgileri işleyebiliriz. Ayrıca site güvenliği için teknik günlükler (IP, tarayıcı türü, zaman damgası) sınırlı süreyle tutulabilir.",
          ],
        },
        {
          heading: "Amaç ve dayanak",
          paragraphs: [
            "Veriler; randevu taleplerini yanıtlamak, klinik hizmetlerimiz hakkında bilgilendirmek ve yasal yükümlülüklerimizi yerine getirmek için işlenir. İletişim talepleriniz için hukuki dayanak, sözleşmenin kurulması öncesi adımlar ve meşru menfaattir.",
          ],
        },
        {
          heading: "Paylaşım ve saklama",
          paragraphs: [
            "Verileriniz, hizmet sağlayıcılarımız (ör. e-posta iletimi, barındırma) dışında üçüncü taraflarla satılmaz veya pazarlama amacıyla paylaşılmaz. Talebinizi yanıtlamak için gerekli süre boyunca ve yürürlükteki saklama yükümlülükleri çerçevesinde muhafaza edilir.",
          ],
        },
        {
          heading: "Haklarınız",
          paragraphs: [
            `KVKK kapsamındaki erişim, düzeltme, silme ve itiraz haklarınızı ${NAP.email} adresine yazarak kullanabilirsiniz. Politika güncellenirken web sitesindeki bu sayfa esas alınır.`,
          ],
        },
      ],
    },
    terms: {
      title: "Kullanım Koşulları",
      sections: [
        {
          heading: "Site kullanımı",
          paragraphs: [
            "kmapolyclinic.com.tr ve ilişkili sayfalar KMA PolyClinic tarafından bilgilendirme amacıyla sunulur. Site içeriği tıbbi teşhis veya bireysel tedavi tavsiyesi yerine geçmez; klinik kararlar yalnızca yüz yüze değerlendirme sonrası verilir.",
            controllerLine.tr,
          ],
        },
        {
          heading: "Randevu ve iletişim",
          paragraphs: [
            "Online form veya WhatsApp üzerinden iletilen talepler randevu garantisi oluşturmaz. Onay, müsaitlik ve klinik uygunluk klinik ekibimiz tarafından ayrıca doğrulanır.",
          ],
        },
        {
          heading: "Fikri mülkiyet",
          paragraphs: [
            "Sitedeki marka, metin, görseller ve düzen KMA PolyClinic’e aittir. İzinsiz kopyalama, yeniden yayınlama veya ticari kullanım yasaktır.",
          ],
        },
        {
          heading: "Sorumluluk sınırı",
          paragraphs: [
            "Web sitesinin kesintisiz veya hatasız olacağını garanti etmeyiz. Basit dikkatsizlikten kaynaklanan dolaylı zararlardan sorumlu tutulmayız. Zorunlu tüketici hukuku hakları saklıdır.",
          ],
        },
        {
          heading: "Uygulanacak hukuk",
          paragraphs: [
            `Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Sorularınız için ${NAP.email} üzerinden bize ulaşabilirsiniz.`,
          ],
        },
      ],
    },
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Scope",
          paragraphs: [
            "This privacy policy explains how KMA PolyClinic processes personal data when you visit our website or contact us through appointment or contact forms.",
            controllerLine.en,
          ],
        },
        {
          heading: "Data we collect",
          paragraphs: [
            "We may process information you share in form fields such as your name, phone number, optional email, preferred department, and message. Limited technical logs (IP, browser type, timestamp) may be kept briefly for security.",
          ],
        },
        {
          heading: "Purpose and legal basis",
          paragraphs: [
            "Data is processed to respond to appointment requests, inform you about our clinical services, and meet legal obligations. For contact requests, the basis is steps prior to a contract and legitimate interest.",
          ],
        },
        {
          heading: "Sharing and retention",
          paragraphs: [
            "We do not sell your data or share it for advertising. It may be processed by service providers (email delivery, hosting) solely to operate the site and reply to you, and is retained only as long as needed for that purpose and applicable law.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You may request access, correction, deletion, or objection by writing to ${NAP.email}. The version published on this page is the current policy.`,
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      sections: [
        {
          heading: "Website use",
          paragraphs: [
            "kmapolyclinic.com.tr and related pages are provided by KMA PolyClinic for informational purposes. Content is not a medical diagnosis or personal treatment advice; clinical decisions follow in-person assessment.",
            controllerLine.en,
          ],
        },
        {
          heading: "Appointments and contact",
          paragraphs: [
            "Requests sent via online form or WhatsApp are not a confirmed booking. Availability and clinical suitability are verified separately by our team.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Brand marks, text, imagery, and layout on this site belong to KMA PolyClinic. Unauthorized copying, republishing, or commercial reuse is prohibited.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "We do not warrant uninterrupted or error-free operation of the website. We are not liable for indirect losses arising from ordinary use, without prejudice to mandatory consumer rights.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            `These terms are governed by the laws of the Republic of Türkiye. Contact us at ${NAP.email} with questions.`,
          ],
        },
      ],
    },
  },
  fa: {
    privacy: {
      title: "سیاست حفظ حریم خصوصی",
      sections: [
        {
          heading: "دامنه",
          paragraphs: [
            "این سیاست توضیح می‌دهد که KMA PolyClinic هنگام بازدید از وب‌سایت یا تماس از طریق فرم‌های نوبت/ارتباط، داده‌های شخصی را چگونه پردازش می‌کند.",
            controllerLine.fa,
          ],
        },
        {
          heading: "داده‌هایی که جمع‌آوری می‌کنیم",
          paragraphs: [
            "ممکن است اطلاعاتی که در فرم‌ها می‌نویسید—مانند نام، تلفن، ایمیل اختیاری، بخش مورد نظر و پیام—را پردازش کنیم. برای امنیت، گزارش‌های فنی محدود (IP، نوع مرورگر، زمان) کوتاه‌مدت نگهداری می‌شود.",
          ],
        },
        {
          heading: "هدف و مبنای قانونی",
          paragraphs: [
            "داده‌ها برای پاسخ به درخواست نوبت، اطلاع‌رسانی درباره خدمات کلینیک و رعایت الزامات قانونی پردازش می‌شوند. مبنای تماس، اقدامات پیش از قرارداد و منافع مشروع است.",
          ],
        },
        {
          heading: "اشتراک‌گذاری و نگهداری",
          paragraphs: [
            "داده‌های شما فروخته یا برای تبلیغات به اشتراک گذاشته نمی‌شود. ممکن است صرفاً برای اجرای سایت و پاسخ‌گویی توسط ارائه‌دهندگان خدمت (ایمیل، میزبانی) پردازش شود و فقط تا مدت لازم نگهداری گردد.",
          ],
        },
        {
          heading: "حقوق شما",
          paragraphs: [
            `برای دسترسی، اصلاح، حذف یا اعتراض به ${NAP.email} بنویسید. نسخه منتشرشده در این صفحه، سیاست جاری است.`,
          ],
        },
      ],
    },
    terms: {
      title: "شرایط استفاده",
      sections: [
        {
          heading: "استفاده از وب‌سایت",
          paragraphs: [
            "kmapolyclinic.com.tr و صفحات مرتبط توسط KMA PolyClinic برای اطلاع‌رسانی ارائه می‌شود. محتوا جایگزین تشخیص پزشکی یا توصیه درمانی فردی نیست؛ تصمیم بالینی پس از ارزیابی حضوری گرفته می‌شود.",
            controllerLine.fa,
          ],
        },
        {
          heading: "نوبت و تماس",
          paragraphs: [
            "درخواست‌های فرم آنلاین یا واتساپ به‌معنای تأیید قطعی نوبت نیست. موجودی وقت و تناسب بالینی جداگانه توسط تیم ما بررسی می‌شود.",
          ],
        },
        {
          heading: "مالکیت فکری",
          paragraphs: [
            "برند، متن، تصاویر و چیدمان متعلق به KMA PolyClinic است. کپی، بازنشر یا استفاده تجاری بدون اجازه ممنوع است.",
          ],
        },
        {
          heading: "محدودیت مسئولیت",
          paragraphs: [
            "کارکرد بدون وقفه یا بدون خطای وب‌سایت تضمین نمی‌شود. مسئول زیان‌های غیرمستقیم ناشی از استفاده عادی نیستیم، با حفظ حقوق اجباری مصرف‌کننده.",
          ],
        },
        {
          heading: "قانون حاکم",
          paragraphs: [
            `این شرایط تابع قوانین جمهوری ترکیه است. پرسش‌ها را به ${NAP.email} ارسال کنید.`,
          ],
        },
      ],
    },
  },
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      sections: [
        {
          heading: "النطاق",
          paragraphs: [
            "توضح سياسة الخصوصية هذه كيفية معالجة KMA PolyClinic للبيانات الشخصية عند زيارة موقعنا أو التواصل عبر نماذج الموعد/الاتصال.",
            controllerLine.ar,
          ],
        },
        {
          heading: "البيانات التي نجمعها",
          paragraphs: [
            "قد نعالج المعلومات التي تشاركها في الحقول مثل الاسم ورقم الهاتف والبريد الاختياري والقسم المفضل والرسالة. قد تُحفظ سجلات تقنية محدودة (عنوان IP ونوع المتصفح والطابع الزمني) لفترة قصيرة لأغراض الأمان.",
          ],
        },
        {
          heading: "الغرض والأساس القانوني",
          paragraphs: [
            "تُعالج البيانات للرد على طلبات المواعيد، وإبلاغكم بخدمات العيادة، والوفاء بالالتزامات القانونية. أساس طلبات الاتصال هو خطوات ما قبل التعاقد والمصلحة المشروعة.",
          ],
        },
        {
          heading: "المشاركة والاحتفاظ",
          paragraphs: [
            "لا نبيع بياناتكم ولا نشاركها لأغراض إعلانية. قد يعالجها مزودو خدمات (البريد والاستضافة) فقط لتشغيل الموقع والرد عليكم، وتُحفظ للمدة اللازمة لهذا الغرض وللقانون المعمول به.",
          ],
        },
        {
          heading: "حقوقكم",
          paragraphs: [
            `يمكنكم طلب الوصول أو التصحيح أو الحذف أو الاعتراض عبر الكتابة إلى ${NAP.email}. النسخة المنشورة في هذه الصفحة هي السياسة الحالية.`,
          ],
        },
      ],
    },
    terms: {
      title: "شروط الاستخدام",
      sections: [
        {
          heading: "استخدام الموقع",
          paragraphs: [
            "يُقدَّم موقع kmapolyclinic.com.tr والصفحات المرتبطة من KMA PolyClinic لأغراض إعلامية. المحتوى ليس تشخيصًا طبيًا أو نصيحة علاجية فردية؛ القرارات السريرية تتم بعد تقييم حضوري.",
            controllerLine.ar,
          ],
        },
        {
          heading: "المواعيد والتواصل",
          paragraphs: [
            "الطلبات عبر النموذج أو واتساب لا تعني حجزًا مؤكدًا. يتحقق فريقنا من التوفر والملاءمة السريرية على حدة.",
          ],
        },
        {
          heading: "الملكية الفكرية",
          paragraphs: [
            "العلامات والنصوص والصور والتصميم ملك لـ KMA PolyClinic. يُحظر النسخ أو إعادة النشر أو الاستخدام التجاري دون إذن.",
          ],
        },
        {
          heading: "حدود المسؤولية",
          paragraphs: [
            "لا نضمن تشغيلًا دون انقطاع أو أخطاء. لسنا مسؤولين عن خسائر غير مباشرة ناتجة عن الاستخدام العادي، مع حفظ حقوق المستهلك الإلزامية.",
          ],
        },
        {
          heading: "القانون الواجب التطبيق",
          paragraphs: [
            `تخضع هذه الشروط لقوانين جمهورية تركيا. راسلونا على ${NAP.email} لأي استفسار.`,
          ],
        },
      ],
    },
  },
};

function isAppLocale(locale: string): locale is AppLocale {
  return locale === "tr" || locale === "en" || locale === "fa" || locale === "ar";
}

export function getMvpLegal(locale: string, key: LegalKey): MvpLegalPage {
  const lang = isAppLocale(locale) ? locale : "tr";
  return mvpLegal[lang][key];
}
