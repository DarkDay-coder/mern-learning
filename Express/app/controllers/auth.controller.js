class AuthController {
   registerProcess = (req, res, next) => {
      res.json({
         result: {
            email: '',
            password: '',
            name: '',
            address: '',
         },
         status: true,
         msg: 'Registered success',
      });
   };

   loginProcess = (req, res, next) => {
      // query param
      let query = req.query;
      let params = req.params;
      let body = req.body;

      res.json({
         result: {
            query: query,
            params: params,
            body: body,
         },
         status: true,
         msg: 'Login Success',
      });
   };
}

module.exports = AuthController;
