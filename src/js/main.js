function generateRandomImage() {
    const imageSeed = new Date().getTime();
    return `<img alt="randomly generated image" src="https://picsum.photos/200?random&t=${imageSeed}">`;
}

function renderNewImage() {
    $("#res img").remove();
    $("#res").append(generateRandomImage());
}

function clearSuccessPrompt() {
    //remove success message if input field changes
    if ($("#email-error").length) {
        $(".success-prompt").text("");
    }
}

function calcOccurences(array) {
    const occurenceObject = {};

    for (let i = 0; i < array.length; i++) {
        occurenceObject[array[i]] = occurenceObject[[array[i]]]
            ? occurenceObject[[array[i]]] + 1
            : 1;
    }

    return occurenceObject;
}

function renderCollections() {
    const savedEmails = savedImages.map(item => item.email);
    const userFrequencies = calcOccurences(savedEmails);

    //collectionContainers conditionally generates HTML for each user based on number of respective saved images.
    const collectionContainers = savedImages.map(item => {
        const currentUser = item.email;
        const numberOfImagesOwned = userFrequencies[currentUser];

        if (numberOfImagesOwned == 1) {
            const HTMLString = `<details>
            <summary>${currentUser}</summary>
            <img src=${item.image} alt="a randomly generated image">
            </details>`;
            return HTMLString;
        } else if (numberOfImagesOwned > 1) {
            const currentImageArray = [];
            let HTMLImages = "";

            //Generate array of image srcs
            for (let i = 0; i < savedImages.length; i++) {
                if (savedImages[i].email == currentUser) {
                    currentImageArray.push(savedImages[i]["image"]);
                }
            }

            //Construct HTML String using image src array
            for (let i = 0; i < currentImageArray.length; i++) {
                HTMLImages += `<img src=${currentImageArray[i]} alt="a randomly generated image">`;
            }

            //Add container elements
            const HTMLString = `<details>
            <summary>${currentUser}</summary>${HTMLImages}</details>`;

            return HTMLString;
        }
    });

    const uniqueCollectionContainers = [...new Set(collectionContainers)];

    $("#collection").empty();
    uniqueCollectionContainers.forEach(HTMLString => {
        $("#collection").append(HTMLString);
    });
}

function updateCollection(email, image) {
    savedImages.push({
        email,
        image,
    });
}

function handleValidForm() {
    const currentImageSrc = $("#res img").prop("src");
    const formData = $("#submit-form").serializeArray();
    const submittedEmail = formData[0].value;
    $(".success-prompt").text("Image saved successfully");
    $("#submit-form").trigger("reset");
    updateCollection(submittedEmail, currentImageSrc);
    renderCollections();
    renderNewImage();
}

const savedImages = [];

//Add Initial image on load
$(() => renderNewImage());

$("#new-btn").on("click", () => {
    $(".success-prompt").text("");
    renderNewImage();
});

$("#email").on("input", () => {
    clearSuccessPrompt();
});

$("#submit-form").validate({
    submitHandler: handleValidForm,
    invalidHandler: function (form) {
        $(".success-prompt").text("");
    },
});
