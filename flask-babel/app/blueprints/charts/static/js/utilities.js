import domtoimage from 'dom-to-image';

const takeScreenshot = (node) => {
  setTimeout(() => {
    domtoimage.toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }, 2000);
};

export default takeScreenshot;
