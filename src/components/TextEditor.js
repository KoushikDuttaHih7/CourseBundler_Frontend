import React, { useRef, useState } from 'react';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';

const initialContent = `
<p>TRY COPY CONTENT FROM A WORD AND PASTE HERE.</p><hr>

<p><strong>Email Inspection Form (From Inspection Details)<img src="https://picsum.photos/id/237/536/354" style="float: right;"></strong>
</p><p><br></p><p>Subject: May 23 2019 Compliance Inspection for&nbsp;{{FacilityName}}</p><p>
(ie. {{InspectionCompleteDate}} {{InspectionEventType}} “Inspection”)
</p><p><br></p><p>An inspection of Carl's Jr (FSE-0004) located at 65 Rogers Road Patterson, CA 95363 was completed on May 23 2019.
</p><p><br></p><p>A copy of the inspection report is available here:&nbsp;<a href="www.open.linkoonline.com/asdfajjhafjasdfajsjfdjhafd">www.open.linkoonline.com/asdfajjhafjasdfajsjfdjhafd</a></p><p><br></p><p>
If you have any questions or concerns, please contact us.
</p><p><br></p><p>Sincerely,
</p><p>Mark Gentry
</p><p>Lead FOG Inspector
</p><p>City of Patterson Environmental Compliance Department
</p><p><a href="mailto:mgentry@ci.paterson.ca.us">mgentry@ci.paterson.ca.us</a></p><p>(209) 895-8060</p>
`;
const buttons = [
  'undo',
  'redo',
  '|',
  'bold',
  'strikethrough',
  'underline',
  'italic',
  '|',
  'superscript',
  'subscript',
  '|',
  'align',
  '|',
  'ul',
  'ol',
  'outdent',
  'indent',
  '|',
  'font',
  'fontsize',
  'brush',
  'paragraph',
  '|',
  'image',
  'video',
  'link',
  'table',
  '|',
  'hr',
  'eraser',
  'copyformat',
  '|',
  'fullsize',
  'selectall',
  'print',
  '|',
  'source',
  '|',
];
const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true,
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
  },
  width: 800,
  height: 842,
};

const TextEditor = () => {
  const [data, setData] = useState(initialContent);

  return (
    <div
      className="App"
      style={{ maxWidth: editorConfig.width, margin: '0 auto' }}
    >
      <JoditEditor
        value={data}
        config={editorConfig}
        onChange={value => setData(value)}
      />
    </div>
  );
};

export default TextEditor;

// import React from 'react';
// import JoditEditor from 'jodit-react';
// import 'jodit/build/jodit.min.css';

// class TextEditor extends React.Component {
//   handleDrop = e => {
//     e.preventDefault();
//     e.stopPropagation();

//     const files = e.dataTransfer.files;
//     const reader = new FileReader();

//     reader.onload = event => {
//       const image = document.createElement('img');
//       image.src = event.target.result;
//       image.draggable = true; // Make the image draggable

//       const editor = this.jodit.editor;
//       editor.selection.insertNode(image);
//     };

//     reader.readAsDataURL(files[0]);

//     reader.onload = event => {
//       const image = document.createElement('img');
//       image.src = event.target.result;
//       image.draggable = true; // Make the image draggable

//       image.addEventListener('dragstart', e => {
//         // Set the dragged data to the image source (URL)
//         e.dataTransfer.setData('text/plain', image.src);
//       });

//       const editor = this.jodit.editor;
//       editor.selection.insertNode(image);
//     };
//   };

//   handleDrop = e => {
//     e.preventDefault();
//     e.stopPropagation();

//     const files = e.dataTransfer.files;
//     const reader = new FileReader();

//     reader.onload = event => {
//       const image = document.createElement('img');
//       image.src = event.target.result;
//       image.draggable = true; // Make the image draggable

//       image.addEventListener('dragstart', e => {
//         // Set the dragged data to the image source (URL)
//         e.dataTransfer.setData('text/plain', image.src);
//       });

//       const editor = this.jodit.editor;
//       editor.selection.insertNode(image);
//     };

//     reader.readAsDataURL(files[0]);
//   };

//   render() {
//     return (
//       <div onDrop={this.handleDrop} onDragOver={e => e.preventDefault()}>
//         <JoditEditor
//           ref={el => (this.jodit = el)}
//           config={editorConfig}
//           // Other Jodit props...
//         />
//       </div>
//     );
//   }
// }

// export default TextEditor;
