"use strict";

function generateRandomImageSrc() {
  var imageSeed = new Date().getTime();
  return "https://picsum.photos/500/300?random&t=".concat(imageSeed);
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

  for (var email in savedImages) {
    var sizeOfCollection = savedImages[email].length;

    if (sizeOfCollection == 1) {
      var HTMLString = "<details>\n            <summary>".concat(email, "</summary>\n            <img src=").concat(savedImages[email][0], " alt=\"a randomly generated image\">\n            </details>");
      $("#collection").append(HTMLString);
    } else if (sizeOfCollection > 1) {
      var HTMLImageString = "";

      for (var i = 0; i < savedImages[email].length; i++) {
        HTMLImageString += "<img src=".concat(savedImages[email][i], " alt=\"a randomly generated image\">");
      }

      $("#collection").append("<details>\n            <summary>".concat(email, "</summary>").concat(HTMLImageString, "</details>"));
    }
  }
}

function updateCollection(email, image) {
  if (savedImages.hasOwnProperty(email)) {
    if (savedImages[email].includes(image)) {
      $(".success-prompt").text("Image already in collection.");
      $(".success-prompt").addClass("error");
    } else {
      savedImages[email].push(image);
    }
  } else if (!savedImages.hasOwnProperty(email)) {
    savedImages[email] = [image];
  }
}

function handleValidForm() {
  var currentImageSrc = $("#res img").prop("src");
  var formData = $("#submit-form").serializeArray();
  var submittedEmail = formData[0].value;
  $(".success-prompt").removeClass("error");
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

var savedImages = {}; //Add Initial image on load

$(function () {
  addEnterEventHandler();
  renderNewImage();
});
$("#new-btn").on("click", function () {
  $(".success-prompt").text("");
  renderNewImage();
});
$("#email").on("input", function () {
  clearSuccessPrompt();
});

$.validator.methods.email = function (value, element) {
  return this.optional(element) || /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
};

$("#submit-form").validate({
  submitHandler: handleValidForm,
  invalidHandler: function invalidHandler(form) {
    $(".success-prompt").text("");
  },
  rules: {
    email: {
      required: true,
      email: true
    }
  }
});
//# sourceMappingURL=all.js.map
