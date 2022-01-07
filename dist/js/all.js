"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function generateImageSeed() {
  return new Date().getTime();
}

function generateRandomImage() {
  return "<img alt=\"randomly generated image\" src=\"https://picsum.photos/200?random&t=".concat(generateImageSeed(), "\">");
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
    email: email,
    image: image
  });
  var counts = {};
  var savedEmails = savedImages.map(function (item) {
    return item.email;
  });

  for (var i = 0; i < savedEmails.length; i++) {
    counts[savedEmails[i]] = counts[[savedEmails[i]]] ? counts[[savedEmails[i]]] + 1 : 1;
  }

  var collectionContainers = savedImages.map(function (item) {
    if (counts[item.email] == 1) {
      var HTMLString = "<details>\n            <summary>".concat(item.email, "</summary>\n            <img src=").concat(item.image, " alt=\"a randomly generated image\">\n            </details>");
      return HTMLString;
    } else {
      var currentImageArray = [];

      var _HTMLString = "<details>\n            <summary>".concat(item.email, "</summary>");

      for (var _i = 0; _i < savedImages.length; _i++) {
        if (savedImages[_i].email == item.email) {
          currentImageArray.push(savedImages[_i]["image"]);
        }
      }

      console.log(currentImageArray);

      for (var _i2 = 0; _i2 < currentImageArray.length; _i2++) {
        _HTMLString = _HTMLString + "<img src=".concat(currentImageArray[_i2], " alt=\"a randomly generated image\">");
      }

      _HTMLString = _HTMLString + "</details>";
      return _HTMLString;
    }
  });

  var uniqueCollectionContainers = _toConsumableArray(new Set(collectionContainers));

  $("#collection").empty();
  uniqueCollectionContainers.forEach(function (HTMLString) {
    $("#collection").append(HTMLString);
  });
}

function handleValidForm() {
  var currentImage = getCurrentImageSrc();
  var formData = $("#submit-form").serializeArray();
  var submittedEmail = formData[0].value;
  $(".success-prompt").text("Image saved successfully");
  $("#submit-form").trigger("reset");
  updateCollection(submittedEmail, currentImage);
  $(".success-prompt").text("");
  $("#res img").remove();
  $("#res").append(generateRandomImage());
}

var savedImages = []; //Add Initial image on load

$(function () {
  return $("#res").append(generateRandomImage());
});
$("#new-btn").on("click", function () {
  $(".success-prompt").text("");
  $("#res img").remove();
  $("#res").append(generateRandomImage());
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
