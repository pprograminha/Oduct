"use strict";
var productCreated = 'http://localhost/projetos/linguagens/PHP_api-rest/api/productcreated/';
function getElementsCreatedProducts() {
    getContext(productCreated, function (products) {
        var items = document.querySelectorAll(' #created-items .gallery__sidebar-product-item');
        items.forEach(function (item) {
            item.remove();
        });
        products.map(function (product, i) {
            _('#created-items')
                .Child({
                Index: i,
                Element: 'div',
                Class: 'gallery__sidebar-product-item',
                Attribute: [{ Key: 'data-target-id', Value: String(product.id) }],
            })
                .Child({
                Element: 'div',
                Parent: '#created-items .gallery__sidebar-product-item',
                Class: 'gallery__sidebar-product-name-price',
            })
                .Child({
                Element: 'div',
                Class: 'gallery__sidebar-product-name',
                Parent: '#created-items .gallery__sidebar-product-name-price',
                Content: product.name,
            })
                .Child({
                Element: 'div',
                Class: 'gallery__sidebar-product-price',
                Parent: '#created-items .gallery__sidebar-product-name-price',
                Content: product.price,
            })
                .Child({
                Element: 'div',
                Class: 'gallery__sidebar-product-trash',
                Parent: '#created-items .gallery__sidebar-product-item',
            })
                .Child({
                Element: 'button',
                Parent: '#created-items .gallery__sidebar-product-trash',
                Class: 'gallery__sidebar-button-trash',
            })
                .Child({
                Element: 'i',
                Class: ['fa', 'fa-trash'],
                Parent: '#created-items .gallery__sidebar-button-trash',
            });
        });
        var buttonsTrash = document.querySelectorAll('.gallery__sidebar-button-trash');
        buttonsTrash.forEach(function (buttonTrash) {
            buttonTrash.addEventListener('click', function (_a) {
                var _b;
                var target = _a.target;
                var parent = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                var productId = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-target-id');
                __.ajax({
                    url: path + "api/productcreated/",
                    method: 'DELETE',
                    dataType: 'json',
                    data: { productId: productId },
                    success: function (response) {
                        var sidebarProductItems = document.querySelectorAll('.gallery__sidebar-product-item');
                        sidebarProductItems.forEach(function (sidebarProductItem) {
                            var id = sidebarProductItem.getAttribute('data-target-id');
                            if (response.datas.DeletedId == id) {
                                sidebarProductItem.remove();
                            }
                        });
                    },
                });
            });
        });
    });
}
var buttonGetCreated = document.getElementById('button-get-created');
buttonGetCreated === null || buttonGetCreated === void 0 ? void 0 : buttonGetCreated.addEventListener('click', function () {
    getElementsCreatedProducts();
});
