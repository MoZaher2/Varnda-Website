import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import usePageSEO from "../../hooks/usePageSEO";
export default function PrivacyPolicyPage() {

    // Set SEO settings
    usePageSEO({
      title:"سياسة الخصوصية",
      keywords: ["سياسة الخصوصية"],
    });

  return (
    <div style={{ background: "#eee" }}>
      <Header />
      <h2 className="text-center mt-3 mb-4" style={{ color: "blue" }}>
        سياسة خصوصية فارندا Varnda
      </h2>
      <p
        dir="rtl"
        className="fs-5 container mb-3 p-2 text-center"
        style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
      >
        في معرض فارندا Varnda خصوصية زوارنا لها اهمية بالغة بالنسبة لنا، سياسة
        الخصوصية الموجودة في هذه الوثيقة تمثل الخطوط العريضة لأنواع المعلومات
        الشخصية التي نجمعها وكيفية استخدامها من قبلنا.
      </p>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >
          منصات سياسية الخصوصية:
        </h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >
          تطبق سياسة الخصوصية هذه على ويب سايت فارندا Varnda، وتطبيقاته وسارية
          على جميع العملاء سواء كانوا من مستخدمي الموقع عبر Varnda.com أو
          مستخدمي تطبيقات الأجهزة النقالة.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >
          تعديل سياسة الخصوصية:
        </h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >
          قد تخضع سياسة الخصوصية هذه للتغيير من وقت لآخر. تم نشر النسخة الحالية
          من سياسة الخصوصية هذه على الإنترنت من قبل إدارة فارندا Varnda يتحتم
          عليك التحقق من سياسة الخصوصية الخاصة بنا بشكل منتظم. استخدامك المستمر
          لموقع فارندا Varnda وتطبيقاته وخدماته يشكل موافقتك على سياسة الخصوصية
          هذه، حيث يتم تعديلها من وقت لآخر.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >
          حقوقك حول بياناتك الشخصية:
        </h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >
          يحق لك ان تكون علي علم بأي من البيانات الشخصية التي قد نحتفظ او نعمل
          بها من أجلك، كذلك يحق لك تقديم طلب تصحيح هذه البيانات او الكف عن
          أستخدامها.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >
          آمان عمليات الدفع:
        </h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >
          نستخدم تقنيات وإجراءات الأمان الملائمة لمنع نفاذٍ غير مصرّح به أو غير
          قانونيّ لمعلوماتك أو فقدانها أو تدميرها. فعندما نجمع البيانات من خلال
          الموقع، نقوم بتخزين معلوماتك الشخصية على قاعدة بيانات ضمن خادم
          إلكتروني آمن. فنستخدم أنظمة جُدر الحماية على خوادمنا. وعندما نقوم بجمع
          تفاصيل بطاقات الدفع إلكترونيًا، فإننا نحميها من خلال استخدام التشفير،
          مثل طبقة مآخذ التوصيل الآمنة (SSL ). فيصعب بالتّالي على أيّ متسلّلٍ
          فكّ تشفير معلوماتك بما أنّنّا لا نستطيع ضمان الحماية بنسبة مئة في
          المئة. وننصحك بشدّة عدم إرسال كامل تفاصيل بطاقة الائتمان أو بطاقة
          السحب الآلي عندما تتواصل معنا إلكترونيًا ومن دون تشفير. ونضع ضمانات
          ماديّة والكترونية وإجرائيّة مباشرة على عملية جمع معلوماتك اوالإفصاح
          عنها. وتتطلّب إجراءاتنا الأمنية أن نطلب منك أحيانًا إثبات هويتك قبل أن
          نفصح لك عن معلوماتك الشخصية. وتقع على عاتقك مسؤوليّة حماية كلمتك
          السريّة وحاسوبك من أيّ نفاذ غير مصرّح به.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >الكوكيز وإعدادات الشبكة:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >معرض فارندا Varnda يستخدم تقنية الكوكيز لتخزين المعلومات عن تفضيلات الزوار، الى جانب سجل خاص للمستخدم تسجل فيه معلومات محددة عن الصفحات التي تم الوصول اليها او زيارتها، بهذه الخطوة فاننا نعرف مدى اهتمامات الزوار واي المواضيع الاكثر تفضيلا من قبلهم حتى نستطيع بدورنا تطوير محتوانا المعرفي المناسب لهم.</p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >ملفات الدخول:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >شأنها في ذلك شأن معظم خوادم المواقع الاخرى ، ومن هنا في فارندا Varnda نستخدم نظام ملفات الدخول. وهذا يشمل بروتوكول الانترنت (عناوين ، نوع المتصفح ، مزود خدمة الانترنت (مقدمي خدمات الانترنت)، التاريخ / الوقت ، وعدد النقرات لتحليل الاتجاهات وادارة الموقع ).
        وهنا لا نقصد بجمع كل هذه المعلومات التلصص على أمور الزوار الشخصية انما هي امور تحليلية لاغراض تحسين الجودة ، يضاف الى ذلك ان جميع المعلومات المحفوظة من قبلنا سرية تماما ، وتبقى ضمن نطاق التطوير والتحسين الخاص بموقعنا فقط.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >إعلان الموافقة:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >"فيما يتعلق باستخدامي المستمر لموقع فارندا Varnda ، أسمح بموجبه ل فارندا Varnda تحليل بيانات البروتوكول واستخدامها لتطوير وتحسين معرضهم للتسويق الإكتروني."</p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >البيانات التي نجمعها:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >قد نحتاج لجمع المعلومات الخاصة بكَ إذا أردت إضافة إعلان جديد او التسجيل في خدمة من موقعنا. نقوم بجمع البيانات اللازمة أخرى لتأمين أية مطالب محتملة قد تظهر لاحقا، ولتزويدكَ بالخدمات المتوفرة لدينا.
        مثال على ذلك، الإسم والجنس وتاريخ الميلاد وعنوان البريد الإلكتروني والعنوان البريدي وعنوان التسليم (إذا كان مختلفًا) ورقم الهاتف ورقم الجوّال ورقم الفاكس وتفاصيل الدفع أي تفاصيلٍ عن بطاقات الدفع أو تفاصيلٍ عن الحساب المصرفي. نقوم أيضًا بجمع معلومات جهازك بما في ذلك معرّفات الأجهزة وأي معلومات تعريف شخصية أخرى مستخدمة للوصول إلى موقع فارندا Varnda  لتحسين تجربتك خلال الاستخدام عن طريق إجراء تحسينات على برامجنا لتخصيصها لما تفضله.
        يتم استخدام هذه المعلومات أيضا للكشف عن الاحتيال والحماية منه. وقد نُقرُّ باسمك وعنوانك إلى طرفٍ ثالث بغية التواصل معك بما فضلته من عقارات (على سبيل المثال، شركة مالك العقار).
        قد يتم التواصل معك على رقم هاتفك لاعلامك بأي مستجدات في تفضيلاتك، او مع الاعلانات الترويجية وتسهيلات عمليات الدفع. قد نستخدم المعلومات التي نجمعها لإجراء تحليلات ذات صلة بخدمة العملاء، ونقوم بتدريب موظفينا في خدمة العملاء، ونوفر لك الدعم المناسب للعملاء، حتى تحصلوا على أفضل تجربة عملاء من فارندا Varnda.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >الغرض من المشروع:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >قد نحتفظ بمعلوماتك حتى بعد إغلاق حسابك حتى لو كنت لا تستخدم خدماتنا وذلك للكشف عن الاحتيال ومنعه والالتزام بمتطلباتنا القانونية / التوافقية / التنظيمية و حل أي نزاعات وتنفيذ سياسات الخصوصية الخاصة بنا والشروط والأحكام.</p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >استخدامات أخرى لمعلوماتك الشخصيّة:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >قد نستخدم معلوماتك الشخصية في استطلاعات الرأي و أبحاث التسويق، وفق رغبتك، لأغراضٍ إحصائية مع ضمان سريتها التامة كما يحق لك الانسحاب في أيّ وقتٍ من الأوقات.ولا نقوم بإرسال أية أجوبة إلى طرفٍ ثالث. ولا يتم الإفصاح عن عنوان بريدك الالكتروني إلا إذا رغبتَ في المشاركة في المسابقات.
        ونقوم بالاحتفاظ بأجوبة استطلاعات الرأي في مكانٍ منفصل تماما عن بريدك الإلكتروني الخاص. قد نرسل لك أيضًا معلومات أخرى عنا، عن برامجنا، مواقعنا الإلكترونية الأخرى، خدماتنا، عروض ترويجية، نشراتنا الإخبارية، أو أي شيء يتعلق بشركات أخرى في مجموعتنا أو شركاء في العمل.
        قد نقوم بإرسال معلومات عنا ، أو عن الموقع أو مواقعنا الأخرى أو عن خدماتنا أو المشروعات الجديدة أو عروضات المعرض أو نشراتنا وغير ذلك ممّا له علاقة بالشركات التابعة لمجموعتنا أو شُركائنا.
        وإذا كنت لا ترغب بالحصول على هذه المعلومات الإضافيّة (أو في أي جزءٍ منها)، يُرجى الضغط على رابط "إلغاء الاشتراك" الموجود في أي بريد إلكتروني مرسل إليك. قد تستخدم بعض البيانات ،مع الحفاظ التام على الخصوصية والسرية على الموقع، لأغراضٍ أخرى بما في ذلك التحقق من أماكن تواجدهم ومتابعة زيارتهم للموقع أو الروابط الواردة في البريد الالكتروني في حين اشتراكهم لتلقيه، و لتزويد تلك البيانات المجهولة المصدر، والتي لا تسمح بتحديد هويّتك الشخصيّة الفعليّة، إلى طرف ثالث كالنّاشرين على سبيل المثال.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >المنافسات:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >نستخدم البيانات في حال إجراء أية مسابقات أو منافسات وذلك بغية إبلاغ الفائزين بها والإعلان عن العروض. ويمكنك العثور على المزيد من التفاصيل في حال الاطلاع على شروط المشاركة في المسابقة المعنيّة.</p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >الطرف الثالث والروابط :</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >قد نشارك معلومات تعريفية شخصية نجمعها (بما في ذلك عناوين البريد الإلكتروني) مع شركات أخرى في مجموعتنا ولأغراض تجارية - مثل الإعلانات .وقد ننقل معلوماتك إلى شركاتٍ أخرى في مجموعتنا أو إلى وكلائنا ومقاولينا لمساعدتنا في المعاملات المتعلقة وفقا لبنود سياسة الخصوصية.
        وقد نلجأ على سبيل المثال إلى طرف ثالث (شركات التطوير العقاري)، واستخدامها لأغراض الإحصاءات وأبحاث التسويق أو لمساعدة فريق خدمة العملاء.
        وقد نحتاج لتبادل المعلومات مع طرفٍ ثالث بغية الحماية من الاحتيال والحدّ من مخاطر الائتمان. و في حال تمّ بيع شركتنا أو جزءًا منها ، قد نضطر لنقل قواعد بياناتنا التي تشمل معلوماتك الشخصيّة. قد يتم أيضًا مشاركة معلوماتك مع الشركات التي تعتمدها على سبيل المثال. مواقع التواصل الاجتماعي الخاصة بك. قد تحتوي برامجنا على إعلانات لأطراف ثالثة وروابط أو أطر لمواقع أخرى. يرجى العلم بأننا لسنا مسؤولين عن ممارسات الخصوصية أو محتوى تلك الأطراف الثالثة أو المواقع الأخرى، ولا عن أي طرف ثالث نقوم بنقل بياناتك إليه وفقًا لسياسة الخصوصية الخاصة بنا. كما أننا نستهدف من خلال إعلاناتنا والمحتويات التسويقية الأخرى لك أثناء تواجدك على موقعنا استنادًا إلى المعلومات المتوفرة لدينا، سجل التصفح في فارندا Varnda ، والمعاملات السابقة مع فارندا Varnda.
        وبخلاف ما هو منصوص عليه في سياسة الخصوصية ، لن نقوم ببيع بياناتك الشخصية أو الإفصاح عنها لطرف ثالث دون الحصول على موافقة مسبقة منك إلّا إذا كان ذلك ضروريا للأغراض المنصوص عليها في سياسة الخصوصية هذه، أو إذا طُلب منّا ذلك بحكم القانون .
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >إعلان موافقة المستخدم:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >أوافق طوعا وبشكل صريح على جمع بياناتي ومشاركتها واستخدامها في الإجراءات والاحتفاظ بها وفقا للطريقة المنصوص عليها كما ورد أعلاه.</p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >اخيراً..</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >فنحن ملزمون ضمن بنود هذه الاتفاقية بان نبين لك كيفية تعطيل خاصية الكوكيز ، يمكنك فعل ذلك من خلال خيارات المتصفح الخاص بك .واذا كنت بحاجة الى  مزيد من المعلومات أو لديك أية اسئلة عن سياسة الخصوصية ، لا تتردد في الاتصال بنا عن طريق : <br />
        نموذج الاتصال بنا.
        </p>
      </div>

      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >الإقرار:</h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >أقر بموجب ذلك أنني قرأت وفهمت سياسة الخصوصية هذه. من خلال إرسال البيانات إلى فارندا Varnda أو وكلائها أو استخدامي لموقع فارندا Varnda أو تطبيقاته أو خدماته، أوافق طوعا وبشكل صريح على جمع بياناتي ومشاركتها واستخدامها في الإجراءات والاحتفاظ بها على النحو المبين في سياسة الخصوصية هذه. </p>
      </div>
      <Footer />
    </div>
  );
}
