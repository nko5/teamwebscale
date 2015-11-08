'use strict';

/* global
  GoogleFu
  HTTP
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
        throw new Error(`Fatal Error in GoogleFu.Image : query(${q}) HTTP.get( ${queryURL} ); ${error}`);
      }

      return JSON.parse(result.content).responseData.results.map( img => img.imageId );
    }

    /*
     * params:
     *   - userip : String, requester's ip address
     *   - q : String, google image search query
     *
     * returns Array<String>, 4 top image thumbnail urls
     */
    static queryThumbnails(userip, q){
      return Image.query(userip, q).map( imageId => `${GOOGLE_THUMBNAIL_URL}${imageId}` );
    }

    static getTop(){
      return false;
    }

    static getTopThumbnail(){
      return false;
    }

  }

  return Image;
})();
