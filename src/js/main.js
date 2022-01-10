function generateRandomImageSrc() {
    const imageSeed = new Date().getTime();
    return `https://picsum.photos/500/300?random&t=${imageSeed}`;
}

function renderNewImage() {
    $("#res img").attr("src", generateRandomImageSrc());
}

function clearSuccessPrompt() {
    //remove success message if input field changes
    if ($("#email-error").length) {
        $(".success-prompt").text("");
    }
}

function renderCollectionsObj() {
    $("#collection").empty();

    for (const email in savedImages) {
        const sizeOfCollection = savedImages[email].length;

        if (sizeOfCollection == 1) {
            const HTMLString = `<details>
            <summary>${email}</summary>
            <img src=${savedImages[email][0]} alt="a randomly generated image">
            </details>`;
            $("#collection").append(HTMLString);
        } else if (sizeOfCollection > 1) {
            let HTMLImageString = "";
            for (let i = 0; i < savedImages[email].length; i++) {
                HTMLImageString += `<img src=${savedImages[email][i]} alt="a randomly generated image">`;
            }
            $("#collection").append(`<details>
            <summary>${email}</summary>${HTMLImageString}</details>`);
        }
    }
}

function updateCollection(email, image) {
    if (savedImages.hasOwnProperty(email)) {
        savedImages[email].push(image);
    } else if (!savedImages.hasOwnProperty(email)) {
        savedImages[email] = [image];
    }
}

function handleValidForm() {
    const currentImageSrc = $("#res img").prop("src");
    const formData = $("#submit-form").serializeArray();
    const submittedEmail = formData[0].value;
    $(".success-prompt").text("Image saved successfully");
    $("#submit-form").trigger("reset");
    updateCollection(submittedEmail, currentImageSrc);
    renderCollectionsObj();
    $("#submit-form").trigger("reset");
}

function addEnterEventHandler() {
    $(document).on("keypress", function (e) {
        if (!$("#new-btn").is(":focus")) {
            if (e.key == "Enter") {
                $("#submit-form").trigger("submit");
                return false;
            }
        }
    });
}

const savedImages = {};

//Add Initial image on load
$(() => {
    addEnterEventHandler();
});

$("#new-btn").on("click", () => {
    $(".success-prompt").text("");
    renderNewImage();
});

$("#email").on("input", () => {
    clearSuccessPrompt();
});

$.validator.methods.email = function (value, element) {
    return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
};

$("#submit-form").validate({
    submitHandler: handleValidForm,
    invalidHandler: function (form) {
        $(".success-prompt").text("");
    },
    rules: {
        email: {
            required: true,
            email: true,
        },
    },
});
