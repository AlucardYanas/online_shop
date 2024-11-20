const { Router } = require('express');
const { Product } = require('../../db/models');
const { Op } = require('sequelize'); 

const productsRouter = Router();


productsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC', filter = '' } = req.query;
      const offset = (page - 1) * limit;

      const where = filter ? { name: { [Op.like]: `%${filter}%` } } : {};

      const products = await Product.findAndCountAll({
        where,
        order: [[sort, order]],
        limit: +limit,
        offset,
      });

      res.status(200).json({
        data: products.rows,
        total: products.count,
        page: +page,
        totalPages: Math.ceil(products.count / limit),
      });
    } catch (error) {
      console.log('Ошибка получения списка продуктов', error);
      res.status(500).json({
        message: 'Ошибка получения списка продуктов',
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { name, description, price, discountedPrice, sku, photo } = req.body;
      const newProduct = await Product.create({ name, description, price, discountedPrice, sku, photo });
      res.status(201).json(newProduct);
    } catch (error) {
      console.log('Ошибка добавления продукта', error);
      res.status(500).json({
        message: 'Ошибка добавления продукта',
      });
    }
  });

productsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.log('Ошибка получения продукта', error);
      res.status(500).json({
        message: 'Ошибка получения продукта',
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, discountedPrice, sku, photo } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      await product.update({ name, description, price, discountedPrice, sku, photo });
      res.status(200).json(product);
    } catch (error) {
      console.log('Ошибка редактирования продукта', error);
      res.status(500).json({
        message: 'Ошибка редактирования продукта',
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      await product.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log('Ошибка удаления продукта', error);
      res.status(500).json({
        message: 'Ошибка удаления продукта',
      });
    }
  });

productsRouter.get('/ssr/catalog', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC', filter = '' } = req.query;
    const offset = (page - 1) * limit;

    const where = filter ? { name: { [Op.like]: `%${filter}%` } } : {};

    const products = await Product.findAndCountAll({
      where,
      order: [[sort, order]],
      limit: +limit,
      offset,
    });

    res.status(200).json({
      data: products.rows,
      total: products.count,
      page: +page,
      totalPages: Math.ceil(products.count / limit),
    });
  } catch (error) {
    console.log('Ошибка получения каталога продуктов для SSR', error);
    res.status(500).json({
      message: 'Ошибка получения каталога продуктов для SSR',
    });
  }
});


productsRouter.get('/ssr/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log('Ошибка получения продукта для SSR', error);
    res.status(500).json({
      message: 'Ошибка получения продукта для SSR',
    });
  }
});

module.exports = productsRouter;
