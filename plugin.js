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
        ensureGallery = _.once(createGallery),
        galleryControl = (function () {

            var
                currentImageIndex = 0,

                focusCurrentImage = function () {

                    console.log('focus image ' + currentImageIndex);
                    document.querySelector('.fsg-image-prev img').setAttribute('src', images[currentImageIndex - 1] || '');
                    document.querySelector('.fsg-image-cur img').setAttribute('src', images[currentImageIndex]);
                    document.querySelector('.fsg-image-next img').setAttribute('src', images[currentImageIndex + 1]  || '');
                };

            return {
                select: function (idx) {
                    currentImageIndex = idx;
                    focusCurrentImage();
                },
                next: function () {
                    currentImageIndex++;
                    currentImageIndex = currentImageIndex % images.length;
                    focusCurrentImage()
                },
                prev: function () {
                    currentImageIndex--;
                    if (currentImageIndex < 0) {
                        currentImageIndex = images.length - 1;
                    }
                    focusCurrentImage();
                }
            };
        }())

    function createGallery() {
        var galleryNode = document.createElement('div');

        galleryNode.setAttribute('class', 'fsg-images');
        galleryNode.innerHTML = galleryTemplate({
            prevImage: '',
            curImage: images[0],
            nextImage: images[1]
        });
        document.body.appendChild(galleryNode)


        function nextImageEventHandler(event) {
            event.stopPropagation();
            galleryControl.next();
        }
        function prevImageEventHandler(event) {
            alert('halololoo');
            event.stopPropagation();
            galleryControl.prev();
        }
        function closeGalleryEventHandler(event) {
            var galleryNode = document.querySelector('.fsg-images');
            console.debug('closing gallery');
            event.stopPropagation();
            galleryNode.parentNode.removeChild(galleryNode);
        }

        document.querySelector('.fsg-images').addEventListener('click', closeGalleryEventHandler);
        document.querySelector('.fsg-image-prev').addEventListener('click', prevImageEventHandler);
        document.querySelector('.fsg-image-cur img').addEventListener('click', nextImageEventHandler);
        document.querySelector('.fsg-image-next').addEventListener('click', nextImageEventHandler);

    }

    function openGallery(idx, event) {
        console.log(arguments);
        event.preventDefault();
        ensureGallery();
        galleryControl.select(idx);
    }

    images = _.map(document.querySelectorAll('[id^="post-"] ' + linkSelector), function (parentAnchor, idx) {
        var
            imageUrl = parentAnchor.href;
        parentAnchor.addEventListener('click', _.partial(openGallery, idx));
        return imageUrl;
    });

}());
