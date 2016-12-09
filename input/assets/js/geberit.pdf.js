function createPDF() {
  var cartModel = window.cartModel;
  var templateString = `
<html>

<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>
  <meta name='description' content=''>
  <meta name='author' content=''>
  <meta name='generator' content='commercetools' />
  <link rel='icon' href='{{@root.meta.assetsPath}}img/favicon.ico'>
  <link href='{{@root.meta.assetsPath}}css/print.css' rel='stylesheet'>
  <title>{{header.title}}</title>
</head>

<body>
  <header id='page-header'>
    <a href='{{@root.meta._links.home.href}}' class='brand-logo pull-right'>
      <img style='width: 160px;float: right;' src='{{@root.meta.assetsPath}}img/logo.svg' alt='Geberit'>
    </a>
  </header>
  <div class='front-page'>
    <h1>Geberit<br>Mein<br>Katalog </h1>
  </div>
  <div class='page-break'></div>
  <div class='cart-page'>
    <table>

      {{#each cart.lineItems.list}}
        <tr class='item'>
          <td>
            <img style='width:80px;' src='{{variant.image}}' alt='{{variant.name}}'>

          </td>
          <td>
            <p class='cart-item-name'>
              <a href='{{variant.url}}'>{{variant.name}}</a>
            </p>
            <p class='grey-p'>{{variant.sku}}</p>
            <p class='cart-attributes'>
              {{#each attributes}}
                {{name}}
                <span class='black-p' data-model='cartItem.{{key}}'>{{value}}</span>
                {{#unless @last}}<br>{{/unless}}
              {{/each}}
            </p>
            {{#unless ../ordered}}
              <p class='cart-item-availability grey-p'>
                <span class='glyphicon glyphicon-ok-sign'></span>verfügbar
              </p>
            {{/unless}}
          </td>

          <td>
            <div class='text-right cart-item-price'>
              <span class='visible-xs xs-price-title'>Preis</span>
              {{#if variant.priceOld}}
                <span class='discounted-price'>{{variant.priceOld}}</span>
              {{/if}}
              <span>{{variant.price}}</span>
            </div>
          </td>
          <td>
            <div class='text-right cart-item-price'>
              <span class='visible-xs xs-price-title'>Summe</span>
              <span>{{totalPrice}}</span>
            </div>
          </td>
        </tr>
      {{/each}}

    </table>

  </div>

</body>

</html>
`;
  var formData = {
    "paperSize": {
      "format": "A4",
      "orientation": "portrait",
      "border": "5mm"
    },
    "content": templateString,
    "context": cartModel,
    "download": true
  };

  console.log(formData);
  $.ajax({
    type: "POST",
    url: "https://pdf.sphere.io/api/pdf/url",
    data: JSON.stringify(formData),
    success: function(data){
      console.log(data);
      window.location = data.url;
    },
    dataType: "json"
  });
}
