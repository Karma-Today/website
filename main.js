document.getElementById("lang-switch").addEventListener("change", function () {
  let lang = this.value;
  let cnContent = document.getElementById("karma-content_cn");
  let enContent = document.getElementById("karma-content_en");

  if (lang === "en") {
      enContent.classList.remove("hidden");
      cnContent.classList.add("hidden");
  } else {
      enContent.classList.add("hidden");
      cnContent.classList.remove("hidden");
  }
});
document.getElementById("lang-switch").dispatchEvent(new Event("change"));