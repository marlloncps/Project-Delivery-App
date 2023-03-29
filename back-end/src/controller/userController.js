const { getUser, findAllUsers, create, deleteUser } = require('../service/userService');
const JwtAuth = require('../utils/Authentication');

const returnIdUser = async (req, res) => {
  const { email } = req.params;
  try {
  const user = await getUser(email);
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: 'Usuário não existe no banco de dados' });
  } catch (error) {
    return res.status(400).json({ message: 'Try Again later' });
  }
};

const returnAllUsers = async (req, res) => {
  try {
  const users = await findAllUsers();
  if (users) return res.status(200).json(users);
  return res.status(404).json({ message: 'Banco de dados sem usuários' });
  } catch (error) {
    return res.status(400).json({ message: 'Try again later' });
  }
};

const createUser = async (req, res) => {
  if (JwtAuth.validation(req.headers.authorization)) {
    try {
      const user = await create(req.body);
      if (user) return res.status(201).send('Created');
    } catch (error) {
    return res.status(409).send(error.message);
    }
  }
  return res.status(400).send('Token not found');
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  if (JwtAuth.validation(req.headers.authorization)) {
    try {
      const user = await deleteUser(id);
      if (user) return res.status(200).send('Usuário deletado com sucesso');
      return res.status(404).send('Falha ao excluir usuário');
    } catch (error) {
      return res.status(400).json({ message: `Try again later ${error.message}` });
    }
  }
  return res.status(400).send('Token not found');
};

module.exports = { returnIdUser, returnAllUsers, createUser, deleteUsers };