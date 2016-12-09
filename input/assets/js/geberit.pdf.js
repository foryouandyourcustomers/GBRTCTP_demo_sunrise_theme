function createPDF() {
  var formData = {
    "paperSize": {
      "format": "A4",
      "orientation": "portrait",
      "border": "5mm"
    },
    "content": "{{> ../../templates/partials/common/product-print}}",
    "context": {
       "title": "Hello world",
       "createdAt": "2014-01-20T19:18:42.940Z"
    },
    "download": true
  };

  console.log(formData);
  // TODO Button to press that does it.
  $.ajax({
    type: "POST",
    url: "https://pdf.sphere.io/api/pdf/download",
    data: JSON.stringify(formData),
    success: function(data){console.log('ready');window.open(data);},
    dataType: "pdf",
    contentType : "application/pdf"
  });
}
