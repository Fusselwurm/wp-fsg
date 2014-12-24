/*global _*/

(function () {

    var
        linkSelector = '.gg-link.gg-colorbox',
        images,
        galleryTemplate = _.template('<ul class="fsg-image-list"><%= images %></ul>'),
        galleryImageTemplate = _.template('<li class="fsg-image"><img src="<%- imageUrl %>" /></li>'),
        ensureGallery = _.once(createGallery);

    function createGallery() {
        var galleryNode = document.createElement('div');

        galleryNode.innerHTML = galleryTemplate({
            images: images.map(function (imageUrl) {
                return galleryImageTemplate({imageUrl: imageUrl});
            }).join('\n')
        });
        document.body.appendChild(galleryNode)
    }

    function openGallery(idx, event) {
        console.log(arguments);
        event.preventDefault();
        ensureGallery();
    }

    images = _.map(document.querySelectorAll('[id^="post-"] ' + linkSelector), function (parentAnchor, idx) {
        var
            imageUrl = parentAnchor.href;
        parentAnchor.addEventListener('click', _.partial(openGallery, idx));
        return imageUrl;
    });

    console.log(images);

}());
