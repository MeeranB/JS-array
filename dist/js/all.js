"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function generateRandomImage() {
  var imageSeed = new Date().getTime();
  return "<img alt=\"randomly generated image\" src=\"https://picsum.photos/200?random&t=".concat(imageSeed, "\">");
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
  var occurenceObject = {};

  for (var i = 0; i < array.length; i++) {
    occurenceObject[array[i]] = occurenceObject[[array[i]]] ? occurenceObject[[array[i]]] + 1 : 1;
  }

  return occurenceObject;
}

function renderCollections() {
  var savedEmails = savedImages.map(function (item) {
    return item.email;
  });
  var userFrequencies = calcOccurences(savedEmails); //collectionContainers conditionally generates HTML for each user based on number of respective saved images.

  var collectionContainers = savedImages.map(function (item) {
    var currentUser = item.email;
    var numberOfImagesOwned = userFrequencies[currentUser];

    if (numberOfImagesOwned == 1) {
      var HTMLString = "<details>\n            <summary>".concat(currentUser, "</summary>\n            <img src=").concat(item.image, " alt=\"a randomly generated image\">\n            </details>");
      return HTMLString;
    } else if (numberOfImagesOwned > 1) {
      var currentImageArray = [];
      var HTMLImages = ""; //Generate array of image srcs

      for (var i = 0; i < savedImages.length; i++) {
        if (savedImages[i].email == currentUser) {
          currentImageArray.push(savedImages[i]["image"]);
        }
      } //Construct HTML String using image src array


      for (var _i = 0; _i < currentImageArray.length; _i++) {
        HTMLImages += "<img src=".concat(currentImageArray[_i], " alt=\"a randomly generated image\">");
      } //Add container elements


      var _HTMLString = "<details>\n            <summary>".concat(currentUser, "</summary>").concat(HTMLImages, "</details>");

      return _HTMLString;
    }
  });

  var uniqueCollectionContainers = _toConsumableArray(new Set(collectionContainers));

  $("#collection").empty();
  uniqueCollectionContainers.forEach(function (HTMLString) {
    $("#collection").append(HTMLString);
  });
}

function updateCollection(email, image) {
  savedImages.push({
    email: email,
    image: image
  });
}

function handleValidForm() {
  var currentImageSrc = $("#res img").prop("src");
  var formData = $("#submit-form").serializeArray();
  var submittedEmail = formData[0].value;
  $(".success-prompt").text("Image saved successfully");
  $("#submit-form").trigger("reset");
  updateCollection(submittedEmail, currentImageSrc);
  renderCollections();
  renderNewImage();
}

var savedImages = []; //Add Initial image on load

$(function () {
  return renderNewImage();
});
$("#new-btn").on("click", function () {
  $(".success-prompt").text("");
  renderNewImage();
});
$("#email").on("input", function () {
  clearSuccessPrompt();
});
$("#submit-form").validate({
  submitHandler: handleValidForm,
  invalidHandler: function invalidHandler(form) {
    $(".success-prompt").text("");
  }
});
//# sourceMappingURL=all.js.map
