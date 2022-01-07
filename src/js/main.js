function generateImageSeed() {
    return new Date().getTime();
}

function generateRandomImage() {
    return `<img alt="randomly generated image" src="https://picsum.photos/200?random&t=${generateImageSeed()}">`;
}

function getCurrentImageSrc() {
    return $("#res img").prop("src");
}

function clearSuccessPrompt() {
    //remove success message if input field changes
    if ($("#email-error").length) {
        $(".success-prompt").text("");
    }
}

function updateCollection(email, image) {
    savedImages.push({
        email,
        image,
    });

    const counts = {};
    const savedEmails = savedImages.map(item => item.email);

    for (let i = 0; i < savedEmails.length; i++) {
        counts[savedEmails[i]] = counts[[savedEmails[i]]]
            ? counts[[savedEmails[i]]] + 1
            : 1;
    }

    const collectionContainers = savedImages.map(item => {
        if (counts[item.email] == 1) {
            const HTMLString = `<details>
            <summary>${item.email}</summary>
            <img src=${item.image} alt="a randomly generated image">
            </details>`;
            return HTMLString;
        } else {
            const currentImageArray = [];
            let HTMLString = `<details>
            <summary>${item.email}</summary>`;

            for (let i = 0; i < savedImages.length; i++) {
                if (savedImages[i].email == item.email) {
                    currentImageArray.push(savedImages[i]["image"]);
                }
            }
            console.log(currentImageArray);
            for (let i = 0; i < currentImageArray.length; i++) {
                HTMLString =
                    HTMLString +
                    `<img src=${currentImageArray[i]} alt="a randomly generated image">`;
            }
            HTMLString = HTMLString + `</details>`;
            return HTMLString;
        }
    });

    const uniqueCollectionContainers = [...new Set(collectionContainers)];

    $("#collection").empty();
    uniqueCollectionContainers.forEach(HTMLString => {
        $("#collection").append(HTMLString);
    });
}

function handleValidForm() {
    const currentImage = getCurrentImageSrc();
    const formData = $("#submit-form").serializeArray();
    const submittedEmail = formData[0].value;
    $(".success-prompt").text("Image saved successfully");
    $("#submit-form").trigger("reset");
    updateCollection(submittedEmail, currentImage);
    $(".success-prompt").text("");
    $("#res img").remove();
    $("#res").append(generateRandomImage());
}

const savedImages = [];

//Add Initial image on load
$(() => $("#res").append(generateRandomImage()));

$("#new-btn").on("click", () => {
    $(".success-prompt").text("");
    $("#res img").remove();
    $("#res").append(generateRandomImage());
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
