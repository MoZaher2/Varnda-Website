import React from 'react'
import "./RegionsOfEgyptPage.css"
import Footer from '../../Components/Footer/Footer'
import HeaderPageLink from '../../Components/HeaderPageLink/HeaderPageLink'
import SectionCards from '../../Components/SectionCards/SectionCards'

import img1 from "../../images/area1.png"
import img2 from "../../images/area2.png"
import img3 from "../../images/area1.png"
import img4 from "../../images/advice_4.png"
import img5 from "../../images/advice_5.png"
import img6 from "../../images/advice_6.png"
import img7 from "../../images/advice_7.png"
import img8 from "../../images/advice_8.png"

import card1 from "../../images/avice_card_1.png"
import card2 from "../../images/advice_card_2.png"
import card3 from "../../images/advice_card_3.png"
import card4 from "../../images/advice_card_4.png"
import card5 from "../../images/advice_card_5.png"
import card6 from "../../images/advice_card_6.png"
import card7 from "../../images/advice_card_7.png"
import card8 from "../../images/advice_card_8.png"
import card9 from "../../images/advice_card_9.png"

export default function RegionsOfEgyptPage() {

  const articles = [
    { img: img1, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img2, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img3, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img4, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img5, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img6, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img7, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' },
    { img: img8, title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي', link: '/', readTime: '3 دقائق للقراءة', description: 'الفنج شوي هي عادة صينية قديمة تركز على خلق الانسجام بين الناس وبيئتهم، ومصطلح “فنج شوي” يعني “الرياح” و”الماء”، مما يدل على تدفق الطاقة أو “تشي” في الفضاء،' }
  ];

  const images = [card1, card2, card3, card4, card5, card6, card7, card8, card9];
  return (
    <>
<HeaderPageLink title=" مناطق مصر" />


<SectionCards images={images} articles={articles} />
    <Footer />
      
    </>
  )
}
