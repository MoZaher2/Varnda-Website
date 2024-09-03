// import { useEffect } from "react";

// const usePageSEO = ({
//     title,
//     description,
//     keywords = [],
// }) => {
//     useEffect(() => {
//         document.title = title;
//         setMetaTag('name', 'description', description);
//         setMetaTag('name', 'keywords', keywords.join(', ')); // Convert array to string
//         return () => {
//             // يمكنك إضافة عمليات تنظيف هنا إذا لزم الأمر
//         };
//     }, [title, description, keywords]);

//     const setMetaTag = (attr, key, content) => {
//         if (content) {
//             let element = document.querySelector(`meta[${attr}="${key}"]`);
//             if (!element) {
//                 element = document.createElement('meta');
//                 element.setAttribute(attr, key);
//                 document.head.appendChild(element);
//             }
//             element.setAttribute('content', content);
//         }
//     };
// };

// export default usePageSEO;



import { useEffect } from "react";

const usePageSEO = ({
    title,
    description,
    keywords = [],
    icon,
    ogImage,
}) => {
    useEffect(() => {
        document.title = title;
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'keywords', keywords.join(', '));
        setIcon(icon);
        setMetaTag('property', 'og:image', ogImage);

        return () => {
            // You can add cleanup logic here if needed
        };
    }, [title, description, keywords, icon, ogImage]);

    const setMetaTag = (attr, key, content) => {
        if (content) {
            let element = document.querySelector(`meta[${attr}="${key}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        }
    };

    const setIcon = (icon) => {
        if (icon) {
            let linkElement = document.querySelector('link[rel="apple-touch-icon"]');
            if (!linkElement) {
                linkElement = document.createElement('link');
                linkElement.setAttribute('rel', 'apple-touch-icon');
                document.head.appendChild(linkElement);
            }
            linkElement.setAttribute('href', icon);
        }
    };
};

export default usePageSEO;
