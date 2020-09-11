$(document).ready(function () {
  $("form").validate({
    rules: {
      shtno: {
        maxlength: 10,
        number: true,
      },
      srollno: {
        maxlength: 6,
        number: true,
      },
      stel: {
        required: true,
        maxlength: 10,
        number: true,
      },
      disease1: {
        required: true,
      },
      disease2: {
        required: true,
      },
      disease3: {
        required: true,
      },
      disease4: {
        required: true,
      },
      sgroup: {
        required: true,
      },
    },
  });
});
