module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: String,
      resumo: String,
      desenvolvedor: String,
      genero: String,
      plataforma: String,
      imagem: String,
      nota: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Game = mongoose.model("game", schema);
  return Game;
};

