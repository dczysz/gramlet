/*
  Gramlet
  Bookmarklet for viewing full size Instagram photos and videos

  Click the bookmark when viewing a photo or video to open it in a new window
  Right-click save as

  When on a profile page, clicking the bookmark goes to tagged page
  This is to get around the login link when not logged in

  Inspired by Instantgram 3.0.1 by Theus
  https://github.com/theus/instantgram
*/

javascript: (function() {
  if (window.location.href.indexOf('www.instagram.com') > -1) {

    /* From user's homepage, go to tagged */
    if (window.location.href.indexOf('/p/') <= -1) {
      if (window.location.href.indexOf('tagged') <= -1) {
        window.open(window.location.toString().concat('tagged/'), '_self');
      }
    }

    /* Photo is selected, open full size */
    else {
      var imgNode, vidNode;

      /* Find images */
      try {
        imgNode = document.querySelectorAll('div[role="button"] div div img[decoding="auto"]');
      } catch (e) {
        console.log('Error locating photo');
      }

      /* Find videos */
      try {
        vidNode = document.querySelectorAll('video');
      } catch (e) {
        console.log('Error locating video');
      }

      /* Create image and video source arrays */
      var imgArray = [], vidArray = [];
      for (var i = 0; i < imgNode.length; i++) {
        imgArray[i] = imgNode[i].getAttribute('src');
      }
      for (var i = 0; i < vidNode.length; i++) {
        vidArray[i] = vidNode[i].getAttribute('src');
      }

      /* Combine images and videos into single array */
      var srcArray = [];
      for (var i = 0; i < (imgArray.length + vidArray.length); i++) {
        srcArray[i] = (i < imgArray.length)? imgArray[i] : vidArray[i - imgArray.length];
      }

      /* Find currently viewed photo/video if gallery */
      var indexNode = document.querySelectorAll('div[class="JSZAJ  _3eoV-  IjCL9  WXPwG"] div'),
          index = -1; /* indexNode is null, stays -1 if not  */
      if (indexNode.length < 1) { index = -2; }
      for (var i = 0; i < indexNode.length; i++) {
        if (indexNode[i].classList.contains('XCodT')) { index = i; }
      }

      /* Open currently viewed photo/video */
      /* Gallery */
      if (index >= 0) {
        /* First or last in gallery */
        if (srcArray.length == 2) {
          /* First */
          if (index == 0) { window.open(srcArray[0]); }
          /* Last */
          else { window.open(srcArray[1]); }

        /* Middle in gallery */
        } else { window.open(srcArray[1]); }
      }
      /* Single photo/video */
      else if (index == -2) { window.open(srcArray[0]); }
    }
  } /* end if instagram.com */
})();


/* Old, unused, or not going to work

// Download photo - DOESN'T WORK
// Can't create anything on a .jpg page
// From Fizzix: https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
// Window.open format: https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file

function getBase64Image(img) {
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  console.log(canvas.height);

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL('image/png');

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}


// Open download prompt
function promptDl(src) {
  var dlSrc = 'data:application/octet-stream,' + src;
//  window.open(dlSrc, '_self');
  var dlImg = document.createElement('img');
  dlImg.setAttribute('src', dlSrc);

  var img64 = getBase64Image(dlImg);
  console.log(img64);
}

*/
