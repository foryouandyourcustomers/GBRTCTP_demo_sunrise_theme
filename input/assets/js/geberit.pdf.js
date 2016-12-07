function createPDF() {
  var formData = {
    "paperSize": {
      "format": "A4",
      "orientation": "portrait",
      "border": "5mm"
    },
    "content": "<html><head><meta charset=\"utf-8\"><title>A PDF page</title><style type=\"text/css\">body { font-family: \"Helvetica New\", Helvetica, Arial, sans-serif; font-size: 12px; }h1 { text-transform: uppercase; }</style></head><body><h1>{{title}}</h1><h2>{{formatDate createdAt}}</h2></body></html>",
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
    success: function(data){console.log('ready');console.log(data);},

  });
}
