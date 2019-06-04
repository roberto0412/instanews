$(function() {
  $("select").on("change", function() {
    const section = $(this).val();
    // console.log(section);
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=TGUafZr6GLIQMSeuKro7lIaTPAUq4U5c"
    }).done(function(data) {
      $(".lines").html("");
      $.each(data.results, function(key, value) {
        console.log(data.results);
        try {
          $(".lines").append(`
            <li><a href= '${
              data.results[key].url
            }'><div class="images" style="background-image:url('${data.results[key].multimedia[4].url}')"><div class="abstract"> <p class=ptop>'${data.results[key].abstract}'</p></div> </div></a></li>
        `);
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
