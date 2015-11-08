'use strict';

/* global
  GoogleFu,
  HTTP,
  Meteor
*/


GoogleFu.Image = (() => {

  const GOOGLE_IMAGE_JSON_API_VERSION = '1.0';
  const GOOGLE_IMAGE_JSON_API_BASE_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
  const GOOGLE_THUMBNAIL_URL = 'http://t1.gstatic.com/images?q=tbn:';

  /*
   * validateQueryParams( opts:Options ):String
   *
   * Options : {
   *   userip : String,
   *   v : String, // Float
   *   q : String
   * }
   *
   * returns querystring parameters as hash table
   *
   */
  let validateQueryParams = ( opts ) => {
    const requiredOpts = ['userip','v','q'];
    let missingOpts = requiredOpts.filter( requiredKey =>  !opts.hasOwnProperty(requiredKey) );
    if(missingOpts.length > 0){
      throw new Error( `GoogleFu.Image : generateUrl() opts argument is missing required keys: ${missingOpts.join(", ")}`);
    }
    return opts;
  };

  class Image{

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - q : String, google image search query
     *
     * returns Array<String>, 4 top image result ids
     */
    static query(userip, q){

      let result;
      try{
        result = HTTP.get( GOOGLE_IMAGE_JSON_API_BASE_URL, {
          params : validateQueryParams({
            userip : userip,
            v : GOOGLE_IMAGE_JSON_API_VERSION,
            q : q
          })
        });
      }catch(error){
        throw new Error(`Fatal Error in GoogleFu.Image : query(${q}) HTTP.get(); ${error}`);
      }

      return JSON.parse(result.content).responseData.results.map( img => img.imageId );
    }

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - q : String, google image search query
     *
     * returns Array<{ url : String, dimensions : {width : Int, height : Int} }>, 4 top image thumbnail urls
     */
    static queryThumbnails(userip, q){
      let result;
      try{
        result = HTTP.get( GOOGLE_IMAGE_JSON_API_BASE_URL, {
          params : validateQueryParams({
            userip : userip,
            v : GOOGLE_IMAGE_JSON_API_VERSION,
            q : q
          })
        });
      }catch(error){
        throw new Error(`Fatal Error in GoogleFu.Image : query(${q}) HTTP.get(); ${error}`);
      }

      return JSON.parse(result.content).responseData.results.map( image => ({
        url: image.tbUrl,
        dimensions : {
          width : image.tbWidth,
          height : image.tbHeight
        }
      }));
    }

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - q : String, google image search query
     *
     * returns String, top image id
     */
    static getTop(userip, q){
      return Image.query(userip, q)[0];
    }

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - q : String, google image search query
     *
     * returns { url : String, dimensions : {width : Int, height : Int} }, top image thumbnail image object
     */
    static getTopThumbnail(userip, q){
      return Image.queryThumbnails(userip, q)[0];
    }

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - answer : String, google image search query generated by game
     *   - guess : String, google image search query guessed by player
     *
     * returns Bool, true if any guess results appear in any answer results
     */
    static match(userip, answer, guess){
      let guesses = Image.query(userip, guess);
      return Image.query(userip, answer).some( matching => guesses.indexOf(matching) > -1 ) ;
    }

  }

  return Image;
})();
