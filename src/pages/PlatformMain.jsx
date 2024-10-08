import About from "../components/platforma-main/about/About";
import Footer from "../components/platforma-main/footer/Footer";
import Hero from "../components/platforma-main/hero/Hero";
import Student from "../components/platforma-main/student/Student";
import Teacher from "../components/platforma-main/teacher/Teacher";
import "../components/platforma-main/style.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";

function PlatformMain() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Ilg'or platformamiz yordamida o'rganish va o'rgatishni yanada oqilona usulini kashf eting. ilmlar.com – bu masofaviy ta’lim platformasi. Bu platforma insonlar o’rtasida ilmlarni o’rganish va o’rgatish uchun yaratilgan. Platformada ham o’quvchilar ilm olishi uchun, ham o’qituvchilar ta’lim berishi uchun kerakli barcha sharoitlar mavjud. ilmlar.com ta'lim platformasi, masofaviy ta'lim berishni maqsad qilgan o'qituvchilar uchun yaratilgan. Bunda siz o'zingizning video darslardan iborat kurslaringizni platformaga joylashingiz va daromad olishingiz mumkin. ilmlar.com ta'lim platformasi, masofaviy ta'lim olishni istaganlar uchun to'g'ri tanlov. Siz bu platformada, barcha fanlar bo'yicha video kurslarni topishingiz mumkin. O'zingiz uchun qulay vaqtda va qulay joyda ta'lim oling."
        />
        <meta
          name="keywords"
          content="Onlayn ta'lim, Ta'lim platformasi, Masofaviy ta'lim, Onlayn kurslar, Onlayn ta'lim resurslari, Ta'lim dasturlari, Bepul onlayn kurslar, Sertifikatli onlayn kurslar, Onlayn o‘qitish, Onlayn o‘quv platformasi, O‘quv darslari, Ta'lim video darslari, O‘qituvchilar uchun onlayn vositalar, O‘zbekistonda onlayn ta'lim, Universitetlar onlayn kurslari, Boshlang‘ich ta'lim kurslari, O‘quv rejalari onlayn, Kompyuter fanlari onlayn kurslari, Matematika darslari, Fizika darslari onlayn, Onlayn darslar uchun platformalar, Yozma fanlar onlayn, O‘quvchilar uchun resurslar, Ta'lim texnologiyalari, O‘quv materiallari onlayn, Talabalar uchun bepul ta'lim resurslari, Masofaviy o'qituvchilar, Ingliz tili kurslari onlayn, Til o‘rganish kurslari, Biznes kurslari onlayn, Iqtisodiyot kurslari, Marketing onlayn kurslari, Dasturlash kurslari, Web-dasturlash, UX/UI dizayn kurslari, Grafik dizayn, IT kurslari onlayn, Onlayn o‘qituvchilar, Ta'lim portali, Oliy ta'lim, Ta'lim platformasi yaratuvchilari, Sertifikatlar bilan onlayn o‘qish, Biznes boshqaruvi kurslari, Rivojlanish kurslari, Onlayn o'quv bo'yicha maslahatlar, Talabalar uchun onlayn ta'lim, Online o‘qitish platformalari, Ta'lim darslari, Elektron darslar, Mobil o'qitish, Raqamli ta'lim, Onlayn matematika kurslari, Psixologiya darslari, Onlayn kimyo kurslari, O'qish jarayonini boshqarish tizimi, Ta'lim texnologiyalari platformasi, Internetda o‘qitish, Vebinarslar, Uydan o‘qish, Ta'lim kurslari, Masofaviy o'qitish vositalari, Interaktiv darslar, Onlayn repetitorlik, Musiqa darslari onlayn, Online darslarga ro‘yxatdan o‘tish, Texnologiyalar bilan ta'lim, Ta'lim platformalari o‘rtasida solishtirish, Kompyuter ilmlari darslari, Onlayn matematika resurslari, Raqamli ko‘nikmalar kurslari, Sertifikatli o‘qish dasturlari, Online fanlar darslari, Darslar onlayn rejimda, O‘quvchilarni ro‘yxatdan o‘tish, Elektron dars materiallari, Onlayn darsga kirish, Onlayn o‘qitish tajribasi, O‘quv dasturlarini boshqarish, Masofaviy ta'lim boshqaruv tizimi, Onlayn o‘quv darslari, O‘qituvchilarni tayyorlash kurslari, O‘quvchilarni baholash vositalari, O‘quv materiallarini yuklab olish, Ta'lim texnologiyalari yangiliklari, Darslarni video formatda o‘rganish, Onlayn darslar bilan tayyorlanish, Yangi ta'lim texnologiyalari, O‘zbek tilida ta'lim kurslari, Matematika va fanlar darslari, Kompyuter dasturlash onlayn kurslari, O‘rta maktab onlayn ta'limi, Boshlang‘ich sinflar onlayn kurslari, Onlayn ta'lim strategiyalari, Online video darslari, Ta'lim uchun interaktiv platformalar, Yoshlar uchun onlayn ta'lim, O‘quv darsliklari onlayn, Dars rejalari onlayn, Onlayn ta'lim o‘quv markazlari, Dasturiy ta'lim vositalari, Onlayn ta'lim markazlari, Vebinarlarda qatnashish, Til kurslari sertifikatlari, Muvaffaqiyatli o‘quvchilar, Video kurslar platformasi, Matematikani interaktiv o‘qitish, Onlayn repetitor xizmatlari, O‘quvchilarni ro‘yxatdan o‘tkazish, Tezlashtirilgan o‘quv kurslari, Raqamli ko‘nikmalar o‘rganish, Ta'lim texnologiyalari yangiliklari, Raqamli ta'lim platformasi, Onlayn fan darslari, Kimyo fanlari darslari, O‘zbekcha ta'lim kurslari, Matematikani o‘rganish platformasi, Onlayn olimlar darslari, Bepul video darslar, Online darslar sertifikati, Masofadan o‘qitish tajribasi, Repetitor onlayn resurslari, Uyda o‘qitish platformasi, O‘qituvchilar uchun raqamli vositalar, Onlayn darslarga kirish, Interaktiv o‘qitish texnologiyalari, Ta'lim texnologiyalari yangilanishlari, O‘quvchilarni tayyorlash dasturi, Onlayn darslar uchun materiallar, Video darslar o‘quvchilari, Matematika video kurslari, O‘quvchilarning muvaffaqiyatini oshirish, Ta'lim resurslarini boshqarish, Bepul o‘quv darslari, Internetda ta'lim olish, Online o‘quv resurslari, O‘rganish texnologiyalari, Matematikadan repetitorlik, Onlayn platformalarda o‘qitish, O‘quv dasturlarining rivojlanishi, O‘quvchilarni boshqarish tizimi, Masofadan o‘qituvchilar uchun platformalar, O‘quvchilarni ro‘yxatdan o‘tkazish tizimi, Ta'limni raqamlashtirish, Onlayn o‘quv markazi, O‘quv dasturlari ishlab chiqish, Online darsliklar yuklab olish, Matematika darslarini yuklab olish, Kimyo va fizika darslari onlayn, Til o‘rganish bo‘yicha maslahatlar, O‘quvchilarni tayyorlash dasturlari, Online testlar yaratish, Masofadan o‘qitish texnologiyalari, Onlayn darslar texnologiyasi, Raqamli darslar, Kompyuter fanlari darslari, Online ta'lim bo'yicha yangiliklar, Interaktiv o‘quv dasturlari, O‘qitish metodikasi onlayn, O‘qitish vositalarini yaratish, Ta'lim texnologiyalari platformalari, Onlayn sertifikat dasturlari, O‘quvchilar uchun materiallar, Video kurslar sertifikati, O‘quvchilarni tayyorlash bo‘yicha dasturlar, Masofaviy o‘qitish bo‘yicha maslahatlar, O‘quvchilarning muvaffaqiyatli strategiyalari."
        />
      </Helmet>
      <div className="landing_page">
        <Hero />
        <About />
        <Teacher />
        <Student />
        <Footer />
      </div>
    </>
  );
}

export default PlatformMain;
