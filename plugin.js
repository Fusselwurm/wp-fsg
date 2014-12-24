/*global _*/

(function () {

    var
        linkSelector = '.gg-link.gg-colorbox',
        images,
        galleryTemplate = _.template(
            '   <div class="fsg-image-prev"><img src="<%- prevImage %>" /></div>' +
            '   <div class="fsg-image-cur"><img src="<%- curImage %>" /></div>' +
            '   <div class="fsg-image-next"><img src="<%- nextImage %>" /></div>'
        ),
        ensureGallery = _.once(createGallery);

    function createGallery() {
        var galleryNode = document.createElement('div');

        galleryNode.setAttribute('class', 'fsg-images');
        galleryNode.innerHTML = galleryTemplate({
            prevImage: '',
            curImage: images[0],
            nextImage: images[1]
        });
        document.body.appendChild(galleryNode)
    }

    function focusImage(idx) {
        console.log('focus image ' + idx);
        document.querySelector('.fsg-image-prev img').setAttribute('src', images[idx - 1] || '');
        document.querySelector('.fsg-image-cur img').setAttribute('src', images[idx]);
        document.querySelector('.fsg-image-next img').setAttribute('src', images[idx + 1]  || '');
    }

    function openGallery(idx, event) {
        console.log(arguments);
        event.preventDefault();
        ensureGallery();
        focusImage(idx);
    }

    images = _.map(document.querySelectorAll('[id^="post-"] ' + linkSelector), function (parentAnchor, idx) {
        var
            imageUrl = parentAnchor.href;
        parentAnchor.addEventListener('click', _.partial(openGallery, idx));
        return imageUrl;
    });

}());
