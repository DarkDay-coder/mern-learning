class APIFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }
   filter() {
      // 1) FILTERING
      const queryObj = { ...this.queryStr };
      const excludeField = ['page', 'sort', 'limit', 'fileds'];
      excludeField.forEach((el) => delete queryObj[el]);
      // 2) ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `$${match}`
      );
      // console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }
   sort() {
      // 3) SORTING
      if (this.queryStr.sort) {
         const sortBy = this.queryStr.sort.split(',').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort('-createdAt');
      }
      return this;
   }
   limitFields() {
      // 4) FIELD LIMITING
      if (this.queryStr.fields) {
         const fields = this.queryStr.fields.split(', ').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }
   pagination() {
      // 5) PAGINATION
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);

      // if (this.queryStr.page) {
      //    const numTours = await Tour.countDocuments();
      //    if (skip >= numTours) {
      //       throw new Error("This page doesn't exist");
      //    }
      // }
      return this;
   }
}
module.exports = APIFeatures;
