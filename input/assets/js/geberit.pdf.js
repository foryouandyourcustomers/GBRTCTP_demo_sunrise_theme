function createPDF() {
  var templateString = `
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>
  <link rel='icon' href='{{meta.absolutePath}}{{meta.assetsPath}}img/favicon.ico'>
  <link href='{{meta.absolutePath}}{{meta.assetsPath}}css/print.css' rel='stylesheet'>
  <title>{{header.title}}</title>
</head>

<body>
<div id='page-header'>
  <a href='{{meta.absolutePath}}{{meta._links.home.href}}' class='brand-logo pull-right'>
    <img style='width: 160px;float: right;' src='{{meta.absolutePath}}{{meta.assetsPath}}img/logo.svg' alt='Geberit'>
  </a>
</div>
<div class='front-page'>
  <h1>Geberit<br>Mein<br>Katalog </h1>
</div>
<!--<div class='page-break'></div>-->
<div class='cart-page'>
  <table>

    {{#each content.cart.lineItems.list}}
      <tr class='item'>
        <td>
          <img style='width:80px;' src='{{meta.absolutePath}}{{variant.image}}' alt='{{variant.name}}'>

        </td>
        <td>
          <p class='cart-item-name'>
            <a href='{{meta.absolutePath}}{{variant.url}}'>{{variant.name}}</a>
          </p>
          <p class='grey-p'>{{variant.sku}}</p>
          <p class='cart-attributes'>
            {{#each attributes}}
              {{name}}: 
              <span class='black-p' data-model='cartItem.{{key}}'>{{value}}</span>
              {{#unless @last}}<br>{{/unless}}
            {{/each}}
          </p>
        </td>
        <td>
          <div class='text-right cart-item-price'>
            <span class='visible-xs xs-price-title'>Preis</span>
            <span>{{variant.price}}</span>
          </div>
        </td>
      </tr>
    {{/each}}

  </table>

</div>

</body>

</html>
`;

  $.getJSON("../../assets/fonts/staticCartExample.json", function(data){
    data.meta.absolutePath = window.location.origin + window.location.pathname + "/../";
    var formData = {
      "paperSize": {
        "format": "A4",
        "orientation": "portrait",
        "border": "10mm"
      },  
      "content": templateString,
      "context": data,
      "download": true
    };

    console.dir(formData);
    $.ajax({
      type: "POST",
      // need a local instance for developing (local build not accessible from the cloud PDF gen)
      // url: "http://localhost:3999/api/pdf/url",
      url: "https://pdf.sphere.io/api/pdf/url",
      data: JSON.stringify(formData),
      success: function(data){
        // console.log(data);
        window.location = data.url;
      },
      dataType: "json",
      contentType : "application/json"
    });
  });

}
