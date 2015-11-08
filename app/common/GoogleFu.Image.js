'use strict';

/* global
  GoogleFu
  HTTP
  Meteor
*/


GoogleFu.Image = (() => {

  const GOOGLE_IMAGE_JSON_API_VERSION = '1.0';
  const GOOGLE_IMAGE_JSON_API_BASE_URL = 'https://ajax.googleapis.com/ajax/services/search/images';

  /*
   * generateUrl( url:String, opts:Options ):String
   *
   * Options : {
   *   userip : String,
   *   v : String, // Float
   *   q : String
   * }
   *
   * returns a url with querystring parameters
   *
   */
  let generateUrl = ( url, opts ) => {
    const requiredOpts = ['userip','v','q'];
    let missingOpts = requiredOpts.filter( requiredKey =>  !opts.hasOwnProperty(requiredKey) );
    if(missingOpts.length > 0){
      throw new Error( `GoogleFu.Image : generateUrl() opts argument is missing required keys: ${missingOpts.join(", ")}`);
    }
    let params = Object.keys(opts).map( key => `${key}=${encodeURIComponent(opts[key])}` ).join('&');
    return `${url}?${params}`;
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
      let queryURL = generateUrl( GOOGLE_IMAGE_JSON_API_BASE_URL, {
        userip : userip,
        v : GOOGLE_IMAGE_JSON_API_VERSION,
        q : q
      });

      let result;
      try{
        result = HTTP.get( queryURL );
      }catch(error){
        throw new Error(`Fatal Error in GoogleFu.Image : query(${q}) HTTP.get( ${queryURL} ); ${error}`);
      }

      return JSON.parse(result.content).responseData.results.map( img => img.imageId );
    }

    static queryThumbnails(){
      return false;
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
