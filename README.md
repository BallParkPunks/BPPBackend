# BPP Backend
Collection of backend functions to support functionality of the frontend

## Endpoints
Use the [base url](https://ballparkpunks.wl.r.appspot.com) and append the desired endpoint along with its required parameters
* /get_price
  * Params
      * type: ID of pack type
      * amount: amount to purchase
  * Returns:
      * price of amount of item in Wei
      
* /get_total_mints
  * Params:
      * type: ID of type
  * Returns:
      * integer of amount minted
