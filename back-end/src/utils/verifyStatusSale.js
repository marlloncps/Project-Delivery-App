const logicStatusSale = (sale) => {
  if (sale === null) {
    const status = 404;
    const message = 'Id da venda incorreto.';
    return { status, message };
  }
  if (sale === 0) {
    const status = 409;
    const message = 'Status igual o da venda';
    return { status, message };
  }

  if (sale === 1) {
    const status = 200;
    const message = 'Status alterado com sucesso';
    return { status, message };
  }
};

module.exports = logicStatusSale;