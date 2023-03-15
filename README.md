# BPP Backend
Collection of backend functions to support functionality of the frontend

## Endpoints
Use the [base url](https://ballparkpunks.wl.r.appspot.com) and append the desired endpoint along with its required parameters
* /[get_price](https://github.com/BallParkPunks/BPPBackend/tree/main/functions/GetPrice.js)
  * Params
      * type: ID of pack type
      * amount: amount to purchase
  * Returns:
      * price of amount of item in Wei
      
* /[get_total_mints](https://github.com/BallParkPunks/BPPBackend/tree/main/functions/GetTotalMints.js)
  * Params:
      * type: ID of type
  * Returns:
      * integer of amount minted
