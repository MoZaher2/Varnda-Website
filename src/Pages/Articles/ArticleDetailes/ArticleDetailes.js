import React, { useEffect, useState } from "react";
import { Container, Row, Col ,Alert} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ArticleDetailes.css";
import HeaderPageLink from "../../../Components/HeaderPageLink/HeaderPageLink.js";
import Footer from "../../../Components/Footer/Footer";
import api from "../../../API/ApiLink.js";
import usePageSEO from "../../../hooks/usePageSEO"
import AddComment from "../../../Components/Comments/AddComment.js";
import CommentCard from "../../../Components/Comments/CommentCard.js";
import Header from "../../../Components/Header/Header.js";
export default function ArticleDetailes() {
  const [article, setArticle] = useState({})
  const { id } = useParams();
  // استرجاع مقاله حسب اللينك 
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/getPostByUrl/${id}`);
        setArticle(response.data.data.posts[0])
      } catch (error) {
        setArticle("")
        console.log(error);
      }
    };
    fetchArticle();
  }, [id]);

  // Set default SEO settings
  usePageSEO({
    title: article.Title || 'مقالات',
    description: article.meta_description || '',
    keywords: article.key_words ? article.key_words.split(',') : []
  });
  return (
    <>
    <Header/>
      <HeaderPageLink/>
      {article ? <>
        <h2 className="text-center title-page py-1 pb-2 container my-3">{article.Title}</h2>
        <Container dir="rtl">
          <Row className="detailes-page">
            <Col>
              <img
                src={article.Article_image}
                alt={article.Title}
                className="img-fluid mb-4"
              />
              <div className="rtl">
                <div dangerouslySetInnerHTML={{ __html: article.Article_body }} />
              </div>
            </Col>
          </Row>
        </Container>
      </> : <Alert key="danger" className="text-center" variant="danger">
        404 عفوا, المقال ليس موجود
        </Alert>}
        <hr/>
        <Container>
          <CommentCard post_id={article.id} />
          <hr/>
          <AddComment id={article.id} />
        </Container>
      <Footer />
    </>
  );
}

// const articlesData = [
//   {
//     id: 1,
//     img: img1,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//     content: [
//       {
//         title: "زد بارك ",
//         img: img1,
//         description:
//           "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//       },
//       {
//         title: " ووك أوف كايرو ",
//         img: img2,
//         description:
//           "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//       },
//       {
//         title: "جاليريا 40 ",
//         img: img3,
//         description:
//           "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//       },
//       {
//         title: " الكوربة",
//         img: img4,
//         description:
//           "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//       },
//       {
//         title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//         img: img5,
//         description:
//           "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//       },
//     ],
//   },
//   {
//     id: 2,
//     img: img2,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//       content: [
//         {
//           title: "زد بارك ",
//           img: img1,
//           description:
//             "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//         },
//         {
//           title: " ووك أوف كايرو ",
//           img: img2,
//           description:
//             "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//         },
//         {
//           title: "جاليريا 40 ",
//           img: img3,
//           description:
//             "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//         },
//         {
//           title: " الكوربة",
//           img: img4,
//           description:
//             "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//         },
//         {
//           title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//           img: img5,
//           description:
//             "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//         },
//       ],
//   },
//   {
//     id: 3,
//     img: img3,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//       content: [
//         {
//           title: "زد بارك ",
//           img: img1,
//           description:
//             "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//         },
//         {
//           title: " ووك أوف كايرو ",
//           img: img2,
//           description:
//             "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//         },
//         {
//           title: "جاليريا 40 ",
//           img: img3,
//           description:
//             "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//         },
//         {
//           title: " الكوربة",
//           img: img4,
//           description:
//             "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//         },
//         {
//           title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//           img: img5,
//           description:
//             "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//         },
//       ],
//   },
//   {
//     id: 4,
//     img: img4,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//       content: [
//         {
//           title: "زد بارك ",
//           img: img1,
//           description:
//             "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//         },
//         {
//           title: " ووك أوف كايرو ",
//           img: img2,
//           description:
//             "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//         },
//         {
//           title: "جاليريا 40 ",
//           img: img3,
//           description:
//             "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//         },
//         {
//           title: " الكوربة",
//           img: img4,
//           description:
//             "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//         },
//         {
//           title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//           img: img5,
//           description:
//             "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//         },
//       ],
//   },
//   {
//     id: 5,
//     img: img5,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//       content: [
//         {
//           title: "زد بارك ",
//           img: img1,
//           description:
//             "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//         },
//         {
//           title: " ووك أوف كايرو ",
//           img: img2,
//           description:
//             "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//         },
//         {
//           title: "جاليريا 40 ",
//           img: img3,
//           description:
//             "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//         },
//         {
//           title: " الكوربة",
//           img: img4,
//           description:
//             "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//         },
//         {
//           title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//           img: img5,
//           description:
//             "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//         },
//       ],
//   },
//   {
//     id: 6,
//     img: img6,
//     title: "زد بارك",
//     readTime: "5 mins",
//     description:
//       "كما يقال في المثل الشهير، “إنها أجمل فترة في السنة”، أوعلى الأقل إنها أجمل فترة في فصل الشتاء. هناك شيء ما في شهر ديسمبر يدفئ القلب ويجعله مليئًا بالبهجة. تزين الشوارع بزخارف وديكورات عيد الميلاد المشرقة والممتعة، ويشترك الناس في الهدايا المتبادلة في إطار لعبة سيكريت سانتا، وتعرض الأفلام القديمة المرتبطة بعيد الميلاد والتي تذكرنا بأيامنا الجميلة بلا توقف على التلفاز (فكر في فيلم “home alone” على سبيل المثال)، والقائمة تطول وتطول.",
//       content: [
//         {
//           title: "زد بارك ",
//           img: img1,
//           description:
//             "أيضًا، يقع في قلب الشيخ زايد المشهور “ممشى القاهرة” والذي يعتبر ببساطة عالمًا للمشاة يمتد لمسافة كيلومتر واحد وهو أيضًا أول موقع “شارع رئيسي” في مصر على الإطلاق. تم تصميم ممشى القاهرة بطريقة تجعله قابلاً للمقارنة مع مواقع شوارع رئيسية دولية أخرى مثل شانزليزيه وأكسفورد ستريت",
//         },
//         {
//           title: " ووك أوف كايرو ",
//           img: img2,
//           description:
//             "منطقة جاليريا 40 (وتقع أيضًا في الشيخ زايد) هي منطقة تجارية فاخرة تعود إلى وقت مبكر نسبيًا مقارنةً بالمداخلتين السابقتين في قائمتنا. ومع ذلك، فإن كونها قديمة نسبيًا لا يعني أن جاليريا 40 لا تقدم الكثير، بالعكس انها من ضمن أفضل الأماكن التي يمكنك الاستمتاع فيها بأجواء الكريسماس والسنة الجديدة",
//         },
//         {
//           title: "جاليريا 40 ",
//           img: img3,
//           description:
//             "إذا كنت من سكان مصر الجديدة أو لا،  فإن حي الكوربة من الأماكن المميزة التي يمكنك الإستمتاع فيها بأجواء الكريسماس كما يجب أن تكون. فالكوربة ليست مجرد مركز تجاري أو حديقة، بل حي فعلي يقع في قلب هليوبوليس في القاهرة. حي الكوربة ببساطة هو واحد من أكثر أحياء القاهرة حيوية ونشاطًا برمتها، وجزء من سحرها يكمن في بساطته. انسَ نمط الإعدادات الفاخرة المرتبطة عادةً بالمجمعات التجارية الفاخرة أو الحدائق الترفيهية أو الشوارع الرئيسية. الكوربة تتميز بتجربة المدينة الفعلية والخامة، مع مبانيها ذات الهندسة المعمارية الكلاسيكية الفريدة، وشوارعها الصاخبة، والعديد من المحلات التجارية والمقاهي والمطاعم",
//         },
//         {
//           title: " الكوربة",
//           img: img4,
//           description:
//             "واحدة من أهم معالم القاهرة الجديدة في الكريسماس ورأس السنة هي مهرجان هايد آوت في حديقة هايد بارك! وهذا العام ليس هناك تغيير، حيث تقام النسخة الثالثة من المهرجان بمناسبة الكريسماس و السنة الجديدة من 22 ديسمبر حتى 8 يناير.",
//         },
//         {
//           title: "كرنفال الكريسماس في كايرو فيستيفال سيتي ",
//           img: img5,
//           description:
//             "أخيرًا ولكن بالتأكيد ليس أقل أهمية، لدينا النسخة الثالثة من كرنفال جينجل جام الذي يقام في كايرو فستيفال سيتي  وينقل ببساطة روح الكريسماس بأكثر الطرق السحرية حيث يتحول كايرو فستيفال سيتي بأكمله إلى عالم شتوي خيالي على الفور. كرنفال جينجل جام مليء بالمرح والأنشطة المتعلقة بالكريسماس مثل ركوب الملاهي والألعاب المناسبة للأطفال والكبار على حد سواء. ثم بالطبع يمكنك شراء جميع أنواع المنتجات والأطعمة اللذيذة لعيد الميلاد من السوق هناك. يمكنك أيضًا مشاهدة المواكب الإيقاعية المذهلة التي تتجول في المجمع. ناهيك عن العديد من أنشطة",
//         },
//       ],
//   }
// ];