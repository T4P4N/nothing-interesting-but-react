const getLastSearches = (urls) => {
  // uniq filters out the array for any dupes
  console.log(urls);

  // Somethings wrong here may found page 202?
  // on fivevith time
  var fixme = urls
    // Slice it to last five ones but not including current one
    .slice(-5, -1)
    // .slice(-6)
    // .slice(0, -1)
    .map((url) => extractSearchTerm(url));

  var fixed = uniq(fixme);

  console.log("->>", fixme);
  console.log("->>", fixed);

  return fixed;
};
