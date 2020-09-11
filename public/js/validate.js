$(document).ready(function () {
  $("form").validate({
    rules: {
      shtno: {
        maxlength: 10,
        number: true,
      },
    },
  });
});
