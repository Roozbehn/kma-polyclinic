import {
  getDepartmentBySlug,
  getDepartments,
  getPriorityServices,
} from "@/lib/sanity";
import type { AppLocale } from "@/lib/whatsapp";

export interface MvpDepartment {
  slug: string;
  title: string;
  summary: string;
  faOnly?: boolean;
  navPriority: number;
}

export interface MvpService {
  slug: string;
  title: string;
  summary: string;
}

interface LocaleBundle {
  departments: MvpDepartment[];
  priorityServices: MvpService[];
}

const DEPARTMENT_SLUGS = [
  "aesthetics",
  "dermatology",
  "dentistry",
  "plastic-surgery",
  "hair-transplant",
  "eyebrow-transplant",
  "checkup-laboratory",
] as const;

function dept(
  slug: (typeof DEPARTMENT_SLUGS)[number],
  title: string,
  summary: string,
  navPriority: number,
  faOnly?: boolean,
): MvpDepartment {
  return faOnly
    ? { slug, title, summary, navPriority, faOnly: true }
    : { slug, title, summary, navPriority };
}

function svc(slug: string, title: string, summary: string): MvpService {
  return { slug, title, summary };
}

export const mvpContent: Record<AppLocale, LocaleBundle> = {
  tr: {
    departments: [
      dept("aesthetics", "Estetik", "Yüz ve vücut estetik tedavileri.", 1),
      dept("dermatology", "Dermatoloji", "Cilt sağlığı ve medikal dermatoloji.", 2),
      dept("dentistry", "Diş Hekimliği", "Estetik ve restoratif diş tedavileri.", 3),
      dept("plastic-surgery", "Plastik Cerrahi", "Cerrahi estetik ve rekonstrüksiyon.", 4),
      dept("hair-transplant", "Saç Ekimi", "Doğal görünümlü saç ekimi çözümleri.", 5),
      dept("eyebrow-transplant", "Kaş Ekimi", "Yoğun ve dengeli kaş tasarımı.", 6),
      dept(
        "checkup-laboratory",
        "Check-up & Laboratuvar",
        "Kapsamlı check-up ve laboratuvar hizmetleri.",
        7,
        true,
      ),
    ],
    priorityServices: [
      svc("eyebrow-transplant", "Kaş Ekimi", "Doğal yoğunluk ve çerçeve için kaş ekimi."),
      svc("hair-transplant", "Saç Ekimi", "Kişiye özel saç ekimi planı."),
      svc("botox", "Botoks", "İnce çizgi ve mimik kırışıklığı yönetimi."),
      svc("filler", "Dolgu", "Yüz hatlarını dengeleyen medikal dolgular."),
      svc("laser", "Lazer", "Cilt yenileme ve epilasyon lazer tedavileri."),
    ],
  },
  en: {
    departments: [
      dept("aesthetics", "Aesthetics", "Facial and body aesthetic treatments.", 1),
      dept("dermatology", "Dermatology", "Skin health and medical dermatology.", 2),
      dept("dentistry", "Dentistry", "Aesthetic and restorative dental care.", 3),
      dept("plastic-surgery", "Plastic Surgery", "Surgical aesthetics and reconstruction.", 4),
      dept("hair-transplant", "Hair Transplant", "Natural-looking hair restoration.", 5),
      dept("eyebrow-transplant", "Eyebrow Transplant", "Fuller, balanced eyebrow design.", 6),
      dept(
        "checkup-laboratory",
        "Check-up & Laboratory",
        "Comprehensive check-up and lab services.",
        7,
        true,
      ),
    ],
    priorityServices: [
      svc("eyebrow-transplant", "Eyebrow Transplant", "Natural density and refined brow framing."),
      svc("hair-transplant", "Hair Transplant", "Personalized hair restoration plans."),
      svc("botox", "Botox", "Softening fine lines and expression wrinkles."),
      svc("filler", "Filler", "Medical fillers that balance facial contours."),
      svc("laser", "Laser", "Skin renewal and laser hair-removal treatments."),
    ],
  },
  fa: {
    departments: [
      dept("aesthetics", "زیبایی", "درمان‌های زیبایی صورت و بدن.", 1),
      dept("dermatology", "پوست", "سلامت پوست و درماتولوژی پزشکی.", 2),
      dept("dentistry", "دندانپزشکی", "مراقبت‌های زیبایی و ترمیمی دندان.", 3),
      dept("plastic-surgery", "جراحی پلاستیک", "زیبایی جراحی و بازسازی.", 4),
      dept("hair-transplant", "کاشت مو", "بازسازی طبیعی مو.", 5),
      dept("eyebrow-transplant", "کاشت ابرو", "طراحی ابروی پر و متعادل.", 6),
      dept(
        "checkup-laboratory",
        "چکاپ و آزمایشگاه",
        "خدمات چکاپ جامع و آزمایشگاهی.",
        7,
        true,
      ),
    ],
    priorityServices: [
      svc("eyebrow-transplant", "کاشت ابرو", "تراکم طبیعی و قاب‌بندی ظریف ابرو."),
      svc("hair-transplant", "کاشت مو", "برنامه شخصی کاشت و بازسازی مو."),
      svc("botox", "بوتاکس", "نرم کردن خطوط ظریف و چین‌های بیانی."),
      svc("filler", "فیلر", "فیلرهای پزشکی برای تعادل فرم صورت."),
      svc("laser", "لیزر", "نوزایی پوست و اپیلاسیون لیزری."),
    ],
  },
  ar: {
    departments: [
      dept("aesthetics", "التجميل", "علاجات تجميل الوجه والجسم.", 1),
      dept("dermatology", "الأمراض الجلدية", "صحة الجلد والجلدية الطبية.", 2),
      dept("dentistry", "طب الأسنان", "علاجات الأسنان التجميلية والترميمية.", 3),
      dept("plastic-surgery", "الجراحة التجميلية", "التجميل الجراحي وإعادة البناء.", 4),
      dept("hair-transplant", "زراعة الشعر", "استعادة الشعر بمظهر طبيعي.", 5),
      dept("eyebrow-transplant", "زراعة الحواجب", "تصميم حواجب ممتلئة ومتوازنة.", 6),
      dept(
        "checkup-laboratory",
        "الفحص المخبري",
        "خدمات الفحص الشامل والمختبر.",
        7,
        true,
      ),
    ],
    priorityServices: [
      svc("eyebrow-transplant", "زراعة الحواجب", "كثافة طبيعية وإطار دقيق للحواجب."),
      svc("hair-transplant", "زراعة الشعر", "خطط مخصصة لاستعادة الشعر."),
      svc("botox", "البوتوكس", "تخفيف الخطوط الدقيقة وتجاعيد التعبير."),
      svc("filler", "الفيلر", "فيلر طبي يوازن ملامح الوجه."),
      svc("laser", "الليزر", "تجديد البشرة وإزالة الشعر بالليزر."),
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
  if (fromSanity) return fromSanity as MvpDepartment;
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].departments.find((d) => d.slug === slug) ?? null;
}

export async function getServiceBySlugForLocale(locale: string, slug: string) {
  const services = await getPriorityServicesForLocale(locale);
  const fromList = services.find((s) => s.slug === slug);
  if (fromList) return fromList as MvpService;
  const key = isAppLocale(locale) ? locale : "tr";
  return mvpContent[key].priorityServices.find((s) => s.slug === slug) ?? null;
}

export { getMvpLegal } from "@/lib/mvp-legal";
export type { LegalKey, MvpLegalPage, MvpLegalSection } from "@/lib/mvp-legal";
