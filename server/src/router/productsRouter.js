const { Router } = require('express');
const { Product } = require('../../db/models');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

const productsRouter = Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads')); // Папка для загрузки
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });


productsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'DESC',
        name = '',
        priceMin = 0,
        priceMax = Infinity,
      } = req.query;

      const offset = (page - 1) * limit;

      const where = {};
      if (name) {
        where.name = { [Op.like]: `%${name}%` };
      }
      if (priceMin) {
        where.price = { ...where.price, [Op.gte]: +priceMin };
      }
      if (priceMax && priceMax !== Infinity) {
        where.price = { ...where.price, [Op.lte]: +priceMax };
      }

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
      console.error('Ошибка получения списка продуктов:', error);
      res.status(500).json({
        message: 'Ошибка получения списка продуктов',
      });
    }
  })
  .post(upload.single('photo'), async (req, res) => {
    try {
      const { name, description, price, discountedPrice, sku } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      if (!photo) {
        return res.status(400).json({ message: 'Фото обязательно' });
      }

      const newProduct = await Product.create({
        name,
        description,
        price,
        discountedPrice,
        sku,
        photo,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Ошибка добавления продукта:', error);
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
      console.error('Ошибка получения продукта:', error);
      res.status(500).json({
        message: 'Ошибка получения продукта',
      });
    }
  })
  .patch(upload.single('photo'), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, discountedPrice, sku } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }

      await product.update({
        name,
        description,
        price,
        discountedPrice,
        sku,
        ...(photo ? { photo } : {}),
      });

      res.status(200).json(product);
    } catch (error) {
      console.error('Ошибка редактирования продукта:', error);
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
      console.error('Ошибка удаления продукта:', error);
      res.status(500).json({
        message: 'Ошибка удаления продукта',
      });
    }
  });

productsRouter.get('/ssr/catalog', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'DESC',
      name = '',
      priceMin = 0,
      priceMax = Infinity,
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (priceMin) {
      where.price = { ...where.price, [Op.gte]: +priceMin };
    }
    if (priceMax && priceMax !== Infinity) {
      where.price = { ...where.price, [Op.lte]: +priceMax };
    }

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
    console.error('Ошибка получения каталога продуктов для SSR:', error);
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
    console.error('Ошибка получения продукта для SSR:', error);
    res.status(500).json({
      message: 'Ошибка получения продукта для SSR',
    });
  }
});

module.exports = productsRouter;
