import { useEffect } from "react";

const usePageSEO = ({
    title,
    description,
    keywords = [],
}) => {
    useEffect(() => {
        document.title = title;
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'keywords', keywords.join(', ')); // Convert array to string
        return () => {
            // يمكنك إضافة عمليات تنظيف هنا إذا لزم الأمر
        };
    }, [title, description, keywords]);

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
};

export default usePageSEO;
