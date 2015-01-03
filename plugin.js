/*global _*/

function fusselGalleryHack() {

    var
        linkSelector = '.gg-link.gg-colorbox',
        images,
        galleryTemplate = _.template(
            '   <div class="fsg-image-cur">' +
            '       <img src="<%- curImage %>" alt="" />' +
            '       <div class="fsg-image-cur-title">' +
            '           <span><%- curImageTitle %></span>' +
            '       </div>' +
            '   </div>' +
            '   <div class="fsg-image-prev"><img src="<%- prevImage %>" /></div>' +
            '   <div class="fsg-image-next"><img src="<%- nextImage %>" alt="" /></div>'
        ),
        ensureGallery = _.once(createGallery),
        galleryControl = (function () {

            var
                currentImageIndex = 0,

                focusCurrentImage = function () {
                    console.log('focus image ' + currentImageIndex);
                    document.querySelector('.fsg-image-prev img').setAttribute('src', images[makeValidIndex(currentImageIndex - 1)]);
                    document.querySelector('.fsg-image-cur img').setAttribute('src', images[currentImageIndex]);
                    document.querySelector('.fsg-image-next img').setAttribute('src', images[makeValidIndex(currentImageIndex + 1)]);
                    document.querySelector('.fsg-image-cur-title span').textContent = getDescription(images[currentImageIndex]);
                },
                makeValidIndex = function (idx) {
                    if (idx < 0) {
                        idx = images.length - 1;
                    }
                    idx = idx % images.length;

                    return idx;
                },
                setImageIndex = function (idx) {
                    currentImageIndex = makeValidIndex(idx);
                }

            return {
                select: function (idx) {
                    setImageIndex(idx);
                    focusCurrentImage();
                },
                next: function () {
                    setImageIndex(currentImageIndex + 1);
                    focusCurrentImage()
                },
                prev: function () {
                    setImageIndex(currentImageIndex - 1);
                    focusCurrentImage();
                }
            };
        }());

    function getDescription(imageUrl) {
        var
            anchorTitle = document.querySelector('a[href="' + imageUrl + '"]').getAttribute('title'),
            imageCaption = document.querySelector('a[href="' + imageUrl + '"] figcaption span').textContent;
        return imageCaption + ' | ' + anchorTitle;
    }


    function createGallery() {
        var galleryNode = document.createElement('div');

        galleryNode.setAttribute('class', 'fsg-images');
        galleryNode.innerHTML = galleryTemplate({
            prevImage: '',
            curImage: images[0],
            curImageTitle: getDescription(images[0]),
            nextImage: images[1]
        });
        document.body.appendChild(galleryNode)


        function nextImageEventHandler(event) {
            event.stopPropagation();
            galleryControl.next();
        }
        function prevImageEventHandler(event) {
            event.stopPropagation();
            galleryControl.prev();
        }
        function closeGalleryEventHandler(event) {
            var galleryNode = document.querySelector('.fsg-images');
            console.debug('closing gallery');
            event.stopPropagation();
            //galleryNode.parentNode.removeChild(galleryNode);
            galleryNode.style.display = 'none';
        }

        document.querySelector('.fsg-images').addEventListener('click', closeGalleryEventHandler);
        document.querySelector('.fsg-image-prev').addEventListener('click', prevImageEventHandler);
        document.querySelector('.fsg-image-cur img').addEventListener('click', nextImageEventHandler);
        document.querySelector('.fsg-image-next').addEventListener('click', nextImageEventHandler);

        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 27) {
                closeGalleryEventHandler(event);
            }
        });
    }

    function openGallery(idx, event) {
        console.log(arguments);
        event.preventDefault();
        ensureGallery();
        document.querySelector('.fsg-images').style.display = 'block';
        galleryControl.select(idx);
    }

    images = _.map(document.querySelectorAll('[id^="post-"] ' + linkSelector), function (parentAnchor, idx) {
        var
            imageUrl = parentAnchor.href;
        parentAnchor.addEventListener('click', _.partial(openGallery, idx));
        return imageUrl;
    });

}
