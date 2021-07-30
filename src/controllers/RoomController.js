const Database = require("../db/config");

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId;
    let isRoom = true;

    while (isRoom) {
      //Gera o ID da Sala. */
      for (var i = 0; i < 6; i++) {
        //Não deixar que o numero "0" fique presente na URL, deixando o código da sala correto com os 6 digitos
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      //Verficar se o ID da sala já existe */ //A propriedade "some" compara um Id de sala um a um, o primeiro ID que for igual ele retorna TRUE */
      const roomExistIds = await db.all(`SELECT id FROM rooms`);
      isRoom = roomExistIds.some((roomExistId) => roomExistId === roomId);

      if (!isRoom) {
        //Inserir a sala no banco */
        await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room;
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
    let isNoQuestions 

    if(questions.length == 0) {
      if(questionsRead.length == 0) {
        isNoQuestions = true
      }
    }

    res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  } 


}
