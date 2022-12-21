module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        autor: String,
        review: String,
        nota: Number,
        gameId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Review = mongoose.model("review", schema);
    return Review;
  };
  