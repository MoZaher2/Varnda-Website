import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css'; 
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';

export default function ArticleEditor({setArticle_body}) {

  const token=Cookies.get("token")
  const [content, setContent] = useState('<h1>اكتب مقالتك هنا!</h1>');
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (content) => {
    setContent(content);
    setArticle_body(content)
    console.log('Content was updated:', content);
  };

  const handleImageUpload = (blobInfo, success, failure) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());
    api.post('/uploadTempImage', formData,{
      headers: {
          Authorization: `Bearer ${token}`,
      }
  })
      .then(response => {
        console.log(response.data.data);
        setLoading(false);
        success(response.data.data);
      })
      .catch(() => {
        setLoading(false);
        failure('Image upload failed');
      });
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Editor
        apiKey='48w8wog8uwleo8euhujpdg4xx4cc03mskhs2ssf876m3jl2t'
        value={content}
        onEditorChange={handleEditorChange}
        // init={{
        //   directionality: 'rtl', // Set the text direction to RTL
        //   plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        //   toolbar: 'undo redo | blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        //   tinycomments_mode: 'embedded',
        //   tinycomments_author: 'Author name',
        //   ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        //   file_picker_callback: function (callback, value, meta) {
        //     if (meta.filetype === 'image') {
        //       document.getElementById('uploadImageInput').click();
        //     }
        //   },
        //   setup: (editor) => {
        //     editor.on('change', () => {
        //       const content = editor.getContent();
        //       setContent(content);
        //     });

        //     editor.on('drop', (e) => {
        //       e.preventDefault();
        //       e.stopPropagation();
        //       const files = e.dataTransfer.files;
        //       if (files.length > 0) {
        //         const file = files[0];
        //         const blobInfo = {
        //           blob: () => file,
        //           filename: () => file.name
        //         };
        //         handleImageUpload(blobInfo, (url) => {
        //           editor.insertContent(`<img src="${url}" />`);
        //         }, (message) => {
        //           console.error(message);
        //         });
        //       }
        //     });

        //     editor.on('dragover', (e) => {
        //       e.preventDefault();
        //       e.stopPropagation();
        //     });
        //   },
        // }}


        init={{
          directionality: 'rtl', // Set the text direction to RTL
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough | link image media table | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === 'image') {
              document.getElementById('uploadImageInput').click();
            }
          },
          setup: (editor) => {
            editor.on('change', () => {
              const content = editor.getContent();
              setContent(content);
            });

            editor.on('drop', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                const file = files[0];
                const blobInfo = {
                  blob: () => file,
                  filename: () => file.name
                };
                handleImageUpload(blobInfo, (url) => {
                  editor.insertContent(`<img src="${url}" />`);
                }, (message) => {
                  console.error(message);
                });
              }
            });

            editor.on('dragover', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
          },
        }}

        
        initialValue="<h1>اكتب مقالتك هنا!</h1>"
      />

      <input
        type="file"
        id="uploadImageInput"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const blobInfo = {
              blob: () => file,
              filename: () => file.name
            };
            handleImageUpload(blobInfo, (url) => {
              window.tinyMCE.activeEditor.insertContent(`<img src="${url}" />`);
            }, (message) => {
              console.error(message);
            });
          }
        }}
      />

      <div className="rtl">
        <h2>شكل المدونة:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}























// import { useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import axios from 'axios';
// import tinymce from 'tinymce/tinymce';
// import './App.css'; 

// export default function App() {
//   const [content, setContent] = useState('<h1>اكتب مقالتك هنا!</h1>');
//   const [loading, setLoading] = useState(false);

//   const handleEditorChange = (content) => {
//     setContent(content);
//     console.log('Content was updated:', content);
//   };

//   const handleImageUpload = (blobInfo, success, failure) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', blobInfo.blob(), blobInfo.filename()); // Ensure the key matches your server's expected field
//     axios.post('https://varnda-production.up.railway.app/api/storeImage', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then(response => {
//         setLoading(false);
//         success(response.data.image_path); // Ensure this matches the JSON response field from your server
//       })
//       .catch(error => {
//         setLoading(false);
//         console.error('Upload error:', error);
//         failure('Image upload failed');
//       });
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="loading-overlay">
//           <div className="spinner"></div>
//         </div>
//       )}
//       <Editor
//         apiKey='48w8wog8uwleo8euhujpdg4xx4cc03mskhs2ssf876m3jl2t'
//         value={content}
//         onEditorChange={handleEditorChange}
//         init={{
//           directionality: 'rtl',
//           plugins: 'image',
//           toolbar: 'undo redo | link image',
//           file_picker_callback: function (cb, value, meta) {
//             if (meta.filetype === 'image') {
//               const input = document.createElement('input');
//               input.setAttribute('type', 'file');
//               input.setAttribute('accept', 'image/*');
//               input.onchange = function () {
//                 const file = this.files[0];
//                 const reader = new FileReader();
//                 reader.onload = function () {
//                   const id = 'blobid' + (new Date()).getTime();
//                   const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
//                   const base64 = reader.result.split(',')[1];
//                   const blobInfo = blobCache.create(id, file, base64);
//                   blobCache.add(blobInfo);
//                   cb(blobInfo.blobUri(), { title: file.name });
//                 };
//                 reader.readAsDataURL(file);
//               };
//               input.click();
//             }
//           },
//         }}
//         initialValue="<h1>اكتب مقالتك هنا!</h1>"
//       />

//       <div className="rtl">
//         <h2>Preview:</h2>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// }
