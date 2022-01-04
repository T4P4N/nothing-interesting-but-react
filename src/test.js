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

// How things work in background
// const extractSearchTerm = (url) => {
//   const PARAM_SEARCH = 'query='
//   return url // https://www.example.com/search?query=react&page=0
//     .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&")) //query=react
//     .replace(PARAM_SEARCH, ""); // react
// };

// var url = extractSearchTerm('https://www.example.com/search?query=HelloWorld&page=0');
// console.log(url)

<div className="post-container">
  <List data={stories.data} onRemoveItem={handleRemoveStory} />
</div>;

{
  stories.isLoading && !stories.hasMoreLoading ? (
    <div className="post-container">
      <Shimmer idx={1} />
      {/* [1,2,3,4,5].map((index) => <Shimmer idx={index} />) */}
    </div>
  ) : (
    <>
      <div className="post-container">
        <List data={stories.data} onRemoveItem={handleRemoveStory} />
      </div>
      {stories.hasMoreLoading ? (
        <div className="post-container">has more true</div>
      ) : (
        <button type="button" className="more-btn" onClick={handleMore}>
          load more
        </button>
      )}
    </>
  );
}
