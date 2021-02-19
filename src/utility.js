/* View Table Live Fields */
export function liveTableUpdate(tgt, postTarget, params) {
  // tgt = table cell containing checkbox
  // $.ajax({
  //   type: "POST",
  //   url: postTarget,
  //   data: params,
  //   cache: false,
  //   success: function(content) {
  //     var success = false;
  //     if (typeof content == 'object') {
  //       if (content.status == "SUCCESS") {
  //         success = true;
  //       } else if (content.status == "ERROR") {
  //         showErrorMessage(content.messages ? content.messages[0] : "Oops, something went wrong :(");
  //       }
  //     } else {
  //       showSystemMessages(content, 3);
  //       var status = $("#status").val();
  //       if (status == 'success') {
  //         success = true;
  //       }
  //     }
  //     if (success) {
  //       // if ($(tgt).parent().parent().parent().parent().hasClass("schedule-status")) {
  //       //   $(tgt).parent().parent().parent().animate({ backgroundColor: "#ffffaa" }, 84).delay(210).animate({ backgroundColor: "#f2f2f2" }, 690);
  //       // } else {
  //       //   $(tgt).animate({ backgroundColor: "#e3ebf6" }, 84).delay(210).animate({ backgroundColor: "#ffffff" }, 690);
  //       // }
  //     }
  //   },
  //   error: function(request, textStatus, errorThrown) {
  //     // showErrorMessage(errorThrown);
  //   }
  // });
}
